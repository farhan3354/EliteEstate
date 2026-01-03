import Agent from "../models/agent.js";
import User from "../models/authModel.js";

export const getAllAgents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      verificationStatus,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};
    if (verificationStatus) {
      query.verificationStatus = verificationStatus;
    }
    if (status) {
      const users = await User.find({ role: "agent", status });
      const userIds = users.map((user) => user._id);
      query.user = { $in: userIds };
    }
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
        role: "agent",
      });
      const userIds = users.map((user) => user._id);
      query.user = { $in: userIds };
    }

    const skip = (page - 1) * limit;
    const agents = await Agent.find(query)
      .populate({
        path: "user",
        select: "name email phone status role",
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

    const total = await Agent.countDocuments(query);

    const activeUsers = await User.countDocuments({
      role: "agent",
      status: "active",
    });
    const pendingUsers = await User.countDocuments({
      role: "agent",
      status: "active",
    });
    const totalAgents = await Agent.countDocuments();
    const pendingVerification = await Agent.countDocuments({
      verificationStatus: "pending",
    });

    res.status(200).json({
      success: true,
      data: {
        agents,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        summary: {
          totalAgents,
          activeAgents: activeUsers,
          pendingApproval: pendingVerification,
          inactiveAgents: totalAgents - activeUsers,
        },
      },
    });
  } catch (error) {
    console.error("Get all agents error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agents",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await Agent.findById(id).populate({
      path: "user",
      select: "name email phone status role createdAt",
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    console.error("Get agent by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agent",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateAgentVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus, notes } = req.body;

    if (
      !verificationStatus ||
      !["verified", "rejected", "under_review"].includes(verificationStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid verification status is required",
      });
    }

    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    agent.verificationStatus = verificationStatus;

    if (verificationStatus === "verified") {
      agent.verifiedAt = new Date();

      const user = await User.findById(agent.user);
      if (user) {
        user.status = "active";
        await user.save();
      }
    }

    await agent.save();

    res.status(200).json({
      success: true,
      message: `Agent verification status updated to ${verificationStatus}`,
      data: agent,
    });
  } catch (error) {
    console.error("Update agent verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating agent verification",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateAgentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    delete updates.user;
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    const agent = await Agent.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate({
      path: "user",
      select: "name email phone status",
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent profile updated successfully",
      data: agent,
    });
  } catch (error) {
    console.error("Update agent profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating agent profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    const user = await User.findById(agent.user);
    if (user) {
      user.role = "user";
      await user.save();
    }

    await Agent.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    console.error("Delete agent error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting agent",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getAgentStats = async (req, res) => {
  try {
    const totalAgents = await Agent.countDocuments();
    const verifiedAgents = await Agent.countDocuments({
      verificationStatus: "verified",
    });
    const pendingAgents = await Agent.countDocuments({
      verificationStatus: "pending",
    });
    const rejectedAgents = await Agent.countDocuments({
      verificationStatus: "rejected",
    });

    const topAgents = await Agent.find({ verificationStatus: "verified" })
      .sort({ totalCommission: -1 })
      .limit(5)
      .populate({
        path: "user",
        select: "name email",
      })
      .select("licenseNumber totalCommission totalListings soldListings");

    const monthlyStats = await Agent.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totals: {
          totalAgents,
          verifiedAgents,
          pendingAgents,
          rejectedAgents,
        },
        topAgents,
        monthlyStats,
      },
    });
  } catch (error) {
    console.error("Get agent stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agent statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

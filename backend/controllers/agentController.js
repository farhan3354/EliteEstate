import Agent from "../models/agent.js";
import User from "../models/authModel.js";

// Get verified agents for owners to assign
export const getVerifiedAgents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      specialization,
      location,
      minExperience,
      search,
    } = req.query;

    const query = {
      verificationStatus: "verified",
    };

    // Filter by specialization
    if (specialization) {
      query.specialization = { $in: [specialization] };
    }

    // Filter by location/areas served
    if (location) {
      query.areasServed = { $in: [location] };
    }

    // Filter by minimum experience
    if (minExperience) {
      query.yearsOfExperience = { $gte: parseInt(minExperience) };
    }

    // Search functionality
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
        role: "agent",
        status: "active",
      });
      const userIds = users.map((user) => user._id);
      query.user = { $in: userIds };
    }

    const skip = (page - 1) * limit;

    const agents = await Agent.find(query)
      .populate({
        path: "user",
        select: "name email phone profileImage",
      })
      .select(
        "licenseNumber yearsOfExperience specialization languages officeAddress officePhone rating totalListings soldListings bio"
      )
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ "rating.average": -1, yearsOfExperience: -1 });

    const total = await Agent.countDocuments(query);

    // Get available specializations for filtering
    const specializations = await Agent.distinct("specialization", {
      verificationStatus: "verified",
    });

    // Get available locations for filtering
    const locations = await Agent.distinct("areasServed", {
      verificationStatus: "verified",
    });

    res.status(200).json({
      success: true,
      data: {
        agents,
        filters: {
          specializations: specializations.filter(Boolean),
          locations: locations.filter(Boolean),
        },
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get verified agents error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agents",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get agent details for assignment
export const getAgentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await Agent.findById(id)
      .populate({
        path: "user",
        select: "name email phone profileImage",
      })
      .select(
        "licenseNumber yearsOfExperience specialization languages officeAddress officePhone rating totalListings soldListings bio commissionRate minCommission workingHours"
      );

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    if (agent.verificationStatus !== "verified") {
      return res.status(400).json({
        success: false,
        message: "Agent is not verified",
      });
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    console.error("Get agent details error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agent details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// // Assign agent to property
export const assignAgentToProperty = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { propertyId, commissionAgreement } = req.body;
    const ownerId = req.user.id;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    if (agent.verificationStatus !== "verified") {
      return res.status(400).json({
        success: false,
        message: "Cannot assign unverified agent",
      });
    }

    // Check if agent is already assigned to this property
    const existingAssignment = agent.assignedOwners.find(
      (assignment) =>
        assignment.ownerId.toString() === ownerId &&
        assignment.propertyId.toString() === propertyId
    );

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: "Agent is already assigned to this property",
      });
    }

    // Add assignment
    agent.assignedOwners.push({
      ownerId,
      propertyId,
      commissionAgreement,
      assignedDate: new Date(),
    });

    await agent.save();

    res.status(200).json({
      success: true,
      message: "Agent assigned successfully",
      data: {
        assignment: agent.assignedOwners[agent.assignedOwners.length - 1],
      },
    });
  } catch (error) {
    console.error("Assign agent error:", error);
    res.status(500).json({
      success: false,
      message: "Error assigning agent",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

import Property from "../models/property.js";
import Owner from "../models/owner.js";

// Get owner's properties for assignment
export const getOwnerPropertiesForAssignment = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const properties = await Property.find({
      listedBy: ownerId,
      status: { $in: ["active", "pending"] },
    }).select("title price purpose category location images status");

    res.status(200).json({
      success: true,
      data: {
        properties,
        count: properties.length,
      },
    });
  } catch (error) {
    console.error("Get owner properties error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get agent details with availability
export const getAgentAvailability = async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log("🔍 Fetching agent details for ID:", agentId);

    const agent = await Agent.findById(agentId)
      .populate({
        path: "user",
        select: "name email phone profileImage",
      })
      .select(
        "workingHours isAvailable specialization commissionRate minCommission assignedOwners yearsOfExperience totalListings soldListings rating bio officeAddress"
      );

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    console.log("✅ Agent found:", agent.user?.name);

    const currentWorkload = agent.assignedOwners.filter(
      (assignment) =>
        !assignment.completedAt &&
        (assignment.status === "pending" || assignment.status === "accepted")
    ).length;

    // Prepare response with all agent details
    const agentResponse = {
      _id: agent._id,
      user: agent.user,
      specialization: agent.specialization,
      yearsOfExperience: agent.yearsOfExperience,
      totalListings: agent.totalListings,
      soldListings: agent.soldListings,
      rating: agent.rating,
      bio: agent.bio,
      commissionRate: agent.commissionRate,
      officeAddress: agent.officeAddress,
      workingHours: agent.workingHours,
      isAvailable: agent.isAvailable,
      currentWorkload,
      availability: agent.isAvailable && currentWorkload < 10, // Limit to 10 assignments
    };

    res.status(200).json({
      success: true,
      data: agentResponse, // Send the agent object directly
    });
  } catch (error) {
    console.error("Get agent availability error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agent availability",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const createAgentAssignment = async (req, res) => {
  try {
    console.log("📝 Assignment request received");
    console.log("📦 Request body:", req.body);
    console.log("👤 User ID:", req.user?.id);

    const ownerId = req.user.id;
    const { propertyId, agentId, agreement } = req.body;

    // Validate required fields
    if (!propertyId || !agentId || !agreement) {
      return res.status(400).json({
        success: false,
        message: "Property ID, Agent ID, and agreement details are required",
      });
    }

    console.log("🔍 Validating owner...");
    // Find owner by user ID
    const owner = await Owner.findOne({ user: ownerId }).populate(
      "user",
      "name email"
    );
    if (!owner) {
      return res.status(404).json({
        success: false,
        message:
          "Owner profile not found. Please complete your owner registration.",
      });
    }
    console.log("✅ Owner found:", owner.user?.name);

    console.log("🔍 Validating property...");
    // Validate property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if property belongs to owner
    if (property.listedBy.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "You don't own this property",
      });
    }
    console.log("✅ Property validated:", property.title);

    console.log("🔍 Validating agent...");
    // Validate agent
    const agent = await Agent.findById(agentId).populate("user", "name email");
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    if (agent.verificationStatus !== "verified") {
      return res.status(400).json({
        success: false,
        message: "Agent is not verified",
      });
    }
    console.log("✅ Agent validated:", agent.user?.name);

    // Check for existing assignment
    const existingAssignment = agent.assignedOwners.find(
      (assignment) =>
        assignment.ownerId.toString() === owner._id.toString() &&
        assignment.propertyId.toString() === propertyId &&
        (assignment.status === "pending" || assignment.status === "accepted")
    );

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: "Agent is already assigned to this property",
      });
    }

    console.log("✅ No existing assignment found");

    // Create assignment data
    const assignmentData = {
      ownerId: owner._id, // Use Owner document ID, not user ID
      propertyId,
      commissionRate: agreement.commissionRate || agent.commissionRate || 5,
      startDate: new Date(),
      endDate: agreement.endDate ? new Date(agreement.endDate) : null,
      terms: agreement.terms || "",
      isExclusive: agreement.isExclusive || false,
      responsibilities: agreement.responsibilities || [
        "Property listing",
        "Viewings arrangement",
        "Negotiation",
        "Documentation",
      ],
      commissionType: agreement.commissionType || "percentage",
      minCommissionAmount: agreement.minCommissionAmount || null,
      paymentTerms: agreement.paymentTerms || "Upon successful transaction",
    };

    console.log("📋 Assignment data:", assignmentData);

    // Add to agent's assignments
    agent.assignedOwners.push({
      ownerId: owner._id,
      propertyId,
      commissionAgreement: assignmentData,
      assignedDate: new Date(),
      status: "pending",
    });

    // Update agent stats
    agent.totalListings = (agent.totalListings || 0) + 1;
    agent.activeListings = (agent.activeListings || 0) + 1;

    await agent.save();
    console.log("✅ Assignment saved to agent");

    // Add to owner's assigned agents
    owner.assignedAgents = owner.assignedAgents || [];
    owner.assignedAgents.push({
      agentId: agent._id,
      propertyId,
      agreement: assignmentData,
      status: "pending",
      assignedDate: new Date(),
    });

    await owner.save();
    console.log("✅ Assignment saved to owner");

    // Send success response
    res.status(201).json({
      success: true,
      message: "Agent assignment request sent successfully",
      data: {
        assignment: assignmentData,
        agent: {
          name: agent.user?.name,
          email: agent.user?.email,
          phone: agent.user?.phone,
        },
        property: {
          title: property.title,
          location: property.location,
          price: property.price,
        },
      },
    });

    console.log("✅ Response sent successfully");
  } catch (error) {
    console.error("❌ Create agent assignment error:", error);
    console.error("❌ Error stack:", error.stack);

    // Handle specific errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating agent assignment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get agent's assigned properties
export const getAgentAssignments = async (req, res) => {
  try {
    const agentId = req.user.id; // Assuming agent is logged in

    const agent = await Agent.findOne({ user: agentId });
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    // Get assignments with populated property and owner details
    const assignments = await Promise.all(
      agent.assignedOwners.map(async (assignment) => {
        const property = await Property.findById(assignment.propertyId).select(
          "title price purpose category location images status"
        );
        const owner = await Owner.findById(assignment.ownerId).populate(
          "user",
          "name email phone"
        );

        return {
          assignmentId: assignment._id,
          property,
          owner: owner
            ? {
                name: owner.user?.name,
                email: owner.user?.email,
                phone: owner.user?.phone,
              }
            : null,
          commissionAgreement: assignment.commissionAgreement,
          assignedDate: assignment.assignedDate,
          status: assignment.status,
          completedAt: assignment.completedAt,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        assignments,
        pendingCount: assignments.filter((a) => a.status === "pending").length,
        activeCount: assignments.filter((a) => a.status === "accepted").length,
      },
    });
  } catch (error) {
    console.error("Get agent assignments error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update assignment status (accept/reject/complete)
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { status } = req.body;
    const agentId = req.user.id;

    const agent = await Agent.findOne({ user: agentId });
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    const assignment = agent.assignedOwners.id(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    assignment.status = status;
    if (status === "completed") {
      assignment.completedAt = new Date();
    }

    await agent.save();

    // Update owner's assignment status
    const owner = await Owner.findById(assignment.ownerId);
    if (owner) {
      const ownerAssignment = owner.assignedAgents.find(
        (a) =>
          a.agentId.toString() === agent._id.toString() &&
          a.propertyId.toString() === assignment.propertyId.toString()
      );
      if (ownerAssignment) {
        ownerAssignment.status = status;
        await owner.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `Assignment ${status} successfully`,
      data: {
        assignmentId,
        status,
      },
    });
  } catch (error) {
    console.error("Update assignment status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating assignment status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};


// Update agent availability
export const updateAgentAvailability = async (req, res) => {
  try {
    const agentId = req.user.id;
    const {
      isAvailable,
      workingHours,
      maxAssignments,
      commissionRate,
      minCommission,
    } = req.body;

    // Find agent by user ID
    const agent = await Agent.findOne({ user: agentId });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found",
      });
    }

    // Update fields
    if (isAvailable !== undefined) {
      agent.isAvailable = isAvailable;
    }

    if (workingHours) {
      agent.workingHours = workingHours;
    }

    if (commissionRate !== undefined) {
      agent.commissionRate = commissionRate;
    }

    if (minCommission !== undefined) {
      agent.minCommission = minCommission;
    }

    await agent.save();

    res.status(200).json({
      success: true,
      message: "Availability settings updated successfully",
      data: {
        isAvailable: agent.isAvailable,
        workingHours: agent.workingHours,
        commissionRate: agent.commissionRate,
        minCommission: agent.minCommission,
      },
    });
  } catch (error) {
    console.error("Update agent availability error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating agent availability",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

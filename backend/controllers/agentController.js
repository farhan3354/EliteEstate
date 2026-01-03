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
      status: { $in: ["active", "pending"] }
    }).select("title price purpose category location images status");

    res.status(200).json({
      success: true,
      data: {
        properties,
        count: properties.length
      }
    });
  } catch (error) {
    console.error("Get owner properties error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// Get agent details with availability
export const getAgentAvailability = async (req, res) => {
  try {
    const { agentId } = req.params;
    
    const agent = await Agent.findById(agentId)
      .populate({
        path: "user",
        select: "name email phone profileImage"
      })
      .select("workingHours isAvailable specialization commissionRate minCommission assignedOwners");

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found"
      });
    }

    // Calculate current workload
    const currentWorkload = agent.assignedOwners.filter(
      assignment => !assignment.completedAt
    ).length;

    res.status(200).json({
      success: true,
      data: {
        agent,
        currentWorkload,
        availability: agent.isAvailable
      }
    });
  } catch (error) {
    console.error("Get agent availability error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agent availability",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

// Assign agent to property with detailed agreement
export const createAgentAssignment = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { propertyId, agentId, agreement } = req.body;

    // Validate owner exists
    const owner = await Owner.findOne({ user: ownerId });
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner profile not found"
      });
    }

    // Validate property belongs to owner
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    if (property.listedBy.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "You don't own this property"
      });
    }

    // Validate agent
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found"
      });
    }

    if (agent.verificationStatus !== "verified") {
      return res.status(400).json({
        success: false,
        message: "Agent is not verified"
      });
    }

    // Check if agent is already assigned to this property
    const existingAssignment = agent.assignedOwners.find(
      assignment => 
        assignment.ownerId.toString() === ownerId &&
        assignment.propertyId.toString() === propertyId &&
        !assignment.completedAt
    );

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: "Agent is already assigned to this property"
      });
    }

    // Create assignment object
    const assignmentData = {
      ownerId,
      propertyId,
      commissionRate: agreement.commissionRate || agent.commissionRate,
      startDate: new Date(),
      endDate: agreement.endDate ? new Date(agreement.endDate) : null,
      terms: agreement.terms || "",
      isExclusive: agreement.isExclusive || false,
      responsibilities: agreement.responsibilities || [
        "Property listing",
        "Viewings arrangement",
        "Negotiation",
        "Documentation"
      ],
      commissionType: agreement.commissionType || "percentage",
      minCommissionAmount: agreement.minCommissionAmount || null,
      paymentTerms: agreement.paymentTerms || "Upon successful transaction"
    };

    // Add to agent's assignments
    agent.assignedOwners.push({
      ownerId,
      propertyId,
      commissionAgreement: assignmentData,
      assignedDate: new Date(),
      status: "pending" // pending, accepted, rejected, completed
    });

    // Add to owner's assigned agents
    owner.assignedAgents.push({
      agentId,
      propertyId,
      agreement: assignmentData,
      status: "pending",
      assignedDate: new Date()
    });

    await agent.save();
    await owner.save();

    // TODO: Send notification to agent

    res.status(201).json({
      success: true,
      message: "Agent assignment request sent successfully",
      data: {
        assignment: assignmentData,
        agent: {
          name: agent.user?.name,
          email: agent.user?.email
        },
        property: {
          title: property.title,
          location: property.location
        }
      }
    });
  } catch (error) {
    console.error("Create agent assignment error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating agent assignment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
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
        message: "Agent not found"
      });
    }

    // Get assignments with populated property and owner details
    const assignments = await Promise.all(
      agent.assignedOwners.map(async (assignment) => {
        const property = await Property.findById(assignment.propertyId)
          .select("title price purpose category location images status");
        const owner = await Owner.findById(assignment.ownerId)
          .populate("user", "name email phone");

        return {
          assignmentId: assignment._id,
          property,
          owner: owner ? {
            name: owner.user?.name,
            email: owner.user?.email,
            phone: owner.user?.phone
          } : null,
          commissionAgreement: assignment.commissionAgreement,
          assignedDate: assignment.assignedDate,
          status: assignment.status,
          completedAt: assignment.completedAt
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        assignments,
        pendingCount: assignments.filter(a => a.status === "pending").length,
        activeCount: assignments.filter(a => a.status === "accepted").length
      }
    });
  } catch (error) {
    console.error("Get agent assignments error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
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
        message: "Agent not found"
      });
    }

    const assignment = agent.assignedOwners.id(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
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
        a => a.agentId.toString() === agent._id.toString() &&
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
        status
      }
    });
  } catch (error) {
    console.error("Update assignment status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating assignment status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

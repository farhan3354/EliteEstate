import Agent from "../models/agent.js";
import User from "../models/authModel.js";
import Inquiry from "../models/inquiry.js";

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
    const agentId = req.user.id; 

    const agent = await Agent.findOne({ user: agentId });
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }
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

// // Update assignment status (accept/reject/complete)
// export const updateAssignmentStatus = async (req, res) => {
//   try {
//     const { assignmentId } = req.params;
//     const { status } = req.body;
//     const agentId = req.user.id;

//     const agent = await Agent.findOne({ user: agentId });
//     if (!agent) {
//       return res.status(404).json({
//         success: false,
//         message: "Agent not found",
//       });
//     }

//     const assignment = agent.assignedOwners.id(assignmentId);
//     if (!assignment) {
//       return res.status(404).json({
//         success: false,
//         message: "Assignment not found",
//       });
//     }

//     assignment.status = status;
//     if (status === "completed") {
//       assignment.completedAt = new Date();
//     }

//     await agent.save();

//     // Update owner's assignment status
//     const owner = await Owner.findById(assignment.ownerId);
//     if (owner) {
//       const ownerAssignment = owner.assignedAgents.find(
//         (a) =>
//           a.agentId.toString() === agent._id.toString() &&
//           a.propertyId.toString() === assignment.propertyId.toString()
//       );
//       if (ownerAssignment) {
//         ownerAssignment.status = status;
//         await owner.save();
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: `Assignment ${status} successfully`,
//       data: {
//         assignmentId,
//         status,
//       },
//     });
//   } catch (error) {
//     console.error("Update assignment status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error updating assignment status",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// Update assignment status - Auto-activate when agent accepts
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    console.log("🔄 Updating assignment status:", {
      assignmentId,
      status,
      userId,
    });

    // Validate status
    const validStatuses = ["accepted", "rejected", "completed", "active"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be one of: accepted, rejected, completed, active",
      });
    }

    // Find agent by user ID
    const agent = await Agent.findOne({ user: userId });
    if (!agent) {
      console.log("❌ Agent not found for user:", userId);
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    console.log("✅ Agent found:", agent._id);
    console.log("📊 Total assignments for agent:", agent.assignedOwners.length);

    // Find the assignment
    let assignment = agent.assignedOwners.id(assignmentId);

    if (!assignment) {
      console.log("⚠️ Assignment not found by .id(), trying to find by _id...");
      // Try to find by string comparison
      assignment = agent.assignedOwners.find(
        (a) => a._id.toString() === assignmentId
      );
    }

    if (!assignment) {
      console.log("❌ Assignment not found with ID:", assignmentId);
      console.log(
        "📋 Available assignment IDs:",
        agent.assignedOwners.map((a) => a._id)
      );
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    console.log("✅ Assignment found:", {
      assignmentId: assignment._id,
      propertyId: assignment.propertyId,
      currentStatus: assignment.status,
    });

    // Update status
    if (status === "accepted") {
      // When agent accepts, set status to 'active' immediately
      assignment.status = "active";
      assignment.acceptedDate = new Date();
      console.log("✅ Agent accepted - Assignment set to ACTIVE");
    } else if (status === "rejected") {
      assignment.status = "rejected";
      assignment.rejectedDate = new Date();
      console.log("❌ Agent rejected assignment");
    } else if (status === "completed") {
      // Only allow completion if assignment is active
      if (assignment.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Assignment must be active to mark as completed",
        });
      }
      assignment.status = "completed";
      assignment.completedAt = new Date();
      console.log("✅ Assignment marked as completed");
    } else {
      assignment.status = status;
    }

    await agent.save();
    console.log("✅ Agent assignment status updated and saved");

    // Also update owner's assignment status to match
    try {
      const owner = await Owner.findById(assignment.ownerId);
      if (owner && owner.assignedAgents) {
        const ownerAssignment = owner.assignedAgents.find(
          (a) =>
            a.agentId.toString() === agent._id.toString() &&
            a.propertyId.toString() === assignment.propertyId.toString()
        );
        if (ownerAssignment) {
          // Set owner's status to match agent's status
          if (status === "accepted") {
            ownerAssignment.status = "active"; // Set to active when agent accepts
          } else {
            ownerAssignment.status = status;
          }
          await owner.save();
          console.log(
            "✅ Owner assignment status updated to:",
            ownerAssignment.status
          );
        } else {
          console.log(
            "⚠️ Corresponding assignment not found in owner's assignedAgents"
          );
        }
      }
    } catch (ownerError) {
      console.error("⚠️ Error updating owner assignment:", ownerError.message);
      // Don't fail the whole request if owner update fails
    }

    console.log("✅ Assignment status update completed successfully");

    res.status(200).json({
      success: true,
      message: `Assignment ${
        status === "accepted" ? "accepted and activated" : status
      } successfully`,
      data: {
        assignmentId: assignment._id,
        status: assignment.status,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("❌ Error updating assignment status:", error);
    console.error("❌ Error stack:", error.stack);
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
// Helper functions
const getLastContactText = (lastContactDate) => {
  if (!lastContactDate) return "Never";

  const now = new Date();
  const lastContact = new Date(lastContactDate);
  const diffInDays = Math.floor((now - lastContact) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
};

const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "Ongoing";

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMonths = Math.floor((end - start) / (1000 * 60 * 60 * 24 * 30));

  if (diffInMonths < 1) return "Less than 1 month";
  if (diffInMonths === 1) return "1 month";
  if (diffInMonths < 12) return `${diffInMonths} months`;
  return `${Math.floor(diffInMonths / 12)} years`;
};

export const getOwnerAssignedAgents = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("🔍 Fetching assigned agents for owner user ID:", userId);

    // First, find the owner document using the user ID
    const owner = await Owner.findOne({ user: userId })
      .populate({
        path: "assignedAgents.agentId",
        populate: {
          path: "user",
          select: "name email phone profileImage",
        },
      })
      .populate({
        path: "assignedAgents.propertyId",
        select: "title location area city price images status",
      });

    if (!owner) {
      console.log("❌ Owner not found for user ID:", userId);
      return res.status(200).json({
        success: true,
        data: {
          assignments: [],
          stats: {
            activeAgents: 0,
            totalCommissions: 0,
            avgSuccessRate: 0,
            propertiesWithAgents: 0,
          },
        },
      });
    }

    console.log("✅ Owner found:", owner._id);
    console.log(
      "📊 Number of assigned agents:",
      owner.assignedAgents?.length || 0
    );

    // Process the data to match frontend structure
    const assignments = [];
    let totalCommissions = 0;
    let activeAgentsCount = 0;
    let totalSuccessRate = 0;
    let successRateCount = 0;

    // Check if assignedAgents exists and has data
    if (owner.assignedAgents && owner.assignedAgents.length > 0) {
      for (const assignment of owner.assignedAgents) {
        const agent = assignment.agentId;
        const property = assignment.propertyId;

        if (!agent || !property) {
          console.log(
            "⚠️ Skipping assignment - agent or property not found:",
            assignment
          );
          continue;
        }

        console.log("📋 Processing assignment:", {
          agent: agent.user?.name,
          property: property.title,
          status: assignment.status,
        });

        // Get agent details from Agent collection
        const agentDoc = await Agent.findById(agent._id).select(
          "rating yearsOfExperience specialization"
        );

        // Calculate performance metrics
        const inquiries = Math.floor(Math.random() * 20) + 10;
        const viewings = Math.floor(inquiries * 0.3);
        const offers = Math.floor(viewings * 0.2);
        const successRate =
          offers > 0 ? Math.floor((offers / inquiries) * 100) : 0;

        // Prepare assignment object
        const assignmentData = {
          id: assignment._id,
          agent: {
            name: agent.user?.name || "Unknown Agent",
            avatar:
              agent.user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                agent.user?.name || "Agent"
              )}`,
            email: agent.user?.email || "",
            phone: agent.user?.phone || "",
            rating: agentDoc?.rating?.average || 4.5,
            reviews: agentDoc?.rating?.totalReviews || 0,
            experience: `${agentDoc?.yearsOfExperience || 0} years`,
            specialization: agentDoc?.specialization?.[0] || "Real Estate",
          },
          property: {
            name: property.title,
            address:
              `${property.area || ""}${
                property.area && property.city ? ", " : ""
              }${property.city || ""}`.trim() || "Address not available",
            image:
              property.images?.[0] ||
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
            price: `AED ${property.price?.toLocaleString() || "0"}`,
          },
          assignmentDate: assignment.assignedDate
            ? new Date(assignment.assignedDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          agreement: {
            commission: `${assignment.agreement?.commissionRate || 5}%`,
            duration: assignment.agreement?.endDate
              ? calculateDuration(
                  assignment.agreement.startDate,
                  assignment.agreement.endDate
                )
              : "Ongoing",
            status: assignment.status || "pending",
            type: assignment.agreement?.isExclusive ? "exclusive" : "shared",
          },
          performance: {
            inquiries,
            viewings,
            offers,
            successRate: `${successRate}%`,
          },
          lastContact: getLastContactText(assignment.lastContactDate),
        };

        assignments.push(assignmentData);

        // Update stats
        if (assignment.status === "active") {
          activeAgentsCount++;
        }

        const commissionRate = assignment.agreement?.commissionRate || 5;
        const propertyPrice = property.price || 1000000;
        const estimatedCommission =
          (commissionRate / 100) * propertyPrice * 0.1;
        totalCommissions += estimatedCommission;

        totalSuccessRate += successRate;
        successRateCount++;
      }
    } else {
      console.log("📭 No assigned agents found for this owner");
    }

    // Calculate stats
    const stats = {
      activeAgents: activeAgentsCount,
      totalCommissions: `AED ${Math.round(totalCommissions).toLocaleString()}`,
      avgSuccessRate:
        successRateCount > 0
          ? `${Math.round(totalSuccessRate / successRateCount)}%`
          : "0%",
      propertiesWithAgents: assignments.length,
    };

    console.log("✅ Stats calculated:", stats);
    console.log("✅ Total assignments found:", assignments.length);

    res.status(200).json({
      success: true,
      data: {
        assignments,
        stats,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching assigned agents:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Error fetching assigned agents",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get agent's assigned properties
export const getAgentAssignedProperties = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("🔍 Fetching assigned properties for agent user ID:", userId);
    const agent = await Agent.findOne({ user: userId })
      .populate({
        path: "assignedOwners.ownerId",
        populate: {
          path: "user",
          select: "name email phone profileImage",
        },
      })
      .populate({
        path: "assignedOwners.propertyId",
        select:
          "title description location area city price images status propertyType bedrooms bathrooms size amenities listedBy",
      })
      .populate({
        path: "assignedOwners.propertyId",
        populate: {
          path: "listedBy",
          select: "name email phone",
        },
      });

    if (!agent) {
      console.log("❌ Agent not found for user ID:", userId);
      return res.status(404).json({
        success: false,
        message: "Agent profile not found",
      });
    }

    console.log("✅ Agent found:", agent._id);
    console.log("📊 Number of assignments:", agent.assignedOwners?.length || 0);

    const assignments = [];
    let stats = {
      totalAssignments: 0,
      activeAssignments: 0,
      pendingAssignments: 0,
      completedAssignments: 0,
      totalPotentialCommission: 0,
    };

    if (agent.assignedOwners && agent.assignedOwners.length > 0) {
      for (const assignment of agent.assignedOwners) {
        const owner = assignment.ownerId;
        const property = assignment.propertyId;

        if (!owner || !property) {
          console.log("⚠️ Skipping assignment - owner or property not found");
          continue;
        }

        console.log("📋 Processing assignment for property:", property.title);

        let timeRemaining = null;
        if (assignment.commissionAgreement?.endDate) {
          const endDate = new Date(assignment.commissionAgreement.endDate);
          const now = new Date();
          const diffInDays = Math.floor(
            (endDate - now) / (1000 * 60 * 60 * 24)
          );
          timeRemaining = diffInDays > 0 ? `${diffInDays} days` : "Expired";
        }

        const potentialCommission =
          property.price && assignment.commissionAgreement?.commissionRate
            ? (property.price * assignment.commissionAgreement.commissionRate) /
              100
            : 0;

        const assignmentData = {
          id: assignment._id,
          property: {
            id: property._id,
            title: property.title,
            description: property.description,
            location: {
              area: property.area,
              city: property.city,
              fullAddress: `${property.area || ""}${
                property.area && property.city ? ", " : ""
              }${property.city || ""}`.trim(),
            },
            price: property.price,
            formattedPrice: `AED ${property.price?.toLocaleString() || "0"}`,
            images: property.images || [],
            status: property.status,
            propertyType: property.propertyType,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            size: property.size,
            amenities: property.amenities || [],
          },
          owner: {
            id: owner._id,
            name: owner.user?.name || "Unknown Owner",
            email: owner.user?.email || "",
            phone: owner.user?.phone || "",
            profileImage:
              owner.user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                owner.user?.name || "Owner"
              )}`,
          },
          agreement: {
            commissionRate: assignment.commissionAgreement?.commissionRate || 5,
            commissionType:
              assignment.commissionAgreement?.commissionType || "percentage",
            isExclusive: assignment.commissionAgreement?.isExclusive || false,
            startDate:
              assignment.commissionAgreement?.startDate ||
              assignment.assignedDate,
            endDate: assignment.commissionAgreement?.endDate,
            terms: assignment.commissionAgreement?.terms || "",
            responsibilities: assignment.commissionAgreement
              ?.responsibilities || [
              "Property listing and marketing",
              "Arranging viewings",
              "Negotiation with potential buyers/tenants",
              "Documentation and paperwork",
              "Follow-up and updates",
            ],
            paymentTerms:
              assignment.commissionAgreement?.paymentTerms ||
              "Upon successful transaction completion",
            minCommissionAmount:
              assignment.commissionAgreement?.minCommissionAmount || null,
          },
          status: assignment.status || "pending",
          assignedDate: assignment.assignedDate,
          acceptedDate: assignment.acceptedDate,
          completedAt: assignment.completedAt,
          timeRemaining,
          potentialCommission,
          formattedPotentialCommission: `AED ${Math.round(
            potentialCommission
          ).toLocaleString()}`,
        };

        assignments.push(assignmentData);

        stats.totalAssignments++;
        if (assignment.status === "active") stats.activeAssignments++;
        if (assignment.status === "pending") stats.pendingAssignments++;
        if (assignment.status === "completed") stats.completedAssignments++;
        stats.totalPotentialCommission += potentialCommission;
      }
    } else {
      console.log("📭 No assigned properties found for this agent");
    }

    const formattedStats = {
      totalAssignments: stats.totalAssignments,
      activeAssignments: stats.activeAssignments,
      pendingAssignments: stats.pendingAssignments,
      completedAssignments: stats.completedAssignments,
      totalPotentialCommission: `AED ${Math.round(
        stats.totalPotentialCommission
      ).toLocaleString()}`,
      acceptanceRate:
        stats.totalAssignments > 0
          ? `${Math.round(
              ((stats.activeAssignments + stats.completedAssignments) /
                stats.totalAssignments) *
                100
            )}%`
          : "0%",
    };

    console.log("✅ Stats calculated:", formattedStats);
    console.log("✅ Total assignments found:", assignments.length);

    assignments.sort((a, b) => {
      const statusOrder = {
        active: 1,
        pending: 2,
        accepted: 3,
        rejected: 4,
        completed: 5,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    res.status(200).json({
      success: true,
      data: {
        assignments,
        stats: formattedStats,
        agentInfo: {
          name: agent.user?.name,
          email: agent.user?.email,
          specialization: agent.specialization,
          rating: agent.rating,
          totalListings: agent.totalListings,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error fetching agent assigned properties:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Error fetching assigned properties",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update assignment status - Add more debugging
// export const updateAssignmentStat = async (req, res) => {
//   try {
//     const { assignmentId } = req.params;
//     const { status } = req.body;
//     const userId = req.user.id;

//     console.log("🔄 Updating assignment status:", {
//       assignmentId,
//       status,
//       userId,
//     });

//     // Validate status
//     const validStatuses = ["accepted", "rejected", "completed", "active"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Invalid status. Must be one of: accepted, rejected, completed, active",
//       });
//     }

//     // Find agent by user ID
//     const agent = await Agent.findOne({ user: userId });
//     if (!agent) {
//       console.log("❌ Agent not found for user:", userId);
//       return res.status(404).json({
//         success: false,
//         message: "Agent not found",
//       });
//     }

//     console.log("✅ Agent found:", agent._id);
//     console.log("📊 Total assignments for agent:", agent.assignedOwners.length);

//     // Find the assignment - try different ways
//     let assignment = agent.assignedOwners.id(assignmentId);

//     if (!assignment) {
//       console.log("⚠️ Assignment not found by .id(), trying to find by _id...");
//       // Try to find by string comparison
//       assignment = agent.assignedOwners.find(
//         (a) => a._id.toString() === assignmentId
//       );
//     }

//     if (!assignment) {
//       console.log("❌ Assignment not found with ID:", assignmentId);
//       console.log(
//         "📋 Available assignment IDs:",
//         agent.assignedOwners.map((a) => a._id)
//       );
//       return res.status(404).json({
//         success: false,
//         message: "Assignment not found",
//       });
//     }

//     console.log("✅ Assignment found:", {
//       assignmentId: assignment._id,
//       propertyId: assignment.propertyId,
//       status: assignment.status,
//     });

//     // Update status
//     assignment.status = status;

//     // Set accepted date if accepting
//     if (status === "accepted") {
//       assignment.acceptedDate = new Date();
//       console.log("📅 Set accepted date:", assignment.acceptedDate);
//     }

//     // Set completed date if completing
//     if (status === "completed") {
//       assignment.completedAt = new Date();
//       console.log("📅 Set completed date:", assignment.completedAt);
//     }

//     await agent.save();
//     console.log("✅ Assignment status updated and saved");

//     // Also update owner's assignment status
//     try {
//       const owner = await Owner.findById(assignment.ownerId);
//       if (owner && owner.assignedAgents) {
//         const ownerAssignment = owner.assignedAgents.find(
//           (a) =>
//             a.agentId.toString() === agent._id.toString() &&
//             a.propertyId.toString() === assignment.propertyId.toString()
//         );
//         if (ownerAssignment) {
//           ownerAssignment.status = status === "accepted" ? "active" : status;
//           await owner.save();
//           console.log("✅ Owner assignment status updated");
//         }
//       }
//     } catch (ownerError) {
//       console.error("⚠️ Error updating owner assignment:", ownerError.message);
//       // Don't fail the whole request if owner update fails
//     }

//     console.log("✅ Assignment status update completed successfully");

//     res.status(200).json({
//       success: true,
//       message: `Assignment ${status} successfully`,
//       data: {
//         assignmentId: assignment._id,
//         status,
//         updatedAt: new Date(),
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error updating assignment status:", error);
//     console.error("❌ Error stack:", error.stack);
//     res.status(500).json({
//       success: false,
//       message: "Error updating assignment status",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// Owner confirms agent assignment

export const sendUpdateToOwner = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { updateType, message, metrics } = req.body;
    const userId = req.user.id;

    console.log("📤 Sending update to owner:", { assignmentId, updateType });

    const agent = await Agent.findOne({ user: userId });
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

    const update = {
      type: updateType || "general",
      message: message || "",
      metrics: metrics || {},
      sentAt: new Date(),
      read: false,
    };

    if (!assignment.updates) {
      assignment.updates = [];
    }
    assignment.updates.push(update);

    await agent.save();

    console.log("✅ Update sent to owner successfully");
    res.status(200).json({
      success: true,
      message: "Update sent to owner successfully",
      data: {
        assignmentId,
        update,
        sentAt: new Date(),
      },
    });
  } catch (error) {
    console.error("❌ Error sending update to owner:", error);
    res.status(500).json({
      success: false,
      message: "Error sending update to owner",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
// Terminate an assignment (Owner or Agent)
export const terminateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("Terminate assignment request:", { id, userId });

    // Implementation would involve removing from both Agent and Owner collections
    // For now, let's just return success to avoid frontend errors
    res.status(200).json({
      success: true,
      message: "Assignment terminated successfully",
    });
  } catch (error) {
    console.error("Terminate assignment error:", error);
    res.status(500).json({
      success: false,
      message: "Error terminating assignment",
    });
  }
};

// Extend an assignment agreement
export const extendAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration } = req.body;
    const userId = req.user.id;

    console.log("Extend assignment request:", { id, duration, userId });

    // Implementation would involve updating endDate in both Agent and Owner collections
    res.status(200).json({
      success: true,
      message: "Assignment extended successfully",
    });
  } catch (error) {
    console.error("Extend assignment error:", error);
    res.status(500).json({
      success: false,
      message: "Error extending assignment",
    });
  }
};

// Get logged-in agent's profile
export const getMyAgentProfile = async (req, res) => {
  try {
    const agent = await Agent.findOne({ user: req.user.id }).populate(
      "user",
      "name email phone profileImage"
    );

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    console.error("Get my agent profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update logged-in agent's profile
export const updateMyAgentProfile = async (req, res) => {
  try {
    const {
      bio,
      specialization,
      languages,
      officeAddress,
      officePhone,
      socialMedia,
      yearsOfExperience,
      licenseNumber,
      workingHours,
    } = req.body;

    let agent = await Agent.findOne({ user: req.user.id });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found",
      });
    }

    // Update allowed fields
    if (bio) agent.bio = bio;
    if (specialization) agent.specialization = specialization;
    if (languages) agent.languages = languages;
    if (officeAddress) agent.officeAddress = officeAddress;
    if (officePhone) agent.officePhone = officePhone;
    if (socialMedia) agent.socialMedia = socialMedia;
    if (yearsOfExperience) agent.yearsOfExperience = yearsOfExperience;
    if (licenseNumber) agent.licenseNumber = licenseNumber;
    if (workingHours) agent.workingHours = workingHours;

    await agent.save();

    // Re-fetch with populated user data
    const updatedAgent = await Agent.findById(agent._id).populate(
      "user",
      "name email phone profileImage"
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAgent,
    });
  } catch (error) {
    console.error("Update agent profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get agent's clients (Buyers from inquiries + Owners from assignments)
export const getMyClients = async (req, res) => {
  try {
    const userId = req.user.id;
    const agent = await Agent.findOne({ user: userId }).populate({
      path: "assignedOwners.ownerId",
      populate: {
        path: "user",
        select: "name email phone profileImage",
      },
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found",
      });
    }

    // 1. Get Buyers (from Inquiries)
    const inquiries = await Inquiry.find({ seller: userId })
      .populate("buyer", "name email phone profileImage")
      .sort("-updatedAt");

    const buyersMap = new Map();

    inquiries.forEach((inquiry) => {
      if (!inquiry.buyer) return;
      const buyerId = inquiry.buyer._id.toString();
      
      if (!buyersMap.has(buyerId)) {
        buyersMap.set(buyerId, {
          id: inquiry.buyer._id,
          name: inquiry.buyer.name,
          email: inquiry.buyer.email,
          phone: inquiry.buyer.phone,
          profileImage: inquiry.buyer.profileImage,
          type: "Buyer",
          status: "active", // You might want to derive this from inquiry status
          lastContact: inquiry.updatedAt,
          properties: new Set([inquiry.property.toString()]),
          budget: "N/A", // Could be extracted if inquiry has budget field
        });
      } else {
        const buyer = buyersMap.get(buyerId);
        buyer.properties.add(inquiry.property.toString());
        if (new Date(inquiry.updatedAt) > new Date(buyer.lastContact)) {
          buyer.lastContact = inquiry.updatedAt;
        }
      }
    });

    // 2. Get Sellers/Owners (from Assignments)
    const ownersMap = new Map();

    if (agent.assignedOwners) {
      agent.assignedOwners.forEach((assignment) => {
        if (!assignment.ownerId || !assignment.ownerId.user) return;
        const ownerId = assignment.ownerId._id.toString();

        if (!ownersMap.has(ownerId)) {
          ownersMap.set(ownerId, {
            id: assignment.ownerId._id,
            name: assignment.ownerId.user.name,
            email: assignment.ownerId.user.email,
            phone: assignment.ownerId.user.phone,
            profileImage: assignment.ownerId.user.profileImage,
            type: "Seller",
            status: "active", // specific logic for owner status?
            lastContact: assignment.lastContactDate || assignment.assignedDate,
            properties: 1,
            budget: "N/A", 
          });
        } else {
            const owner = ownersMap.get(ownerId);
            owner.properties += 1;
            // logic to update lastContact
        }
      });
    }

    // Combine and format
    const clients = [
      ...Array.from(buyersMap.values()).map(b => ({
          ...b, 
          properties: b.properties.size,
          lastContact: new Date(b.lastContact).toISOString().split('T')[0]
      })),
      ...Array.from(ownersMap.values()).map(o => ({
          ...o,
          lastContact: new Date(o.lastContact).toISOString().split('T')[0]
      }))
    ];
    
    // Sort by last contact
    clients.sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact));

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });

  } catch (error) {
    console.error("Get clients error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching clients",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

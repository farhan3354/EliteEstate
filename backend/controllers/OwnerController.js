import Owner from "../models/owner.js";
import User from "../models/authModel.js";
import Property from "../models/property.js";

// Get all owners with filters and pagination
export const getAllOwners = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      verificationStatus,
      businessType,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { "user.name": { $regex: search, $options: "i" } },
        { "user.email": { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { "businessAddress.city": { $regex: search, $options: "i" } },
        { taxId: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by verification status
    if (verificationStatus && verificationStatus !== "all") {
      query.verificationStatus = verificationStatus;
    }

    // Filter by business type
    if (businessType && businessType !== "all") {
      query.businessType = businessType;
    }

    const skip = (page - 1) * limit;

    // Get owners with populated user data
    const owners = await Owner.find(query)
      .populate({
        path: "user",
        select: "name email phone role status lastLogin createdAt",
      })
      .populate({
        path: "properties.propertyId",
        select: "title price purpose status",
      })
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Owner.countDocuments(query);

    // Get statistics for each owner
    const ownersWithStats = await Promise.all(
      owners.map(async (owner) => {
        const user = owner.user;
        const propertiesCount = owner.properties.length || 0;

        // Get active properties count
        const activeProperties = await Property.countDocuments({
          listedBy: user._id,
          status: "active",
        });

        // Get rented properties count
        const rentedProperties = await Property.countDocuments({
          listedBy: user._id,
          status: "rented",
        });

        // Get sold properties count
        const soldProperties = await Property.countDocuments({
          listedBy: user._id,
          status: "sold",
        });

        return {
          _id: owner._id,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
          },
          companyName: owner.companyName,
          businessType: owner.businessType,
          businessAddress: owner.businessAddress,
          verificationStatus: owner.verificationStatus,
          verifiedAt: owner.verifiedAt,
          totalProperties: propertiesCount,
          activeProperties,
          rentedProperties,
          soldProperties,
          monthlyRevenue: owner.monthlyRevenue || 0,
          totalRevenue: owner.totalRevenue || 0,
          createdAt: owner.createdAt,
        };
      })
    );

    // Get overall statistics
    const totalOwners = await Owner.countDocuments();
    const verifiedOwners = await Owner.countDocuments({
      verificationStatus: "verified",
    });
    const pendingOwners = await Owner.countDocuments({
      verificationStatus: "pending",
    });
    const rejectedOwners = await Owner.countDocuments({
      verificationStatus: "rejected",
    });

    res.status(200).json({
      success: true,
      data: {
        owners: ownersWithStats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        stats: {
          totalOwners,
          verifiedOwners,
          pendingOwners,
          rejectedOwners,
        },
      },
    });
  } catch (error) {
    console.error("Get all owners error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching owners",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get owner details with full information
export const getOwnerDetails = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id)
      .populate({
        path: "user",
        select: "name email phone role status lastLogin createdAt",
      })
      .populate({
        path: "properties.propertyId",
        select:
          "title price purpose status images location area bedrooms bathrooms createdAt",
      })
      .populate({
        path: "assignedAgents.agentId",
        select: "name email phone",
      })
      .populate({
        path: "tenants.tenantId",
        select: "name email phone",
      });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Get property statistics
    const propertiesStats = {
      total: owner.properties.length,
      active: owner.properties.filter((p) => p.propertyId?.status === "active")
        .length,
      rented: owner.properties.filter((p) => p.propertyId?.status === "rented")
        .length,
      sold: owner.properties.filter((p) => p.propertyId?.status === "sold")
        .length,
      inactive: owner.properties.filter(
        (p) => p.propertyId?.status === "inactive"
      ).length,
    };

    res.status(200).json({
      success: true,
      data: {
        owner,
        stats: propertiesStats,
      },
    });
  } catch (error) {
    console.error("Get owner details error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching owner details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update owner verification status
export const updateOwnerVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus, reason } = req.body;

    // Validate verification status
    const validStatuses = ["pending", "verified", "rejected", "under_review"];
    if (!validStatuses.includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid verification status. Must be one of: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Update verification status
    owner.verificationStatus = verificationStatus;

    if (verificationStatus === "verified") {
      owner.verifiedAt = new Date();
    }

    // Add verification history
    if (!owner.verificationHistory) {
      owner.verificationHistory = [];
    }

    owner.verificationHistory.push({
      status: verificationStatus,
      changedBy: req.user?.id,
      changedAt: new Date(),
      reason: reason || "Status updated by admin",
    });

    await owner.save();

    // Update user status if verified
    if (verificationStatus === "verified") {
      const user = await User.findById(owner.user);
      if (user) {
        user.status = "active";
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `Owner verification status updated to ${verificationStatus}`,
      data: {
        owner: {
          _id: owner._id,
          verificationStatus: owner.verificationStatus,
          verifiedAt: owner.verifiedAt,
        },
      },
    });
  } catch (error) {
    console.error("Update owner verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating owner verification",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update owner status (active/suspended)
export const updateOwnerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["active", "suspended", "pending", "inactive"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Update user status
    const user = await User.findById(owner.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = status;
    await user.save();

    // Add status change history
    if (!owner.statusHistory) {
      owner.statusHistory = [];
    }

    owner.statusHistory.push({
      status: status,
      changedBy: req.user.id,
      changedAt: new Date(),
      reason: req.body.reason || "Status updated by admin",
    });

    await owner.save();

    res.status(200).json({
      success: true,
      message: `Owner status updated to ${status}`,
      data: {
        owner: {
          _id: owner._id,
          user: {
            id: user._id,
            status: user.status,
          },
        },
      },
    });
  } catch (error) {
    console.error("Update owner status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating owner status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get owner statistics
export const getOwnerStats = async (req, res) => {
  try {
    const totalOwners = await Owner.countDocuments();
    const verifiedOwners = await Owner.countDocuments({
      verificationStatus: "verified",
    });
    const pendingOwners = await Owner.countDocuments({
      verificationStatus: "pending",
    });
    const rejectedOwners = await Owner.countDocuments({
      verificationStatus: "rejected",
    });

    // Business type distribution
    const businessTypes = await Owner.aggregate([
      {
        $group: {
          _id: "$businessType",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Monthly registration trend
    const monthlyRegistrations = await Owner.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ]);

    // Top owners by property count
    const topOwners = await Owner.aggregate([
      {
        $project: {
          user: 1,
          totalProperties: { $size: "$properties" },
        },
      },
      { $sort: { totalProperties: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalOwners,
        verifiedOwners,
        pendingOwners,
        rejectedOwners,
        businessTypes,
        monthlyRegistrations,
        topOwners,
      },
    });
  } catch (error) {
    console.error("Get owner stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching owner statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete owner (soft delete)
export const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;

    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Instead of deleting, mark as deleted
    owner.isDeleted = true;
    owner.deletedAt = new Date();
    owner.deletedBy = req.user.id;
    await owner.save();

    // Update user status
    const user = await User.findById(owner.user);
    if (user) {
      user.status = "inactive";
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Owner deleted successfully",
    });
  } catch (error) {
    console.error("Delete owner error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting owner",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get pending verifications
export const getPendingVerifications = async (req, res) => {
  try {
    const pendingOwners = await Owner.find({ verificationStatus: "pending" })
      .populate({
        path: "user",
        select: "name email phone createdAt",
      })
      .sort({ createdAt: 1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: {
        pendingOwners,
        count: pendingOwners.length,
      },
    });
  } catch (error) {
    console.error("Get pending verifications error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching pending verifications",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

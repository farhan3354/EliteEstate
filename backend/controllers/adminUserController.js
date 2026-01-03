import User from "../models/authModel.js";
import Property from "../models/property.js";

// Get all regular users (not agents/admins/owners) with filters
export const getAllRegularUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = { role: "user" }; // Only regular users

    // Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Get users
    const users = await User.find(query)
      .select("-password -refreshToken")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

    // Get property counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const propertiesListed = await Property.countDocuments({
          owner: user._id,
        });

        return {
          ...user.toObject(),
          propertiesListed,
        };
      })
    );

    // Get user stats
    const totalRegularUsers = await User.countDocuments({ role: "user" });
    const activeRegularUsers = await User.countDocuments({
      role: "user",
      status: "active",
    });
    const inactiveRegularUsers = await User.countDocuments({
      role: "user",
      status: "inactive",
    });

    res.status(200).json({
      success: true,
      data: {
        users: usersWithStats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: await User.countDocuments(query),
          pages: Math.ceil((await User.countDocuments(query)) / limit),
        },
        summary: {
          totalRegularUsers,
          activeRegularUsers,
          inactiveRegularUsers,
        },
      },
    });
  } catch (error) {
    console.error("Get all regular users error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching regular users",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get regular user by ID
export const getRegularUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, role: "user" }).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Regular user not found",
      });
    }

    // Get user's properties count
    const propertiesCount = await Property.countDocuments({ owner: user._id });

    res.status(200).json({
      success: true,
      data: {
        user,
        propertiesCount,
      },
    });
  } catch (error) {
    console.error("Get regular user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching regular user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update regular user status
export const updateRegularUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["active", "inactive", "suspended", "banned"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Find user (must be regular user)
    const user = await User.findOne({ _id: id, role: "user" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Regular user not found",
      });
    }

    // Check if trying to update own account
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot update your own status",
      });
    }

    // Update user status
    user.status = status;
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update regular user status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete regular user
export const deleteRegularUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, role: "user" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Regular user not found",
      });
    }

    // Check if trying to delete own account
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    // Check if user has properties
    const hasProperties = await Property.exists({ owner: user._id });

    if (hasProperties) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete user with associated properties. Deactivate instead.",
      });
    }

    // Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete regular user error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create new regular user (admin only)
export const createRegularUser = async (req, res) => {
  try {
    const { name, email, phone, password, status } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user (always role: "user")
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: "user", // Force regular user role
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Regular user created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Create regular user error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating regular user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

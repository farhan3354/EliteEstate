import jwt from "jsonwebtoken";
import User from "../models/authModel.js";
import Owner from "../models/owner.js";
import Agent from "../models/agent.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your-fallback-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);
  user.password = undefined;

  return res.status(statusCode).json({
    success: true,
    message: message,
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        profileImage: user.profileImage,
      },
    },
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role = "user" } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate role
    const validRoles = ["user", "agent", "owner", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // For regular registration, only allow 'user' role
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      role: "user", // Force user role for regular registration
    });

    // await newUser.updateLastLogin();
    createSendToken(newUser, 201, res, "Registration successful");
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const registerAsOwner = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      companyName,
      businessType = "individual",
      taxId,
      registrationNumber,
      businessAddress,
      alternatePhone,
      emergencyContact,
    } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already an owner
    const existingOwner = await Owner.findOne({ user: userId });
    if (existingOwner) {
      return res.status(400).json({
        success: false,
        message: "You are already registered as an owner",
      });
    }

    // Check if already an agent (can't be both)
    if (user.role === "agent") {
      return res.status(400).json({
        success: false,
        message: "Agents cannot register as owners",
      });
    }

    // Validate business address
    if (
      !businessAddress ||
      !businessAddress.city ||
      !businessAddress.state ||
      !businessAddress.country
    ) {
      return res.status(400).json({
        success: false,
        message: "City, state, and country are required in business address",
      });
    }

    // Create owner profile without bank details
    const owner = await Owner.create({
      user: userId,
      companyName,
      businessType,
      taxId,
      registrationNumber,
      businessAddress,
      alternatePhone,
      emergencyContact,
      verificationStatus: "pending",
    });

    // Update user role
    user.role = "owner";
    user.status = "active"; // Changed from "pending" to valid status
    await user.save();

    // Generate new token with updated role
    const token = signToken(user._id);

    res.status(201).json({
      success: true,
      message: "Owner registration submitted successfully!",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
        },
        owner: {
          id: owner._id,
          companyName: owner.companyName,
          verificationStatus: owner.verificationStatus,
        },
      },
    });
  } catch (error) {
    console.error("Owner registration error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error registering as owner",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateOwnerBankDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      accountNumber,
      bankName,
      branch,
      ifscCode,
      accountHolderName,
      accountType = "savings",
      preferredPaymentMethod = "bank_transfer",
    } = req.body;

    // Validate required fields
    if (!accountNumber || !bankName || !accountHolderName) {
      return res.status(400).json({
        success: false,
        message:
          "Account number, bank name, and account holder name are required",
      });
    }

    // Find owner profile
    const owner = await Owner.findOne({ user: userId });
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner profile not found",
      });
    }

    // Update bank details
    owner.bankDetails = {
      accountNumber,
      bankName,
      branch,
      ifscCode,
      accountHolderName,
      accountType,
    };

    owner.preferredPaymentMethod = preferredPaymentMethod;
    await owner.save();

    res.status(200).json({
      success: true,
      message: "Bank details updated successfully",
      data: {
        bankDetails: owner.bankDetails,
        preferredPaymentMethod: owner.preferredPaymentMethod,
      },
    });
  } catch (error) {
    console.error("Update bank details error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating bank details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// export const registerAsAgent = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
//       licenseNumber,
//       licenseExpiry,
//       specialization = [],
//       bio,
//       languages = [],
//       officeAddress,
//       officePhone,
//       website,
//       companyName,
//       yearsOfExperience,
//       areasServed = [],
//     } = req.body;

//     // Validate required fields
//     if (!licenseNumber || !licenseExpiry) {
//       return res.status(400).json({
//         success: false,
//         message: "License number and expiry date are required",
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Check if already an agent
//     const existingAgent = await Agent.findOne({ user: userId });
//     if (existingAgent) {
//       return res.status(400).json({
//         success: false,
//         message: "You are already registered as an agent",
//       });
//     }

//     // Check if license number is unique
//     const licenseExists = await Agent.findOne({ licenseNumber });
//     if (licenseExists) {
//       return res.status(400).json({
//         success: false,
//         message: "License number already registered",
//       });
//     }

//     // Check if already an owner (can't be both)
//     if (user.role === "owner") {
//       return res.status(400).json({
//         success: false,
//         message: "Owners cannot register as agents",
//       });
//     }

//     // Create agent profile
//     const agent = await Agent.create({
//       user: userId,
//       licenseNumber,
//       licenseExpiry: new Date(licenseExpiry),
//       specialization,
//       bio,
//       languages,
//       officeAddress,
//       officePhone,
//       website,
//       companyName,
//       yearsOfExperience,
//       areasServed,
//       verificationStatus: "pending",
//     });

//     // Update user role
//     user.role = "agent";
//     user.status = "pending"; // Pending admin approval
//     await user.save();

//     // Update last login
//     await user.updateLastLogin();

//     // Generate new token
//     const token = signToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: "Agent registration submitted. Awaiting admin approval.",
//       token,
//       data: {
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           status: user.status,
//         },
//         agent: {
//           id: agent._id,
//           licenseNumber: agent.licenseNumber,
//           verificationStatus: agent.verificationStatus,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Agent registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error registering as agent",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

export const registerAsAgent = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      licenseNumber,
      licenseExpiry,
      specialization = [],
      bio,
      languages = [],
      officeAddress,
      officePhone,
      website,
      companyName,
      yearsOfExperience,
      areasServed = [],
    } = req.body;
    if (!licenseNumber || !licenseExpiry) {
      return res.status(400).json({
        success: false,
        message: "License number and expiry date are required",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingAgent = await Agent.findOne({ user: userId });
    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: "You are already registered as an agent",
      });
    }
    const licenseExists = await Agent.findOne({ licenseNumber });
    if (licenseExists) {
      return res.status(400).json({
        success: false,
        message: "License number already registered",
      });
    }
    if (user.role === "owner") {
      return res.status(400).json({
        success: false,
        message: "Owners cannot register as agents",
      });
    }
    const agent = await Agent.create({
      user: userId,
      licenseNumber,
      licenseExpiry: new Date(licenseExpiry),
      specialization,
      bio,
      languages,
      officeAddress,
      officePhone,
      website,
      companyName,
      yearsOfExperience,
      areasServed,
      verificationStatus: "pending",
    });
    user.role = "agent";
    user.status = "active";

    await user.save();
    const token = signToken(user._id);
    return res.status(201).json({
      success: true,
      message: "Agent registration submitted successfully!",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
        },
        agent: {
          id: agent._id,
          licenseNumber: agent.licenseNumber,
          verificationStatus: agent.verificationStatus,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error registering as agent",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    if (user.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Your account is suspended. Please contact support.",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    let roleProfile = null;
    if (user.role === "owner") {
      roleProfile = await Owner.findOne({ user: user._id });
    } else if (user.role === "agent") {
      roleProfile = await Agent.findOne({ user: user._id });
    }

    createSendToken(user, 200, res, "Login successful");
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let roleData = {};
    if (user.role === "owner") {
      const owner = await Owner.findOne({ user: user._id });
      if (owner) {
        roleData = {
          owner: {
            id: owner._id,
            companyName: owner.companyName,
            businessType: owner.businessType,
            verificationStatus: owner.verificationStatus,
            totalProperties: owner.totalProperties || 0,
            activeListings: owner.activeListings || 0,
          },
        };
      }
    } else if (user.role === "agent") {
      const agent = await Agent.findOne({ user: user._id });
      if (agent) {
        roleData = {
          agent: {
            id: agent._id,
            licenseNumber: agent.licenseNumber,
            experience: agent.experience,
            specialization: agent.specialization,
            verificationStatus: agent.verificationStatus,
            rating: agent.rating,
            totalListings: agent.totalListings || 0,
          },
        };
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          profileImage: user.profileImage,
          lastLogin: user.lastLogin,
        },
        ...roleData,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};

export const checkRoleStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let roleInfo = null;

    if (user.role === "owner") {
      const owner = await Owner.findOne({ user: userId });
      roleInfo = {
        type: "owner",
        status: owner?.verificationStatus || "not_registered",
        data: owner
          ? {
              companyName: owner.companyName,
              businessType: owner.businessType,
            }
          : null,
      };
    } else if (user.role === "agent") {
      const agent = await Agent.findOne({ user: userId });
      roleInfo = {
        type: "agent",
        status: agent?.verificationStatus || "not_registered",
        data: agent
          ? {
              licenseNumber: agent.licenseNumber,
              experience: agent.experience,
            }
          : null,
      };
    } else {
      roleInfo = {
        type: "user",
        status: "registered",
        canBecomeOwner: user.role !== "agent",
        canBecomeAgent: user.role !== "owner",
      };
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          role: user.role,
          status: user.status,
        },
        roleInfo,
      },
    });
  } catch (error) {
    console.error("Check role status error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking role status",
    });
  }
};

// import jwt from "jsonwebtoken";
// import User from "../models/authModel.js";

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || "your-fallback-secret", {
//     expiresIn: process.env.JWT_EXPIRES_IN || "90d",
//   });
// };

// const createSendToken = (
//   user,
//   statusCode,
//   res,
//   message = "Registration successful"
// ) => {
//   const token = signToken(user._id);

//   user.password = undefined;

//   return res.status(statusCode).json({
//     success: true,
//     message: message,
//     token,
//     data: {
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role || "tenant", // Only role, no userType
//       },
//     },
//   });
// };

// export const register = async (req, res) => {
//   try {
//     const { name, email, phone, password, role = "tenant" } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please provide all required fields: name, email, phone, and password",
//       });
//     }

//     // Validate role
//     const validRoles = ["tenant", "landlord", "admin"];
//     if (!validRoles.includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role. Must be tenant, landlord, or admin",
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email address",
//       });
//     }

//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       password,
//       role, // Store role directly
//     });

//     createSendToken(newUser, 201, res, "Registration successful");
//   } catch (error) {
//     console.error("Registration error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide email and password",
//       });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user || !(await user.correctPassword(password, user.password))) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect email or password",
//       });
//     }

//     user.lastLogin = new Date();
//     await user.save();

//     createSendToken(user, 200, res, "Login successful");
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error during login",
//     });
//   }
// };

// export const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role || "tenant",
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get user error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user data",
//     });
//   }
// };

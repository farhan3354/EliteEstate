import jwt from "jsonwebtoken";
import User from "../models/authModel.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your-fallback-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

const createSendToken = (
  user,
  statusCode,
  res,
  message = "Registration successful"
) => {
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
        role: user.role || "tenant", // Only role, no userType
      },
    },
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role = "tenant" } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, email, phone, and password",
      });
    }

    // Validate role
    const validRoles = ["tenant", "landlord", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be tenant, landlord, or admin",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email address",
      });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      role, // Store role directly
    });

    createSendToken(newUser, 201, res, "Registration successful");
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
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

    user.lastLogin = new Date();
    await user.save();

    createSendToken(user, 200, res, "Login successful");
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
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

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role || "tenant",
        },
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
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

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);

//   user.password = undefined;

//   return res.status(statusCode).json({
//     success: true,
//     message: "Registration successful",
//     token,
//     data: {
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         userType: user.userType,
//         role: user.role,
//       },
//     },
//   });
// };

// export const register = async (req, res) => {
//   try {
//     const { name, email, phone, password, userType } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please provide all required fields: name, email, phone, and password",
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email address",
//       });
//     }

//     let role = "user";
//     if (userType === "landlord") {
//       role = "agent";
//     }

//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       password,
//       userType,
//       role,
//     });

//     createSendToken(newUser, 201, res);
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

//     createSendToken(user, 200, res);
//   } catch (error) {
//     console.error("Login error:", error);
//    return res.status(500).json({
//       success: false,
//       message: "Server error during login",
//     });
//   }
// };

// export const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//       success: true,
//       data: {
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           userType: user.userType,
//           role: user.role,
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

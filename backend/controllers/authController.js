import AuthModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerform = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All the feilds are required" });
    }
    const existinguser = await AuthModel.findOne({ email });
    if (existinguser) {
      return res.status(409).json({
        success: false,
        message: "User already exists in the database",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const role = "user";
    const status = "active";
    const user = await AuthModel.create({
      name,
      email,
      phone,
      password: hashpassword,
      userRole: role,
      userStatus: status,
    });
    return res
      .status(201)
      .json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginform = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All the fields are required" });
    }
    const checkuser = await AuthModel.findOne({ email });
    if (!checkuser) {
      return res
        .status(409)
        .json({ success: false, message: "User not exist in the database" });
    }
    const user = await bcrypt.compare(password, checkuser.password);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid details" });
    }
    const token = jwt.sign(
      { id: checkuser._id, role: checkuser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: checkuser._id,
        role: checkuser.role,
        name: checkuser.name,
        email: checkuser.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

import mongoose from "mongoose";

const AuthModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      enum: ["user", "vendor", "admin"],
      required: true,
    },
    userStatus: {
      type: String,
      enum: ["pending", "active", "blocked"],
    },
  },
  { timestamps: true }
);

const AuthModel = new mongoose.model("AuthModel", AuthModelSchema);
export default AuthModel;

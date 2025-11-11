import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    userType: {
      type: String,
      enum: ["tenant", "landlord"],
      default: "tenant",
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "suspended", "inactive"],
      default: "active",
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please provide your name"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Please provide your email"],
//       unique: true,
//       lowercase: true,
//     },
//     phone: {
//       type: String,
//       required: [true, "Please provide your phone number"],
//     },
//     password: {
//       type: String,
//       required: [true, "Please provide a password"],
//       minlength: 8,
//       select: false,
//     },
//     avatar: {
//       url: String,
//       public_id: String,
//     },
//     role: {
//       type: String,
//       enum: ["user", "agent", "admin"],
//       default: "user",
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     lastLogin: Date,
//     status: {
//       type: String,
//       enum: ["active", "suspended", "inactive"],
//       default: "active",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;

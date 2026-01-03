import express from "express";
import {
  register,
  login,
  getMe,
  registerAsOwner,
  registerAsAgent,
  checkRoleStatus,
  updateOwnerBankDetails,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getMe);
router.get("/check-role-status", protect, checkRoleStatus);
router.post("/become-owner", protect, registerAsOwner);
router.post("/become-agent", protect, registerAsAgent);
router.put("/bank-details", protect, updateOwnerBankDetails);

export default router;

// import express from "express";
// import { register, login, getMe } from "../controllers/authController.js";
// import { protect } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", protect, getMe);
// router.get("/verify", protect, (req, res) => {
//   res.json({
//     message: "Token valid",
//     user: { id: req.user.id, role: req.user.role },
//   });
// });

// export default router;

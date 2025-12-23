import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
// router.patch("/update-password", protect, updatePassword);
router.get("/verify", protect, (req, res) => {
  res.json({
    message: "Token valid",
    user: { id: req.user.id, role: req.user.role },
  });
});

export default router;

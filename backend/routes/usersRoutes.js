import express from "express";
import {
  getUserProfile,
  updateProfile,
  getUserStats,
  getAgentListings,
  becomeAgent,
} from "../controllers/userController.js";
import { adminMiddleware, protect } from "../middleware/auth.js";
import { uploadUserPhoto } from "../middleware/upload.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getUserProfile);
router.patch("/profile", uploadUserPhoto, updateProfile);
router.get("/stats", getUserStats);
router.post("/become-agent", becomeAgent);

router.get("/agent/listings", protect, adminMiddleware, getAgentListings);

export default router;

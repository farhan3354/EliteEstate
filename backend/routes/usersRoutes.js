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

router.get("/stats", getUserStats);

router.use(protect);

router.get("/profile", getUserProfile);
router.patch("/profile", uploadUserPhoto, updateProfile);
router.post("/become-agent", becomeAgent);

router.get("/agent/listings", adminMiddleware, getAgentListings);

export default router;

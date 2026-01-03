import express from "express";
import {
  getAllOwners,
  getOwnerDetails,
  updateOwnerVerification,
  updateOwnerStatus,
  getOwnerStats,
  deleteOwner,
  getPendingVerifications,
} from "../controllers/OwnerController.js";
import { protect, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Admin routes only
// router.use(protect, adminMiddleware);

router.get("/", getAllOwners);
router.get("/stats", getOwnerStats);
router.get("/pending", getPendingVerifications);
router.get("/:id", getOwnerDetails);
router.put("/:id/verify", updateOwnerVerification);
router.put("/:id/status", updateOwnerStatus);
router.delete("/:id", deleteOwner);

export default router;

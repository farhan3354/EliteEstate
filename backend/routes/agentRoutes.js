import express from "express";
import {
  getAllAgents,
  getAgentById,
  updateAgentVerification,
  updateAgentProfile,
  deleteAgent,
  getAgentStats,
} from "../controllers/adminController.js";
import { protect, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminMiddleware);

router.get("/", getAllAgents);
router.get("/stats", getAgentStats);
router.get("/:id", getAgentById);
router.put("/:id/verify", updateAgentVerification);
router.put("/:id", updateAgentProfile);
router.delete("/:id", deleteAgent);

export default router;

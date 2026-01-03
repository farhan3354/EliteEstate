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

router.get("/admin/agents", protect, getAllAgents);
// router.get("/admin/agents", protect, adminMiddleware, getAllAgents);
router.get("/admin/agents/stats", protect, adminMiddleware, getAgentStats);
router.get("/admin/agents/:id", protect, adminMiddleware, getAgentById);
router.put(
  "/admin/agents/:id/verify",
  protect,
  adminMiddleware,
  updateAgentVerification
);
router.put("/admin/agents/:id", protect, adminMiddleware, updateAgentProfile);
router.delete("/admin/agents/:id", protect, adminMiddleware, deleteAgent);

export default router;

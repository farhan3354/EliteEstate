import express from "express";
import { protect } from "../middleware/auth.js";
import {
  assignAgentToProperty,
  getOwnerPropertiesForAssignment,
  getAgentAvailability,
  createAgentAssignment,
  getAgentAssignments,
  updateAssignmentStatus,
  getVerifiedAgents,
  getAgentDetails,
} from "../controllers/agentController.js";

const router = express.Router();

router.get("/verified", protect, getVerifiedAgents);
router.get("/:id", protect, getAgentDetails);
router.post("/:agentId/assign", protect, assignAgentToProperty);

router.get("/owner/properties", protect, getOwnerPropertiesForAssignment);
router.get("/agent/:agentId/availability", protect, getAgentAvailability);
router.post("/assign", protect, createAgentAssignment);

router.get("/agent/assignments", protect, getAgentAssignments);
router.put("/assignment/:assignmentId/status", protect, updateAssignmentStatus);

export default router;

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
  updateAgentAvailability,
  getOwnerAssignedAgents,
  getAgentAssignedProperties,
  sendUpdateToOwner,
  terminateAssignment,
  extendAssignment,
} from "../controllers/agentController.js";

const router = express.Router();

router.use(protect);

router.get("/verified", getVerifiedAgents);
router.get("/:id", getAgentDetails);
router.post("/:agentId/assign", assignAgentToProperty);
router.put("/availability", updateAgentAvailability);

router.get("/owner/properties", getOwnerPropertiesForAssignment);
router.get("/:agentId/availability", getAgentAvailability);
router.post("/assign", createAgentAssignment);

router.get("/agent/assignments", getAgentAssignments);
router.put("/assignment/:assignmentId/status", updateAssignmentStatus);

router.get("/owner/assignments", getOwnerAssignedAgents);

router.get("/agent/assigned-properties", getAgentAssignedProperties);
router.post("/assignment/:assignmentId/update", sendUpdateToOwner);
router.delete("/assignments/:id", terminateAssignment);
router.put("/assignments/:id/extend", extendAssignment);

export default router;

import express from "express";
import {
  getVerifiedAgents,
  getAgentDetails,
} from "../controllers/agentController.js";

const router = express.Router();

// Public routes for finding agents
router.get("/", getVerifiedAgents);
router.get("/:id", getAgentDetails);

export default router;

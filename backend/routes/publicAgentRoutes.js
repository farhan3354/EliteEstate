import express from "express";
import {
  getVerifiedAgents,
  getAgentDetails,
} from "../controllers/agentController.js";

const router = express.Router();

router.get("/", getVerifiedAgents);
router.get("/:id", getAgentDetails);

export default router;

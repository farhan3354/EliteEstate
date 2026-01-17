import express from "express";
import {
  getMyAgentProfile,
  updateMyAgentProfile,
  getMyClients,
} from "../controllers/agentController.js";
import { protect, agent } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, agent);

router.get("/profile", getMyAgentProfile);
router.patch("/profile", updateMyAgentProfile);
router.get("/clients", getMyClients);

export default router;

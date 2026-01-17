import express from "express";
import {
  getAllRegularUsers,
  getRegularUserById,
  updateRegularUserStatus,
  deleteRegularUser,
  createRegularUser,
} from "../controllers/adminUserController.js";
import { protect, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminMiddleware);

router.get("/regular-users", getAllRegularUsers);
router.get("/regular-users/:id", getRegularUserById);
router.post("/regular-users", createRegularUser);
router.put("/regular-users/:id/status", updateRegularUserStatus);
router.delete("/regular-users/:id", deleteRegularUser);

export default router;

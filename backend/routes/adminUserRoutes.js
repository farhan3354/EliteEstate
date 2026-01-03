import express from "express";
import {
  getAllRegularUsers,
  getRegularUserById,
  updateRegularUserStatus,
  deleteRegularUser,
  createRegularUser,
} from "../controllers/adminUserController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/admin/regular-users", protect, getAllRegularUsers);
router.get("/admin/regular-users/:id", protect, getRegularUserById);
router.post("/admin/regular-users", protect, createRegularUser);
router.put("/admin/regular-users/:id/status", protect, updateRegularUserStatus);
router.delete("/admin/regular-users/:id", protect, deleteRegularUser);

export default router;

import express from "express";
const router = express.Router();

import {
  getAdminProperties,
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
  searchProperties,
  updatePropertyStatus,
} from "../controllers/propertyController.js";
import { protect, adminMiddleware } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

router.get("/", getProperties);
router.get("/search", searchProperties);
router.get("/:id", getProperty);

router.use(protect);

router.get("/admin", adminMiddleware, getAdminProperties); 
router.get("/user/my-properties", getUserProperties);

router.post("/", upload.array("images", 5), createProperty);
router.put("/:id/status", updatePropertyStatus);
router.put("/:id", upload.array("images", 5), updateProperty);

router.delete("/:id", deleteProperty);

export default router;

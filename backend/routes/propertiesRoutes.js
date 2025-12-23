import express from "express";
import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
  searchProperties,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js"; // Make sure this path is correct

const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/search", searchProperties);
router.get("/:id", getProperty);

// Protected routes
router.use(protect);

// Create property - Use same field name as product upload
router.post("/", upload.array("images", 5), createProperty);

// User properties
router.get("/user/my-properties", getUserProperties);

// Update property
router.put("/:id", upload.array("images", 5), updateProperty);

// Delete property
router.delete("/:id", deleteProperty);

export default router;

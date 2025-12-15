import express from "express";
import {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getUserProperties,
  searchProperties,
  getSimilarProperties,
  incrementViews,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/auth.js";
import { uploadPropertyImages } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/featured", getFeaturedProperties);
router.get("/search", searchProperties);
router.get("/similar/:id", getSimilarProperties);
router.get("/:id", getProperty);
router.patch("/:id/views", incrementViews);

router.use(protect);

router.post("/", uploadPropertyImages, createProperty);
router.get("/user/my-properties", getUserProperties);
router.patch("/:id", uploadPropertyImages, updateProperty);
router.delete("/:id", deleteProperty);

export default router;

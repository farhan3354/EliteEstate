import express from "express";
const router = express.Router();

import {
  getAllLocations,
  getPopularLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";
import { protect, adminMiddleware } from "../middleware/auth.js";
import { uploadLocation } from "../config/cloudinary.js";

router.get("/", getAllLocations);
router.get("/popular", getPopularLocations);

// Admin only routes
router.use(protect);
router.use(adminMiddleware);

router.post("/", (req, res, next) => {
  uploadLocation.single("image")(req, res, (err) => {
    if (err) {
      console.error("DEBUG: Multer/Cloudinary POST error:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Image upload failed", 
        error: err.message 
      });
    }
    next();
  });
}, createLocation);

router.put("/:id", (req, res, next) => {
  uploadLocation.single("image")(req, res, (err) => {
    if (err) {
      console.error("DEBUG: Multer/Cloudinary PUT error:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Image upload failed", 
        error: err.message 
      });
    }
    next();
  });
}, updateLocation);
router.delete("/:id", deleteLocation);

export default router;

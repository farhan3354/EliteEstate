// propertyRoutes.js
import express from "express";
const router = express.Router();

// Import controllers
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
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

router.get("/admin", protect, getAdminProperties); 

router.get("/search", searchProperties);
router.get("/user/my-properties", protect, getUserProperties);

router.use(protect);

router.post("/", upload.array("images", 5), createProperty);
router.put("/:id/status", updatePropertyStatus);
router.put("/:id", upload.array("images", 5), updateProperty);

router.get("/", getProperties);
router.get("/:id", getProperty);
router.delete("/:id", deleteProperty);

export default router;

// import express from "express";
// import {
//   createProperty,
//   getProperties,
//   getProperty,
//   updateProperty,
//   deleteProperty,
//   getUserProperties,
//   searchProperties,
//   updatePropertyStatus,
//   getAdminProperties,
// } from "../controllers/propertyController.js";
// import { adminMiddleware, protect } from "../middleware/auth.js";
// import { upload } from "../config/cloudinary.js";

// const router = express.Router();

// // Public routes
// router.get("/", getProperties);
// router.get("/search", searchProperties);
// router.get("/:id", getProperty);

// // Protected routes
// router.use(protect);

// // Create property - Use same field name as product upload
// router.post("/", upload.array("images", 5), protect, createProperty);

// // User properties
// router.get("/user/my-properties", protect, getUserProperties);

// // Update property
// router.put("/:id", upload.array("images", 5), protect, updateProperty);
// router.put("/:id/status", protect, updatePropertyStatus);
// router.get("/admin/all", protect, getAdminProperties);

// // Delete property
// router.delete("/:id", protect, deleteProperty);

// export default router;

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
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getFeaturedProperties,
  getPropertyCategories,
} from "../controllers/propertyController.js";
import { protect, adminMiddleware } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

router.get("/", getProperties);
router.get("/featured", getFeaturedProperties);
router.get("/categories", getPropertyCategories);
router.get("/search", searchProperties);

router.get("/admin", protect, adminMiddleware, getAdminProperties); 
router.get("/admin/pending", protect, adminMiddleware, getPendingProperties);
router.put("/admin/:id/approve", protect, adminMiddleware, approveProperty);
router.put("/admin/:id/reject", protect, adminMiddleware, rejectProperty);

router.get("/:id", getProperty);

router.use(protect);

router.get("/user/my-properties", getUserProperties);
router.post("/", upload.array("images", 5), createProperty);
router.put("/:id/status", updatePropertyStatus);
router.put("/:id", upload.array("images", 5), updateProperty);
router.delete("/:id", deleteProperty);

export default router;

// import express from "express";
// const router = express.Router();

// import {
//   getAdminProperties,
//   createProperty,
//   getProperties,
//   getProperty,
//   updateProperty,
//   deleteProperty,
//   getUserProperties,
//   searchProperties,
//   updatePropertyStatus,
//   getPendingProperties,
//   approveProperty,
//   rejectProperty,
// } from "../controllers/propertyController.js";
// import { protect, adminMiddleware } from "../middleware/auth.js";
// import { upload } from "../config/cloudinary.js";

// router.get("/", getProperties);
// router.get("/search", searchProperties);
// router.get("/:id", getProperty);

// router.use(protect);

// router.get("/admin", adminMiddleware, getAdminProperties); 
// router.get("/admin/pending", adminMiddleware, getPendingProperties);
// router.put("/admin/:id/approve", adminMiddleware, approveProperty);
// router.put("/admin/:id/reject", adminMiddleware, rejectProperty);
// router.get("/user/my-properties", getUserProperties);

// router.post("/", upload.array("images", 5), createProperty);
// router.put("/:id/status", updatePropertyStatus);
// router.put("/:id", upload.array("images", 5), updateProperty);

// router.delete("/:id", deleteProperty);

// export default router;

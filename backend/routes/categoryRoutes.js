import express from "express";
import { 
  getAllCategories, 
  createCategory, 
  deleteCategory 
} from "../controllers/categoryController.js";
// import { protect, authorize } from "../middleware/authMiddleware.js";

import { uploadCategory } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllCategories);

// Currently ignoring auth for simplicity as requested/implied by previous sessions, 
// but in a real app these would be protected
router.post("/", uploadCategory.single("image"), createCategory);
router.delete("/:id", deleteCategory);

export default router;

import express from "express";
import {
  createInquiry,
  getMyInquiries,
  getPropertyInquiries,
  getSellerInquiries,
  respondToInquiry,
  updateInquiryStatus,
  markInquiryAsRead,
  getInquiryDetails,
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Buyer routes
router.post("/", createInquiry);
router.get("/my-inquiries", getMyInquiries);

// Seller/Agent routes
router.get("/seller/inquiries", getSellerInquiries);
router.get("/property/:propertyId", getPropertyInquiries);

// Shared routes (buyer or seller)
router.get("/:id", getInquiryDetails);
router.post("/:id/respond", respondToInquiry);

// Seller-only routes
router.patch("/:id/status", updateInquiryStatus);
router.patch("/:id/read", markInquiryAsRead);

export default router;

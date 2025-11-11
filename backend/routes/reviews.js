import express from "express";
import {
  getPropertyReviews,
  getAgentReviews,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
  addReviewResponse,
} from "../controllers/reviewsController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/property/:propertyId", getPropertyReviews);
router.get("/agent/:agentId", getAgentReviews);

router.use(protect);

router.get("/my-reviews", getMyReviews);
router.post("/", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);
router.patch("/:id/response", authorize("agent", "admin"), addReviewResponse);

export default router;

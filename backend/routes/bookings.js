import express from "express";
import {
  createBooking,
  getMyBookings,
  getPropertyBookings,
  updateBookingStatus,
  cancelBooking,
  getAgentBookings,
  confirmBooking,
} from "../controllers/bookingController.js";
import { adminMiddleware, protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/my-bookings", getMyBookings);
router.post("/", createBooking);
router.patch("/:id/cancel", cancelBooking);

router.get("/agent/my-bookings", protect, adminMiddleware, getAgentBookings);
router.get(
  "/property/:propertyId",
  protect,
  adminMiddleware,
  getPropertyBookings
);
router.patch("/:id/status", protect, updateBookingStatus);
router.patch("/:id/confirm", protect, confirmBooking);

export default router;

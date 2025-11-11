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
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/my-bookings", getMyBookings);
router.post("/", createBooking);
router.patch("/:id/cancel", cancelBooking);

router.get("/agent/my-bookings", authorize("agent", "admin"), getAgentBookings);
router.get(
  "/property/:propertyId",
  authorize("agent", "admin"),
  getPropertyBookings
);
router.patch("/:id/status", authorize("agent", "admin"), updateBookingStatus);
router.patch("/:id/confirm", authorize("agent", "admin"), confirmBooking);

export default router;

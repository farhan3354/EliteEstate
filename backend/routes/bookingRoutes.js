import express from "express";
import {
  createBooking,
  getMyBookings,
  getLandlordBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.get("/landlord-bookings", getLandlordBookings);
router.put("/:id/status", updateBookingStatus);

export default router;

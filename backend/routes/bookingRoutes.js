import express from "express";
import {
  createBooking,
  getMyBookings,
  getLandlordBookings,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.get("/landlord-bookings", getLandlordBookings);
router.get("/all-bookings", getAllBookings); // Admin check should be in middleware if needed, or handled here
router.put("/:id/status", updateBookingStatus);

export default router;

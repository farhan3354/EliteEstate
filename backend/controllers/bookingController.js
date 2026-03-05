import Booking from "../models/booking.js";
import Property from "../models/property.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { propertyId, date, time, message } = req.body;
    const userId = req.user.id;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const booking = await Booking.create({
      property: propertyId,
      user: userId,
      landlord: property.listedBy,
      date,
      time,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Viewing request sent successfully",
      data: { booking },
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// Get all bookings for a user (buyer)
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId })
      .populate("property", "title location images")
      .populate("landlord", "name email phone")
      .sort("-date");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: { bookings },
    });
  } catch (error) {
    console.error("Get my bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// Get all bookings for a landlord
export const getLandlordBookings = async (req, res) => {
  try {
    const landlordId = req.user.id;
    const bookings = await Booking.find({ landlord: landlordId })
      .populate("property", "title location images")
      .populate("user", "name email phone")
      .sort("-date");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: { bookings },
    });
  } catch (error) {
    console.error("Get landlord bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// Update booking status (confirm/cancel)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user is landlord or buyer
    const isLandlord = booking.landlord.toString() === userId;
    const isBuyer = booking.user.toString() === userId;

    if (!isLandlord && !isBuyer) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this booking",
      });
    }

    // Landlords can confirm/cancel, Buyers can only cancel
    if (isBuyer && status === "confirmed") {
      return res.status(403).json({
        success: false,
        message: "Buyers cannot confirm bookings",
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: { booking },
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property", "title location images")
      .populate("user", "name email phone")
      .populate("landlord", "name email phone")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: { bookings },
    });
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all bookings",
    });
  }
};

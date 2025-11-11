import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, scheduledDate, duration, message, type } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "No property exist with that id" });
    }

    const scheduled = new Date(scheduledDate);
    if (scheduled <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Scheduled date must be in the future",
      });
    }

    const conflictingBooking = await Booking.findOne({
      property: propertyId,
      scheduledDate: {
        $gte: new Date(scheduled.getTime() - 30 * 60 * 1000),
        $lte: new Date(scheduled.getTime() + duration * 60 * 1000),
      },
      status: { $in: ["pending", "confirmed"] },
    });

    if (conflictingBooking) {
      return res
        .status(409)
        .json({ success: false, message: "This time slot is already booked" });
    }

    const booking = await Booking.create({
      property: propertyId,
      user: req.user.id,
      agent: property.listedBy,
      type: type || "viewing",
      scheduledDate: scheduled,
      duration: duration || 30,
      message,
      contactInfo: {
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
      },
    });

    await booking.populate("property", "title images location");
    await booking.populate("agent", "name avatar company phone");
    await booking.populate("user", "name avatar phone");

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        booking,
      },
    });
  } catch (error) {
    console.error("Create booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate("property", "title images location price type")
      .populate("agent", "name avatar company phone")
      .sort("-scheduledDate");

    return res.status(200).json({
      success: true,
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    console.error("Get my bookings error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getPropertyBookings = async (req, res) => {
  try {
    const agentId = req.user.id;
    const { propertyId } = req.params;

    const bookings = await Booking.find({
      property: propertyId,
      agent: agentId,
    })
      .populate("user", "name avatar phone email")
      .sort("-scheduledDate");

    return res.status(200).json({
      success: true,
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    console.error("Get property bookings error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.agent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this booking",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("property", "title images location")
      .populate("user", "name avatar phone email")
      .populate("agent", "name avatar company phone");

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: {
        booking: updatedBooking,
      },
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.user.toString() !== req.user.id &&
      booking.agent.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
        cancellationReason,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("property", "title images location")
      .populate("user", "name avatar phone email")
      .populate("agent", "name avatar company phone");

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: {
        booking: updatedBooking,
      },
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAgentBookings = async (req, res) => {
  try {
    const agentId = req.user.id;

    const bookings = await Booking.find({ agent: agentId })
      .populate("property", "title images location price type")
      .populate("user", "name avatar phone email")
      .sort("-scheduledDate");

    return res.status(200).json({
      success: true,
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    console.error("Get agent bookings error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.agent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to confirm this booking",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: "confirmed" },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("property", "title images location")
      .populate("user", "name avatar phone email")
      .populate("agent", "name avatar company phone");

    return res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      data: {
        booking: updatedBooking,
      },
    });
  } catch (error) {
    console.error("Confirm booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

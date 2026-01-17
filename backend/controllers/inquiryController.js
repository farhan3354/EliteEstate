import Inquiry from "../models/inquiry.js";
import Property from "../models/property.js";
import User from "../models/authModel.js";

// Create new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { propertyId, message, contactMethod, buyerContact } = req.body;
    const buyerId = req.user.id;

    console.log("📧 Creating inquiry:", { propertyId, buyerId });

    // Verify property exists
    const property = await Property.findById(propertyId).populate("listedBy");
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Get seller ID (property owner or agent)
    const sellerId = property.listedBy._id;

    // Check if buyer already has an inquiry for this property
    const existingInquiry = await Inquiry.findOne({
      property: propertyId,
      buyer: buyerId,
      status: { $in: ["new", "contacted", "viewing-scheduled", "negotiating"] },
    });

    if (existingInquiry) {
      return res.status(400).json({
        success: false,
        message: "You already have an active inquiry for this property",
        data: { inquiryId: existingInquiry._id },
      });
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      property: propertyId,
      buyer: buyerId,
      seller: sellerId,
      message,
      contactMethod: contactMethod || "chat",
      buyerContact: buyerContact || {
        name: req.user.name,
        phone: req.user.phone || "",
        email: req.user.email,
      },
    });

    // Populate inquiry details
    await inquiry.populate([
      { path: "property", select: "title images price location purpose" },
      { path: "buyer", select: "name email phone profileImage" },
      { path: "seller", select: "name email phone profileImage role" },
    ]);

    console.log("✅ Inquiry created successfully");

    res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      data: { inquiry },
    });
  } catch (error) {
    console.error("❌ Create inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating inquiry",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get buyer's inquiries
export const getMyInquiries = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { status } = req.query;

    console.log("📋 Fetching buyer inquiries:", { buyerId, status });

    const filter = { buyer: buyerId };
    if (status && status !== "all") {
      filter.status = status;
    }

    const inquiries = await Inquiry.find(filter)
      .populate("property", "title images price location purpose status")
      .populate("seller", "name email phone profileImage role")
      .sort("-createdAt");

    const stats = {
      total: await Inquiry.countDocuments({ buyer: buyerId }),
      new: await Inquiry.countDocuments({ buyer: buyerId, status: "new" }),
      contacted: await Inquiry.countDocuments({
        buyer: buyerId,
        status: "contacted",
      }),
      viewingScheduled: await Inquiry.countDocuments({
        buyer: buyerId,
        status: "viewing-scheduled",
      }),
      negotiating: await Inquiry.countDocuments({
        buyer: buyerId,
        status: "negotiating",
      }),
    };

    res.status(200).json({
      success: true,
      results: inquiries.length,
      data: { inquiries, stats },
    });
  } catch (error) {
    console.error("❌ Get my inquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inquiries",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get property inquiries (for seller/agent)
export const getPropertyInquiries = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    console.log("📋 Fetching property inquiries:", { propertyId, userId });

    // Verify user owns the property or is the agent
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.listedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view these inquiries",
      });
    }

    const inquiries = await Inquiry.find({ property: propertyId })
      .populate("buyer", "name email phone profileImage")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: inquiries.length,
      data: { inquiries },
    });
  } catch (error) {
    console.error("❌ Get property inquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching property inquiries",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all inquiries for seller/agent
export const getSellerInquiries = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { status } = req.query;

    console.log("📋 Fetching seller inquiries:", { sellerId, status });

    const filter = { seller: sellerId };
    if (status && status !== "all") {
      filter.status = status;
    }

    const inquiries = await Inquiry.find(filter)
      .populate("property", "title images price location purpose status")
      .populate("buyer", "name email phone profileImage")
      .sort("-createdAt");

    const stats = {
      total: await Inquiry.countDocuments({ seller: sellerId }),
      new: await Inquiry.countDocuments({
        seller: sellerId,
        status: "new",
        readBySeller: false,
      }),
      contacted: await Inquiry.countDocuments({
        seller: sellerId,
        status: "contacted",
      }),
      viewingScheduled: await Inquiry.countDocuments({
        seller: sellerId,
        status: "viewing-scheduled",
      }),
      negotiating: await Inquiry.countDocuments({
        seller: sellerId,
        status: "negotiating",
      }),
    };

    res.status(200).json({
      success: true,
      results: inquiries.length,
      data: { inquiries, stats },
    });
  } catch (error) {
    console.error("❌ Get seller inquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inquiries",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Respond to inquiry
export const respondToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    console.log("💬 Responding to inquiry:", { id, userId });

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Verify user is buyer or seller
    const isBuyer = inquiry.buyer.toString() === userId;
    const isSeller = inquiry.seller.toString() === userId;

    if (!isBuyer && !isSeller) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to respond to this inquiry",
      });
    }

    // Add response
    inquiry.responses.push({
      from: userId,
      message,
      timestamp: new Date(),
    });

    // Update status if seller is responding for the first time
    if (isSeller && inquiry.status === "new") {
      inquiry.status = "contacted";
      inquiry.readBySeller = true;
    }

    await inquiry.save();

    await inquiry.populate([
      { path: "property", select: "title images price location" },
      { path: "buyer", select: "name email phone profileImage" },
      { path: "seller", select: "name email phone profileImage role" },
      { path: "responses.from", select: "name profileImage" },
    ]);

    res.status(200).json({
      success: true,
      message: "Response added successfully",
      data: { inquiry },
    });
  } catch (error) {
    console.error("❌ Respond to inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Error responding to inquiry",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update inquiry status
export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const userId = req.user.id;

    console.log("🔄 Updating inquiry status:", { id, status, userId });

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Verify user is seller
    if (inquiry.seller.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this inquiry",
      });
    }

    // Update status
    inquiry.status = status;
    if (notes) {
      inquiry.notes = notes;
    }
    inquiry.readBySeller = true;

    await inquiry.save();

    await inquiry.populate([
      { path: "property", select: "title images price location" },
      { path: "buyer", select: "name email phone profileImage" },
    ]);

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      data: { inquiry },
    });
  } catch (error) {
    console.error("❌ Update inquiry status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating inquiry status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Mark inquiry as read
export const markInquiryAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Only seller can mark as read
    if (inquiry.seller.toString() === userId) {
      inquiry.readBySeller = true;
      await inquiry.save();
    }

    res.status(200).json({
      success: true,
      message: "Inquiry marked as read",
    });
  } catch (error) {
    console.error("❌ Mark inquiry as read error:", error);
    res.status(500).json({
      success: false,
      message: "Error marking inquiry as read",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get single inquiry details
export const getInquiryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const inquiry = await Inquiry.findById(id)
      .populate("property", "title images price location purpose status")
      .populate("buyer", "name email phone profileImage")
      .populate("seller", "name email phone profileImage role")
      .populate("responses.from", "name profileImage")
      .populate("bookingId");

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Verify user is buyer or seller
    const isBuyer = inquiry.buyer._id.toString() === userId;
    const isSeller = inquiry.seller._id.toString() === userId;

    if (!isBuyer && !isSeller) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this inquiry",
      });
    }

    // Mark as read if seller is viewing
    if (isSeller && !inquiry.readBySeller) {
      inquiry.readBySeller = true;
      await inquiry.save();
    }

    res.status(200).json({
      success: true,
      data: { inquiry },
    });
  } catch (error) {
    console.error("❌ Get inquiry details error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inquiry details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

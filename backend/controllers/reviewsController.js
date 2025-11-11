import Review from "../models/review.js";
import Property from "../models/property.js";

// Get reviews for a property
export const getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
      status: "active",
    })
      .populate("user", "name avatar")
      .populate("agent", "name avatar company")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching property reviews",
      error: error.message,
    });
  }
};

// Get reviews for an agent
export const getAgentReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      agent: req.params.agentId,
      status: "active",
    })
      .populate("user", "name avatar")
      .populate("property", "title images location")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching agent reviews",
      error: error.message,
    });
  }
};

// Create a review
export const createReview = async (req, res) => {
  try {
    const { propertyId, agentId, rating, title, comment, categories } =
      req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Verify agent owns the property
    if (property.listedBy.toString() !== agentId) {
      return res.status(400).json({
        success: false,
        message: "Agent did not list this property",
      });
    }

    // Check for existing review
    const existingReview = await Review.findOne({
      property: propertyId,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this property",
      });
    }

    // Create review
    const review = await Review.create({
      property: propertyId,
      user: req.user.id,
      agent: agentId,
      rating,
      title,
      comment,
      categories: categories ? JSON.parse(categories) : undefined,
    });

    await review.populate("user", "name avatar");
    await review.populate("agent", "name avatar company");

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this review",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "name avatar")
      .populate("agent", "name avatar company");

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: {
        review: updatedReview,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check ownership or admin role
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

// Get user's reviews
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate("property", "title images location")
      .populate("agent", "name avatar company")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your reviews",
      error: error.message,
    });
  }
};

// Add response to review (agent only)
export const addReviewResponse = async (req, res) => {
  try {
    const { response } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user is the agent being reviewed
    if (review.agent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to respond to this review",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        response: {
          comment: response,
          respondedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "name avatar")
      .populate("agent", "name avatar company");

    res.status(200).json({
      success: true,
      message: "Response added successfully",
      data: {
        review: updatedReview,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding response to review",
      error: error.message,
    });
  }
};

import Favorite from "../models/favorite.js";
import Property from "../models/property.js";

// Get user's favorite properties
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate({
        path: "property",
        populate: {
          path: "listedBy",
          select: "name avatar rating company",
        },
      })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: favorites.length,
      data: {
        favorites: favorites.map((fav) => fav.property),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching favorites",
      error: error.message,
    });
  }
};

// Add property to favorites
export const addToFavorites = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      property: propertyId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: "Property already in favorites",
      });
    }

    // Create favorite
    const favorite = await Favorite.create({
      user: req.user.id,
      property: propertyId,
    });

    // Update favorites count
    await Property.findByIdAndUpdate(propertyId, {
      $inc: { favoritesCount: 1 },
    });

    res.status(201).json({
      success: true,
      message: "Property added to favorites",
      data: {
        favorite,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Property already in favorites",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding to favorites",
      error: error.message,
    });
  }
};

// Remove property from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      property: propertyId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    // Update favorites count
    await Property.findByIdAndUpdate(propertyId, {
      $inc: { favoritesCount: -1 },
    });

    res.status(200).json({
      success: true,
      message: "Property removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing from favorites",
      error: error.message,
    });
  }
};

// Check if property is favorite
export const checkIsFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user.id,
      property: propertyId,
    });

    res.status(200).json({
      success: true,
      data: {
        isFavorite: !!favorite,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking favorite status",
      error: error.message,
    });
  }
};

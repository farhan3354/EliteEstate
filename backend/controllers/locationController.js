import Location from "../models/location.js";
import { v2 as cloudinary } from "cloudinary";

// Get all locations
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get popular locations
export const getPopularLocations = async (req, res) => {
  try {
    const locations = await Location.find({ isActive: true, isPopular: true }).sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create location (Admin only)
export const createLocation = async (req, res) => {
  try {
    const { name, description, isPopular } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Location name is required" });
    }

    // Check if location already exists
    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {
      return res.status(400).json({ success: false, message: "Location already exists" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Location image is required" });
    }

    const location = await Location.create({
      name,
      description,
      isPopular: isPopular === "true" || isPopular === true,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update location (Admin only)
export const updateLocation = async (req, res) => {
  try {
    const { name, description, isPopular, isActive } = req.body;
    let location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    const updateData = {
      name: name || location.name,
      description: description || location.description,
      isPopular: isPopular !== undefined ? (isPopular === "true" || isPopular === true) : location.isPopular,
      isActive: isActive !== undefined ? (isActive === "true" || isActive === true) : location.isActive,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    location = await Location.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete location (Admin only)
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    await location.deleteOne();

    res.status(200).json({
      success: true,
      message: "Location removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

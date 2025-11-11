import Property from "../models/property.js";
import Profile from "../models/profile.js";
import cloudinary from "../config/cloudinary.js";

// Upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "property-listings",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "jpg" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = "-createdAt",
      category,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      location,
    } = req.query;

    // Build filter
    const filter = { status: "active" };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (location) filter["location.area"] = { $regex: location, $options: "i" };
    if (bedrooms) filter.bedrooms = parseInt(bedrooms);

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    const properties = await Property.find(filter)
      .populate("listedBy", "name avatar rating company")
      .sort(sort)
      .limit(limit * 1)
      .skip(skip);

    const total = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      results: properties.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: {
        properties,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: error.message,
    });
  }
};

// Get single property
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "listedBy",
      "name email phone avatar company rating reviewCount"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        property,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching property",
      error: error.message,
    });
  }
};

// Create property
export const createProperty = async (req, res) => {
  try {
    // Upload images
    const imageUploads = req.files.map(uploadToCloudinary);
    const uploadedImages = await Promise.all(imageUploads);

    const images = uploadedImages.map((img, index) => ({
      url: img.secure_url,
      public_id: img.public_id,
      isPrimary: index === 0,
    }));

    // Prepare property data
    const propertyData = {
      ...req.body,
      images,
      listedBy: req.user.id,
      contactInfo: {
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
        showPhone: req.body.showPhone !== "false",
      },
    };

    // Parse JSON fields
    if (req.body.amenities) {
      propertyData.amenities = JSON.parse(req.body.amenities);
    }

    const property = await Property.create(propertyData);

    // Update user's property count
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { propertiesListed: 1 } }
    );

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: {
        property,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating property",
      error: error.message,
    });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (
      property.listedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }

    let updateData = { ...req.body };

    // Handle new images
    if (req.files && req.files.length > 0) {
      const imageUploads = req.files.map(uploadToCloudinary);
      const uploadedImages = await Promise.all(imageUploads);
      const newImages = uploadedImages.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id,
        isPrimary: false,
      }));

      updateData.images = [...property.images, ...newImages];
    }

    // Parse JSON fields
    if (req.body.amenities) {
      updateData.amenities = JSON.parse(req.body.amenities);
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("listedBy", "name avatar rating company");

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: {
        property: updatedProperty,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating property",
      error: error.message,
    });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (
      property.listedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }

    // Delete images from Cloudinary
    if (property.images.length > 0) {
      const deletePromises = property.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );
      await Promise.all(deletePromises);
    }

    await Property.findByIdAndDelete(req.params.id);

    // Update user's property count
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { propertiesListed: -1 } }
    );

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting property",
      error: error.message,
    });
  }
};

// Get featured properties
export const getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      isFeatured: true,
      status: "active",
    })
      .populate("listedBy", "name avatar rating company")
      .limit(8)
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured properties",
      error: error.message,
    });
  }
};

// Get user's properties
export const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ listedBy: req.user.id })
      .populate("listedBy", "name avatar rating company")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user properties",
      error: error.message,
    });
  }
};

// Search properties
export const searchProperties = async (req, res) => {
  try {
    const { q, category, type, minPrice, maxPrice, bedrooms, location, area } =
      req.query;

    let query = { status: "active" };

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { "location.area": { $regex: q, $options: "i" } },
      ];
    }

    // Filters
    if (category) query.category = category;
    if (type) query.type = type;
    if (bedrooms) query.bedrooms = parseInt(bedrooms);
    if (location) query["location.area"] = { $regex: location, $options: "i" };
    if (area) query.area = { $gte: parseInt(area) };

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    const properties = await Property.find(query)
      .populate("listedBy", "name avatar rating company")
      .sort("-createdAt")
      .limit(20);

    res.status(200).json({
      success: true,
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching properties",
      error: error.message,
    });
  }
};

// Get similar properties
export const getSimilarProperties = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const similarProperties = await Property.find({
      _id: { $ne: property._id },
      category: property.category,
      type: property.type,
      status: "active",
      "location.area": property.location.area,
    })
      .populate("listedBy", "name avatar rating company")
      .limit(4)
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      results: similarProperties.length,
      data: {
        properties: similarProperties,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching similar properties",
      error: error.message,
    });
  }
};

// Increment views
export const incrementViews = async (req, res) => {
  try {
    await Property.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json({
      success: true,
      message: "View count updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating views",
      error: error.message,
    });
  }
};

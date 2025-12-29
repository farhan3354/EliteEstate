import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    console.log("🎯 Create Property API Called");

    // Debug logging
    console.log("📝 Request body keys:", Object.keys(req.body));
    console.log("📁 Files received:", req.files?.length || 0);

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

    // Helper function to safely parse JSON strings from FormData
    const parseFormDataField = (field) => {
      if (!field) return null;
      if (typeof field !== "string") return field;
      try {
        return JSON.parse(field);
      } catch (e) {
        console.log(`⚠️ Failed to parse field:`, field?.substring(0, 100));
        return null;
      }
    };

    // Parse the string fields from FormData
    const locationData = parseFormDataField(req.body.location) || {};
    const contactInfoData = parseFormDataField(req.body.contactInfo) || {};

    // Basic validation - ONLY FIELDS THAT EXIST IN SCHEMA
    const requiredFields = [
      "title",
      "description",
      "price",
      "purpose",
      "category",
      "bedrooms",
      "bathrooms",
      "area",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // File validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    if (req.files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 files allowed",
      });
    }

    // Extract Cloudinary URLs from req.files
    const images = req.files.map((file) => file.path);
    console.log("☁️ Cloudinary URLs:", images);

    // Basic property data - ONLY FIELDS THAT EXIST IN SCHEMA
    const propertyData = {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      price: parseFloat(req.body.price),
      purpose: req.body.purpose,
      category: req.body.category,
      bedrooms: parseInt(req.body.bedrooms),
      bathrooms: parseInt(req.body.bathrooms),
      area: parseFloat(req.body.area),
      listedBy: userId,
      status: req.body.status || "active",
      images,
    };

    // Handle location - ONLY FIELDS THAT EXIST IN SCHEMA
    if (locationData && Object.keys(locationData).length > 0) {
      propertyData.location = {
        address: locationData.address || "",
        city: locationData.city || "Abu Dhabi",
        area: locationData.area || "",
      };
    }

    // Handle contact info - ONLY FIELDS THAT EXIST IN SCHEMA
    if (contactInfoData && Object.keys(contactInfoData).length > 0) {
      propertyData.contactInfo = {
        name: contactInfoData.name || "",
        phone: contactInfoData.phone || "",
        email: contactInfoData.email || "",
        showPhone: contactInfoData.showPhone !== false,
      };
    }

    // Handle optional fields - ONLY FIELDS THAT EXIST IN SCHEMA
    if (req.body.yearBuilt) {
      propertyData.yearBuilt = parseInt(req.body.yearBuilt);
    }
    if (req.body.furnishing) {
      propertyData.furnishing = req.body.furnishing;
    }
    if (req.body.areaUnit) {
      propertyData.areaUnit = req.body.areaUnit;
    }
    if (req.body.isUrgent === "true") {
      propertyData.isUrgent = true;
    }
    if (req.body.isVerified === "true") {
      propertyData.isVerified = true;
    }

    // NOTE: REMOVED fields that don't exist in schema:
    // - isFeatured (not in schema)
    // - features (not in schema)
    // - amenities (not in schema)
    // - availableFrom (not in schema)
    // - coordinates (not in schema)
    // - community (not in schema)

    console.log(
      "💾 Creating property with data:",
      JSON.stringify(propertyData, null, 2)
    );

    // Create the property
    const property = await Property.create(propertyData);

    console.log("✅ Property created successfully with ID:", property._id);

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: {
        property,
      },
    });
  } catch (error) {
    console.error("❌ Property creation failed:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Handle specific errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages.join(", ")}`,
        errors: messages,
      });
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry. This property already exists.",
      });
    }

    // Ensure we always send a proper JSON response, not HTML
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message || "Unknown error",
    });
  }
};

// Get all properties
// export const getProperties = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       purpose,
//       category,
//       minPrice,
//       maxPrice,
//     } = req.query;

//     const query = { status: "active" };

//     if (purpose) query.purpose = purpose;
//     if (category) query.category = category;
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     const skip = (page - 1) * limit;

//     const properties = await Property.find(query)
//       .populate("listedBy", "name email")
//       .sort("-createdAt")
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Property.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       count: properties.length,
//       total,
//       data: {
//         properties,
//       },
//     });
//   } catch (error) {
//     console.error("Get properties error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch properties",
//     });
//   }
// };
// In your backend route handlers

// Search properties with all filters
export const searchProperties = async (req, res) => {
  try {
    const {
      q,
      purpose,
      category,
      minPrice,
      maxPrice,
      city,
      bedrooms,
      furnishing,
      area,
      sortBy,
    } = req.query;

    const query = { status: "active" };

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { "location.address": { $regex: q, $options: "i" } },
      ];
    }

    // Basic filters
    if (purpose) query.purpose = purpose;
    if (category && category !== "all") query.category = category;

    // Location filters
    if (city) query["location.city"] = { $regex: city, $options: "i" };
    if (area && area !== "any")
      query["location.area"] = { $regex: area, $options: "i" };

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Bedrooms filter
    if (bedrooms && bedrooms !== "any") {
      if (bedrooms === "4") {
        query.bedrooms = { $gte: 4 };
      } else {
        query.bedrooms = Number(bedrooms);
      }
    }

    // Furnishing filter
    if (furnishing && furnishing !== "any") {
      query.furnishing = furnishing;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first

    if (sortBy === "price-low") {
      sortOption = { price: 1 };
    } else if (sortBy === "price-high") {
      sortOption = { price: -1 };
    } else if (sortBy === "newest") {
      sortOption = { createdAt: -1 };
    }

    const properties = await Property.find(query)
      .populate("listedBy", "name email phone")
      .sort(sortOption)
      .limit(50);

    // Get filter counts for UI
    const filters = await getFilterCounts(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: {
        properties,
        filters,
      },
    });
  } catch (error) {
    console.error("Search properties error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search properties",
    });
  }
};

// Get filter counts for UI
const getFilterCounts = async (baseQuery) => {
  try {
    // Clone base query to avoid modifying it
    const query = { ...baseQuery };

    // Remove pagination/sorting from base query for counts
    delete query.limit;
    delete query.skip;
    delete query.sort;

    // Get all properties matching the base filters
    const allProperties = await Property.find(query);

    // Category counts
    const categories = await Property.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Location counts
    // Location counts - return array of objects with value and count
    const locations = await Property.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$location.area",
          count: { $sum: 1 },
        },
      },
      { $match: { _id: { $ne: null, $ne: "" } } }, // Filter out null/empty values
      { $sort: { count: -1 } },
    ]);
    // Price range
    const priceStats = await Property.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    return {
      categories: categories.map((cat) => ({
        value: cat._id,
        label: cat._id
          ? cat._id.charAt(0).toUpperCase() + cat._id.slice(1)
          : "Other",
        count: cat.count,
      })),
      locations: locations.map((loc) => ({
        value: loc._id,
        label: loc._id,
        count: loc.count,
      })),
      minPrice: priceStats[0]?.minPrice || 0,
      maxPrice: priceStats[0]?.maxPrice || 500000,
      totalCount: allProperties.length,
    };
  } catch (error) {
    console.error("Get filter counts error:", error);
    return {
      categories: [],
      locations: [],
      minPrice: 0,
      maxPrice: 500000,
      totalCount: 0,
    };
  }
};

// Get all properties with pagination
export const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      purpose,
      category,
      minPrice,
      maxPrice,
      bedrooms,
      furnishing,
      area,
      sortBy,
    } = req.query;

    const query = { status: "active" };

    // Apply all filters
    if (purpose) query.purpose = purpose;
    if (category && category !== "all") query.category = category;
    if (area && area !== "any")
      query["location.area"] = { $regex: area, $options: "i" };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bedrooms && bedrooms !== "any") {
      if (bedrooms === "4") {
        query.bedrooms = { $gte: 4 };
      } else {
        query.bedrooms = Number(bedrooms);
      }
    }

    if (furnishing && furnishing !== "any") {
      query.furnishing = furnishing;
    }

    // Sorting
    let sortOption = { createdAt: -1 };

    if (sortBy === "price-low") {
      sortOption = { price: 1 };
    } else if (sortBy === "price-high") {
      sortOption = { price: -1 };
    }

    const skip = (page - 1) * limit;

    const properties = await Property.find(query)
      .populate("listedBy", "name email phone")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      data: {
        properties,
      },
    });
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

// Get single property
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "listedBy",
      "name email phone"
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
    console.error("Get property error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
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

    // Check if user owns the property
    if (property.listedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }

    // Update basic fields - ONLY FIELDS THAT EXIST IN SCHEMA
    const updatableFields = [
      "title",
      "description",
      "price",
      "purpose",
      "category",
      "bedrooms",
      "bathrooms",
      "area",
      "yearBuilt",
      "furnishing",
      "isUrgent",
      "isVerified",
      "status",
      "areaUnit",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    // Update location
    if (req.body.location) {
      try {
        property.location = JSON.parse(req.body.location);
      } catch (e) {
        console.log("Failed to parse location:", e);
      }
    }

    // Update contact info
    if (req.body.contactInfo) {
      try {
        property.contactInfo = JSON.parse(req.body.contactInfo);
      } catch (e) {
        console.log("Failed to parse contact info:", e);
      }
    }

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      property.images = [...property.images, ...newImages];
    }

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: {
        property,
      },
    });
  } catch (error) {
    console.error("Update property error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
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

    // Check if user owns the property
    if (property.listedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};

// Get user properties
export const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ listedBy: req.user.id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      success: true,
      count: properties.length,
      data: {
        properties,
      },
    });
  } catch (error) {
    console.error("Get user properties error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user properties",
    });
  }
};

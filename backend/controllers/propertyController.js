import Property from "../models/property.js";

export const createProperty = async (req, res) => {
  try {
    console.log("📝 Request body keys:", Object.keys(req.body));
    console.log("📁 Files received:", req.files?.length || 0);

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

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

    const locationData = parseFormDataField(req.body.location) || {};
    const contactInfoData = parseFormDataField(req.body.contactInfo) || {};

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

    const images = req.files.map((file) => file.path);
    console.log("☁️ Cloudinary URLs:", images);

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
      status: req.user.role === "admin" ? (req.body.status || "active") : "pending",
      images,
    };

    if (locationData && Object.keys(locationData).length > 0) {
      propertyData.location = {
        address: locationData.address || "",
        city: locationData.city || "Abu Dhabi",
        area: locationData.area || "",
      };
    }

    if (contactInfoData && Object.keys(contactInfoData).length > 0) {
      propertyData.contactInfo = {
        name: contactInfoData.name || "",
        phone: contactInfoData.phone || "",
        email: contactInfoData.email || "",
        showPhone: contactInfoData.showPhone !== false,
      };
    }

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
    if (req.body.isVerified === "true" || req.body.isVerified === true) {
      propertyData.isVerified = true;
    }
    if (req.body.isFeatured === "true" || req.body.isFeatured === true) {
      propertyData.isFeatured = true;
    }

    console.log(
      "💾 Creating property with data:",
      JSON.stringify(propertyData, null, 2)
    );

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
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message || "Unknown error",
    });
  }
};

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

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { "location.address": { $regex: q, $options: "i" } },
      ];
    }

    if (purpose) query.purpose = purpose;
    if (category && category !== "all") query.category = category;

    if (city) query["location.city"] = { $regex: city, $options: "i" };
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

    let sortOption = { createdAt: -1 };

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

    const filters = await getFilterCounts(query);

   return res.status(200).json({
      success: true,
      count: properties.length,
      data: {
        properties,
        filters,
      },
    });
  } catch (error) {
    console.error("Search properties error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search properties",
    });
  }
};

// Get filter counts for UI
const getFilterCounts = async (baseQuery) => {
  try {
    const query = { ...baseQuery };

    delete query.limit;
    delete query.skip;
    delete query.sort;

    const allProperties = await Property.find(query);

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

    const locations = await Property.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$location.area",
          count: { $sum: 1 },
        },
      },
      { $match: { _id: { $ne: null, $ne: "" } } },
      { $sort: { count: -1 } },
    ]);
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
      listedBy,
    } = req.query;

    const query = { status: "active" };

    if (listedBy) query.listedBy = listedBy;
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

    return res.status(200).json({
      success: true,
      count: properties.length,
      total,
      data: {
        properties,
      },
    });
  } catch (error) {
    console.error("Get properties error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

// Get single property
export const getProperty = async (req, res) => {
  try {
    const {id} = req.params;
    const property = await Property.findById(id).populate(
      "listedBy",
      "name email phone"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

   return res.status(200).json({
      success: true,
      data: {
        property,
      },
    });
  } catch (error) {
    console.error("Get property error:", error);
   return res.status(500).json({
      success: false,
      message: "Failed to fetch property",
    });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const {id} =req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.listedBy.toString() !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }

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
      "isFeatured",
      "status",
      "areaUnit",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    if (req.body.location) {
      try {
        property.location = JSON.parse(req.body.location);
      } catch (e) {
        console.log("Failed to parse location:", e);
      }
    }

    if (req.body.contactInfo) {
      try {
        property.contactInfo = JSON.parse(req.body.contactInfo);
      } catch (e) {
        console.log("Failed to parse contact info:", e);
      }
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      property.images = [...property.images, ...newImages];
    }

    await property.save();

   return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: {
        property,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update property",
    });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const {id}= req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.listedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }

    await property.deleteOne();

   return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);
   return res.status(500).json({
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

   return res.status(200).json({
      success: true,
      count: properties.length,
      data: {
        properties,
      },
    });
  } catch (error) {
    console.error("Get user properties error:", error);
   return res.status(500).json({
      success: false,
      message: "Failed to fetch user properties",
    });
  }
};

// Update property status
export const updatePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "active",
      "sold",
      "rented",
      "inactive",
      "pending",
      "draft",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const user = req.user;
    const isOwner = property.listedBy.toString() === user.id;
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property status",
      });
    }

    property.status = status;

    if (!property.statusHistory) {
      property.statusHistory = [];
    }

    property.statusHistory.push({
      status: status,
      changedBy: user.id,
      changedAt: new Date(),
      reason: req.body.reason || "Status updated",
    });

    await property.save();

  return  res.status(200).json({
      success: true,
      message: `Property status updated to ${status}`,
      data: {
        property,
      },
    });
  } catch (error) {
    console.error("Update property status error:", error);
   return res.status(500).json({
      success: false,
      message: "Failed to update property status",
    });
  }
};

// Get all properties for admin (with all statuses)
// export const getAdminProperties = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       status,
//       purpose,
//       category,
//       search,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//     } = req.query;

//     console.log("DEBUG: getAdminProperties started with query:", req.query);
//     const query = {};

//     if (status && status !== "all") {
//       query.status = status;
//     }

//     if (purpose && purpose !== "all") {
//       query.purpose = purpose;
//     }

//     if (category && category !== "all") {
//       query.category = category;
//     }
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//         { "location.address": { $regex: search, $options: "i" } },
//         { "location.area": { $regex: search, $options: "i" } },
//       ];
//     }

//     const skip = (page - 1) * limit;

//     console.log("DEBUG: Finding properties with query:", JSON.stringify(query));
//     const properties = await Property.find(query)
//       .populate({
//         path: "listedBy",
//         select: "name email phone",
//       })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

//     console.log(`DEBUG: Found ${properties.length} properties`);

//     const total = await Property.countDocuments(query);

//     const totalProperties = await Property.countDocuments();
//     const activeProperties = await Property.countDocuments({
//       status: "active",
//     });
//     const soldProperties = await Property.countDocuments({ status: "sold" });
//     const rentedProperties = await Property.countDocuments({
//       status: "rented",
//     });
//     const inactiveProperties = await Property.countDocuments({
//       status: "inactive",
//     });

//     return res.status(200).json({
//       success: true,
//       data: {
//         properties,
//         pagination: {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           total,
//           pages: Math.ceil(total / limit),
//         },
//         stats: {
//           totalProperties,
//           activeProperties,
//           soldProperties,
//           rentedProperties,
//           inactiveProperties,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("DEBUG FATAL: getAdminProperties error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching properties",
//       details: error.message,
//       stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//     });
//   }
// };
// Get all properties for admin (with all statuses)
export const getAdminProperties = async (req, res) => {
  try {
    console.log("🟢 DEBUG: getAdminProperties started");
    
    const {
      page = 1,
      limit = 10,
      status,
      purpose,
      category,
      search,
      sortBy = "-createdAt",
    } = req.query;

    console.log("📊 Query Parameters:", {
      page, limit, status, purpose, category, search, sortBy
    });

    // Build query
    const query = {};

    // Status filter
    if (status && status !== "all") {
      query.status = status;
    }

    // Purpose filter (sale/rent)
    if (purpose && purpose !== "all") {
      query.purpose = purpose;
    }

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "location.address": { $regex: search, $options: "i" } },
        { "location.area": { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
      ];
    }

    console.log("🔍 Final Query:", JSON.stringify(query, null, 2));

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch properties with pagination
    const properties = await Property.find(query)
      .populate({
        path: "listedBy",
        select: "name email phone profileImage",
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortBy);

    console.log(`✅ Found ${properties.length} properties`);

    // Get total count
    const total = await Property.countDocuments(query);

    // Get statistics
    const totalProperties = await Property.countDocuments();
    const activeProperties = await Property.countDocuments({ status: "active" });
    const soldProperties = await Property.countDocuments({ status: "sold" });
    const rentedProperties = await Property.countDocuments({ status: "rented" });
    const inactiveProperties = await Property.countDocuments({ 
      status: "inactive" 
    });

    return res.status(200).json({
      success: true,
      message: "Admin properties fetched successfully",
      data: {
        properties,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
        stats: {
          totalProperties,
          activeProperties,
          soldProperties,
          rentedProperties,
          inactiveProperties,
        },
      },
    });

  } catch (error) {
    console.error("❌ ERROR in getAdminProperties:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({
      success: false,
      message: "Error fetching admin properties",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Approve property
export const approveProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = "active";
    property.isVerified = true;

    if (!property.statusHistory) {
      property.statusHistory = [];
    }

    property.statusHistory.push({
      status: "active",
      changedBy: req.user.id,
      changedAt: new Date(),
      reason: "Approved by admin",
    });

    await property.save();

   return res.status(200).json({
      success: true,
      message: "Property approved successfully",
      data: { property },
    });
  } catch (error) {
    console.error("Approve property error:", error);
   return res.status(500).json({
      success: false,
      message: "Failed to approve property",
    });
  }
};

// Reject property
export const rejectProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = "rejected";

    if (!property.statusHistory) {
      property.statusHistory = [];
    }

    property.statusHistory.push({
      status: "rejected",
      changedBy: req.user.id,
      changedAt: new Date(),
      reason: reason || "Rejected by admin",
    });

    await property.save();

   return res.status(200).json({
      success: true,
      message: "Property rejected successfully",
      data: { property },
    });
  } catch (error) {
    console.error("Reject property error:", error);
   return res.status(500).json({
      success: false,
      message: "Failed to reject property",
    });
  }
};

// Get pending properties for admin
export const getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "pending" })
      .populate("listedBy", "name email phone")
      .sort("-createdAt");

   return res.status(200).json({
      success: true,
      count: properties.length,
      data: { properties },
    });
  } catch (error) {
    console.error("Get pending properties error:", error);
   return res.status(500).json({
      success: false,
      message: "Failed to fetch pending properties",
    });
  }
};

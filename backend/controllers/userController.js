import User from "../models/authModel.js";
import Profile from "../models/profile.js";
import Property from "../models/property.js";
import cloudinary from "../config/cloudinary.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name email phone avatar role"
    );

    return res.status(200).json({
      status: "success",
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      dateOfBirth,
      gender,
      nationality,
      company,
      bio,
      website,
      socialMedia,
      address,
    } = req.body;

    // Update user basic info
    if (name || phone) {
      await User.findByIdAndUpdate(req.user.id, {
        ...(name && { name }),
        ...(phone && { phone }),
      });
    }

    // Handle avatar upload
    let avatarData = {};
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "user-avatars",
            transformation: [
              { width: 200, height: 200, crop: "fill" },
              { quality: "auto" },
              { format: "jpg" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      avatarData = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      // Update user avatar
      await User.findByIdAndUpdate(req.user.id, { avatar: avatarData });
    }

    // Update profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        dateOfBirth,
        gender,
        nationality,
        company,
        bio,
        website,
        socialMedia: socialMedia ? JSON.parse(socialMedia) : undefined,
        address: address ? JSON.parse(address) : undefined,
        ...(Object.keys(avatarData).length > 0 && { avatar: avatarData }),
      },
      { new: true, runValidators: true }
    ).populate("user", "name email phone avatar role");

    res.status(200).json({
      status: "success",
      data: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (req, res, next) => {
  try {
    const propertiesCount = await Property.countDocuments({
      listedBy: req.user.id,
    });
    const favoritesCount =
      await require("../models/favorite.js").default.countDocuments({
        user: req.user.id,
      });

    const profile = await Profile.findOne({ user: req.user.id });

    return res.status(200).json({
      status: "success",
      data: {
        stats: {
          propertiesListed: propertiesCount,
          favoritesCount,
          rating: profile?.rating || 0,
          totalReviews: profile?.totalReviews || 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const becomeAgent = async (req, res, next) => {
  try {
    const { company, licenseNumber, experience, specialization } = req.body;

    // Update user role to agent
    await User.findByIdAndUpdate(req.user.id, { role: "agent" });

    // Update profile with agent information
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        company,
        licenseNumber,
        experience,
        specialization: specialization ? JSON.parse(specialization) : [],
      },
      { new: true }
    ).populate("user", "name email phone avatar role");

    return res.status(200).json({
      status: "success",
      message: "Congratulations! You are now registered as an agent.",
      data: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAgentListings = async (req, res, next) => {
  try {
    const properties = await Property.find({ listedBy: req.user.id }).sort(
      "-createdAt"
    );

    return res.status(200).json({
      status: "success",
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (error) {
    next(error);
  }
};

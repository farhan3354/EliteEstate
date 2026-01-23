import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const propertyStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "estateelite/properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "jfif"],
  },
});

const locationStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "estateelite/locations",
    allowed_formats: ["jpg", "jpeg", "png", "webp","jfif"],
  },
});

export const upload = multer({ storage: propertyStorage });
export const uploadLocation = multer({ storage: locationStorage });

export default cloudinary;

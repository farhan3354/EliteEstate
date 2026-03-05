import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/categoryModel.js";

dotenv.config();

const categories = [
  { name: "Apartments", value: "apartments", icon: "FiHome", description: "Modern living spaces in the heart of the city." },
  { name: "Villas", value: "villas", icon: "FiHome", description: "Spacious private homes with luxury amenities." },
  { name: "Townhouses", value: "townhouses", icon: "FiHome", description: "Elegant terraced houses for families." },
  { name: "Commercial", value: "commercial", icon: "FiTrendingUp", description: "Offices and retail spaces for businesses." },
  { name: "Land", value: "land", icon: "FiMapPin", description: "Plots ready for development." },
  { name: "Rooms", value: "rooms", icon: "FiHome", description: "Individual rooms for rent." },
  { name: "Warehouses", value: "warehouses", icon: "FiHome", description: "Industrial storage facilities." },
  { name: "Buildings", value: "buildings", icon: "FiHome", description: "Entire residential or commercial buildings." },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log("Categories seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();

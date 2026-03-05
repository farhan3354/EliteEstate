import Category from "../models/categoryModel.js";
import Property from "../models/property.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    // Get counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Property.countDocuments({ category: cat.value, status: "active" });
        return {
          ...cat.toObject(),
          count
        };
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithCounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, value, icon, description } = req.body;
    
    let imageUrl = req.body.image;
    if (req.file) {
      imageUrl = req.file.path;
    }

    const category = await Category.create({
      name,
      value: value || name.toLowerCase().replace(/\s+/g, "-"),
      icon,
      description,
      image: imageUrl
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

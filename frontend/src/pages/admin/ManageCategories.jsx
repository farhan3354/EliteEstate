import React, { useState, useEffect } from "react";
import { propertyAPI } from "../../services/api";
import { FiPlus, FiTrash2, FiFolder, FiUpload } from "react-icons/fi";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    name: "",
    value: "",
    icon: "FiHome",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.name) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("value", newCategory.value);
      formData.append("icon", newCategory.icon);
      formData.append("description", newCategory.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await propertyAPI.createCategory(formData);
      if (response.data.success) {
        setCategories((prev) => [...prev, response.data.data]);
        setNewCategory({ name: "", value: "", icon: "FiHome", description: "" });
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert(error.response?.data?.message || "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await propertyAPI.deleteCategory(id);
      if (response.data.success) {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
          <p className="text-gray-600">Add or remove property categories for the website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FiPlus className="mr-2 text-blue-500" />
              New Category
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Luxury Villas"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Value (URL slug)</label>
                <input
                  type="text"
                  name="value"
                  value={newCategory.value}
                  onChange={handleInputChange}
                  placeholder="e.g. luxury-villas"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  placeholder="Short description..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors cursor-pointer relative">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-48 object-cover rounded-lg" />
                        <button 
                          type="button"
                          onClick={() => { setImageFile(null); setImagePreview(null); }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            Upload a file
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                    <input type="file" className="sr-only absolute inset-0 w-full h-full cursor-pointer" onChange={handleFileChange} accept="image/*" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Create Category"}
              </button>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase text-xs">Category</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase text-xs">Slug</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase text-xs">Properties</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 overflow-hidden border border-gray-100">
                            {category.image ? (
                              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                            ) : (
                              <FiFolder />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900">{category.name}</span>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{category.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{category.value}</td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-bold">
                          {category.count || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Category"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                      No categories found. Add your first one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;

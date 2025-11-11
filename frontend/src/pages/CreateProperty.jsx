import React, { useState } from "react";
import { propertyAPI } from "../services/api";

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "sale",
    category: "apartments",
    bedrooms: "",
    bathrooms: "",
    area: "",
    yearBuilt: "",
    furnishing: "unfurnished",
    location: {
      address: "",
      area: "",
      community: "",
    },
    features: [],
    amenities: {
      building: [],
      apartment: [],
      community: [],
    },
    showPhone: true,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const submitData = new FormData();

      // Append form data
      Object.keys(formData).forEach((key) => {
        if (key === "amenities" || key === "location") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await propertyAPI.create(submitData);

      if (response.data.success) {
        setMessage("Property created successfully!");
        setTimeout(() => {
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating property");
    } finally {
      setLoading(false);
    }
  };

  // if (!user) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold mb-4">
  //           Please login to create a property
  //         </h2>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">List Your Property</h1>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${
            message.includes("success")
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (AED) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="apartments">Apartments</option>
              <option value="villas">Villas</option>
              <option value="townhouses">Townhouses</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms *
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms *
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area (sq ft) *
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Built
            </label>
            <input
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location Information */}
          <div className="col-span-2 mt-6">
            <h3 className="text-xl font-semibold mb-4">Location Information</h3>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area *
            </label>
            <input
              type="text"
              name="location.area"
              value={formData.location.area}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community
            </label>
            <input
              type="text"
              name="location.community"
              value={formData.location.community}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Images */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images *
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Select multiple images for your property
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Creating Property..." : "List Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProperty;

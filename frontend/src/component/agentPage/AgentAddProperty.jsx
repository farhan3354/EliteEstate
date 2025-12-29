import React, { useState } from "react";

const AgentAddProperty = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    listingType: "sale",
    ownerName: "",
    ownerContact: "",
    commission: "5",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Simulate file upload
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property data:", formData);
    console.log("Images:", images);
    alert("Property submitted for admin approval!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Property (Agent)</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Owner Info */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-blue-800 mb-2">
              Property Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Contact *
                </label>
                <input
                  type="tel"
                  name="ownerContact"
                  value={formData.ownerContact}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing Type *
              </label>
              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Modern 3-Bedroom Apartment in Downtown"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Describe the property features, amenities, location advantages..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms *
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms *
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Images *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">Click to upload property images</p>
                <p className="text-gray-400 text-sm">
                  Upload at least 3 images (max 10)
                </p>
              </label>
            </div>

            {/* Preview Images */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commission */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-yellow-800 mb-1">
              Your Commission (%) *
            </label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              min="1"
              max="20"
              step="0.5"
              className="w-full px-3 py-2 border border-yellow-300 rounded-md bg-white"
              required
            />
            <p className="text-sm text-yellow-600 mt-1">
              This commission will be paid upon successful sale/rental
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              Submit Property for Approval
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              Property will be reviewed by admin before going live
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentAddProperty;

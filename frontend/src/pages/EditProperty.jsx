import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiMapPin,
  FiGrid,
  FiMaximize,
  FiCamera,
  FiCheck,
  FiArrowLeft,
  FiSave,
  FiEye,
  FiTrash2,
  FiUpload,
  FiInfo,
  FiCalendar,
} from "react-icons/fi";
import {
  MdApartment,
  MdBathtub,
  MdBed,
  MdOutlineBalcony,
} from "react-icons/md";

const EditProperty = () => {
  const [property, setProperty] = useState({
    title: "Modern 3-Bedroom Apartment in Downtown",
    type: "apartment",
    price: "2500000",
    address: "123 Luxury Street, Downtown",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800",
    areaUnit: "sqft",
    description:
      "A stunning modern apartment in the heart of downtown with panoramic city views. Features include hardwood floors, stainless steel appliances, walk-in closets, and a private balcony.",
    status: "active",
    listingType: "sale",
    yearBuilt: "2020",
    parkingSpots: 2,
    furnished: true,
    petFriendly: false,
    amenities: ["gym", "pool", "security", "parking", "elevator"],
  });

  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800",
  ]);

  const [newImage, setNewImage] = useState("");

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: <MdApartment /> },
    { value: "house", label: "House", icon: <FiHome /> },
    { value: "villa", label: "Villa", icon: <FiHome /> },
    { value: "condo", label: "Condo", icon: <MdApartment /> },
    { value: "townhouse", label: "Townhouse", icon: <FiHome /> },
  ];

  const amenitiesList = [
    { id: "gym", label: "Gym", icon: "🏋️" },
    { id: "pool", label: "Swimming Pool", icon: "🏊" },
    { id: "security", label: "24/7 Security", icon: "👮" },
    { id: "parking", label: "Parking", icon: "🅿️" },
    { id: "elevator", label: "Elevator", icon: "⬆️" },
    { id: "garden", label: "Garden", icon: "🌳" },
    { id: "balcony", label: "Balcony", icon: <MdOutlineBalcony /> },
    { id: "ac", label: "Air Conditioning", icon: "❄️" },
    { id: "heating", label: "Heating", icon: "🔥" },
    { id: "laundry", label: "Laundry", icon: "👕" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityToggle = (amenityId) => {
    setProperty((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleImageUpload = () => {
    if (newImage) {
      setImages([...images, newImage]);
      setNewImage("");
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated property:", property);
    alert("Property updated successfully!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link
              to="/owner-dashboard/my-properties"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <FiArrowLeft className="h-5 w-5" />
              Back to Properties
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/property/1`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiEye className="h-4 w-4" />
              View Property
            </Link>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiSave className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <FiInfo className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Make changes to your property listing. All updates will be
              reviewed by our team before going live.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiHome className="h-5 w-5 text-blue-600" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={property.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter property title"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setProperty({ ...property, type: type.value })
                      }
                      className={`flex items-center justify-center gap-2 p-3 border rounded-lg ${
                        property.type === type.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setProperty({ ...property, listingType: "sale" })
                    }
                    className={`flex items-center justify-center gap-2 p-3 border rounded-lg ${
                      property.listingType === "sale"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <FiDollarSign className="h-5 w-5" />
                    For Sale
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setProperty({ ...property, listingType: "rent" })
                    }
                    className={`flex items-center justify-center gap-2 p-3 border rounded-lg ${
                      property.listingType === "rent"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <FiCalendar className="h-5 w-5" />
                    For Rent
                  </button>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={property.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiMapPin className="h-5 w-5 text-blue-600" />
              Location Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={property.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={property.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={property.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={property.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiGrid className="h-5 w-5 text-blue-600" />
              Property Description
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your property in detail..."
              />
              <p className="text-sm text-gray-500 mt-2">
                {property.description.length}/2000 characters
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Images */}
        <div>
          {/* Property Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiMaximize className="h-5 w-5 text-blue-600" />
              Property Features
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setProperty({
                        ...property,
                        bedrooms: Math.max(1, property.bedrooms - 1),
                      })
                    }
                    className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2">
                    <MdBed className="h-5 w-5 text-gray-600" />
                    <span className="font-bold">{property.bedrooms}</span>
                  </div>
                  <button
                    onClick={() =>
                      setProperty({
                        ...property,
                        bedrooms: property.bedrooms + 1,
                      })
                    }
                    className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setProperty({
                        ...property,
                        bathrooms: Math.max(1, property.bathrooms - 1),
                      })
                    }
                    className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2">
                    <MdBathtub className="h-5 w-5 text-gray-600" />
                    <span className="font-bold">{property.bathrooms}</span>
                  </div>
                  <button
                    onClick={() =>
                      setProperty({
                        ...property,
                        bathrooms: property.bathrooms + 1,
                      })
                    }
                    className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sqft)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="area"
                    value={property.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={property.yearBuilt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Toggle Features */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="furnished"
                  checked={property.furnished}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Furnished</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="petFriendly"
                  checked={property.petFriendly}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Pet Friendly</span>
              </label>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiCheck className="h-5 w-5 text-blue-600" />
              Amenities
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => handleAmenityToggle(amenity.id)}
                  className={`flex items-center gap-2 p-3 border rounded-lg ${
                    property.amenities.includes(amenity.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{amenity.icon}</span>
                  <span className="text-sm">{amenity.label}</span>
                  {property.amenities.includes(amenity.id) && (
                    <FiCheck className="h-4 w-4 text-blue-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiCamera className="h-5 w-5 text-blue-600" />
              Property Images
            </h2>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleImageUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiUpload className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Add up to 10 images. First image will be the cover photo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <button
                      onClick={() => removeImage(index)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                        Cover
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;

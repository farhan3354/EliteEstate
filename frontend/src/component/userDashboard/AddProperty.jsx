import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiUpload,
  FiSave,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import api from "../../utils/routeapi";

const AddProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      purpose: "sale",
      category: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      areaUnit: "sqft",
      yearBuilt: "",
      furnishing: "",
      location: {
        address: "",
        city: "Abu Dhabi",
        area: "",
      },
      contactInfo: {
        name: "",
        phone: "",
        email: "",
        showPhone: true,
      },
      status: "active",
      isVerified: false,
      isUrgent: false,
    },
  });

  // Watch form values
  const purpose = watch("purpose");

  // Property options
  const propertyPurposes = [
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" },
    { value: "lease", label: "For Lease" },
  ];

  const categories = [
    { value: "apartments", label: "Apartments" },
    { value: "villas", label: "Villas" },
    { value: "townhouses", label: "Townhouses" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
    { value: "rooms", label: "Rooms" },
    { value: "warehouses", label: "Warehouses" },
    { value: "buildings", label: "Buildings" },
  ];

  const furnishingOptions = [
    { value: "furnished", label: "Furnished" },
    { value: "unfurnished", label: "Unfurnished" },
    { value: "semi-furnished", label: "Semi-Furnished" },
  ];

  const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const bathroomOptions = [1, 2, 3, 4, 5, 6];

  // Image upload handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
      isPrimary: uploadedImages.length === 0,
    }));

    // Limit to 5 images
    const totalImages = [...uploadedImages, ...newImages].slice(0, 5);
    setUploadedImages(totalImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    if (index === 0 && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }
    setUploadedImages(updatedImages);
  };

  const handleSetPrimaryImage = (index) => {
    const updatedImages = uploadedImages.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setUploadedImages(updatedImages);
  };

  // Step navigation
  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Details" },
    { number: 3, title: "Location" },
    { number: 4, title: "Media" },
    { number: 5, title: "Contact" },
  ];

  const validateStep = async (step) => {
    let fields = [];

    switch (step) {
      case 1:
        fields = ["title", "description", "price", "purpose", "category"];
        break;
      case 2:
        fields = ["bedrooms", "bathrooms", "area"];
        break;
      case 3:
        fields = ["location.address", "location.area"];
        break;
      case 5:
        fields = ["contactInfo.name", "contactInfo.phone", "contactInfo.email"];
        break;
      default:
        fields = [];
    }

    if (fields.length > 0) {
      const isValid = await trigger(fields);
      if (isValid) {
        setCurrentStep(step);
      }
    } else {
      setCurrentStep(step);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("📤 Form data before processing:", data);

      // Prepare final data
      const formData = new FormData();

      // Add all form fields individually - ONLY FIELDS THAT EXIST IN SCHEMA
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("purpose", data.purpose);
      formData.append("category", data.category);
      formData.append("bedrooms", data.bedrooms);
      formData.append("bathrooms", data.bathrooms);
      formData.append("area", data.area);
      formData.append("areaUnit", data.areaUnit || "sqft");

      // Add optional fields
      if (data.yearBuilt) formData.append("yearBuilt", data.yearBuilt);
      if (data.furnishing) formData.append("furnishing", data.furnishing);

      // Add boolean fields as strings
      formData.append("isUrgent", data.isUrgent ? "true" : "false");
      formData.append("isVerified", data.isVerified ? "true" : "false");

      // Add nested objects as JSON strings
      formData.append("location", JSON.stringify(data.location || {}));
      formData.append("contactInfo", JSON.stringify(data.contactInfo || {}));

      // Add status
      formData.append("status", data.status || "active");

      // Add images
      if (uploadedImages.length === 0) {
        alert("Please upload at least one image");
        setIsSubmitting(false);
        return;
      }

      uploadedImages.forEach((img, index) => {
        console.log(`📸 Adding image ${index}:`, img.file.name);
        formData.append("images", img.file);
      });

      // Log all form data entries for debugging
      console.log("📦 FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(
          `${key}:`,
          typeof value === "object" ? value.name || value : value
        );
      }

      // Submit to API
      const response = await api.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Property created:", response.data);
      alert("Property created successfully!");

      // Navigate after success
      navigate("/properties");
    } catch (error) {
      console.error("❌ Error submitting property:", error);
      console.error("Error details:", error.response?.data);

      // Show error message to user
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to create property. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Property
          </h1>
          <p className="text-gray-600">
            List your property to reach potential buyers and tenants
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.number
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`ml-3 font-medium ${
                      currentStep >= step.number
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > step.number ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => validateStep(currentStep - 1)}
                disabled={currentStep === 1}
                className={`p-2 rounded-lg ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">
                  Step {currentStep} of {steps.length}
                </div>
                <div className="text-xs text-gray-600">
                  {steps[currentStep - 1].title}
                </div>
              </div>
              <button
                onClick={() => validateStep(currentStep + 1)}
                disabled={currentStep === steps.length}
                className={`p-2 rounded-lg ${
                  currentStep === steps.length
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Basic Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 200,
                      message: "Title cannot exceed 200 characters",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Luxury 3-Bedroom Apartment with Sea View"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Describe your property in detail..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Purpose */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Purpose *
                  </label>
                  <select
                    {...register("purpose", {
                      required: "Purpose is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {propertyPurposes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (AED) *
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 1, message: "Price must be positive" },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Property Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <select
                    {...register("bedrooms", {
                      required: "Bedrooms is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    {bedroomOptions.map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Bedroom" : "Bedrooms"}
                      </option>
                    ))}
                  </select>
                  {errors.bedrooms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bedrooms.message}
                    </p>
                  )}
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <select
                    {...register("bathrooms", {
                      required: "Bathrooms is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    {bathroomOptions.map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                      </option>
                    ))}
                  </select>
                  {errors.bathrooms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bathrooms.message}
                    </p>
                  )}
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      {...register("area", {
                        required: "Area is required",
                        min: { value: 1, message: "Area must be positive" },
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter area"
                    />
                    <select
                      {...register("areaUnit")}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="sqft">sq ft</option>
                      <option value="sqm">sq m</option>
                    </select>
                  </div>
                  {errors.area && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* Year Built */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Built
                  </label>
                  <input
                    type="number"
                    {...register("yearBuilt")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnishing
                  </label>
                  <select
                    {...register("furnishing")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Furnishing</option>
                    {furnishingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Location Details
              </h2>

              <div className="space-y-4">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("location.address", {
                        required: "Address is required",
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full address"
                    />
                  </div>
                  {errors.location?.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("location.city")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City"
                      defaultValue="Abu Dhabi"
                    />
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area *
                    </label>
                    <input
                      type="text"
                      {...register("location.area", {
                        required: "Area is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Downtown, Marina"
                    />
                    {errors.location?.area && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.location.area.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Media */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Property Photos
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload Property Photos
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload high-quality photos of your property. You can upload up
                  to 5 images.
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="property-images"
                />
                <label
                  htmlFor="property-images"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <FiUpload className="w-5 h-5" />
                  <span>Choose Files</span>
                </label>
              </div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mt-4 mb-2">
                    Uploaded images ({uploadedImages.length}/5)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(index)}
                            className={`px-3 py-1 rounded text-sm ${
                              img.isPrimary
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-800 hover:bg-gray-100"
                            }`}
                          >
                            {img.isPrimary ? "Primary" : "Set Primary"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        {img.isPrimary && (
                          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Contact Information */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    {...register("contactInfo.name", {
                      required: "Name is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                  {errors.contactInfo?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactInfo.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    {...register("contactInfo.email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                  {errors.contactInfo?.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    {...register("contactInfo.phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[+]?[1-9][0-9]{7,14}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+971 50 123 4567"
                  />
                  {errors.contactInfo?.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactInfo.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("contactInfo.showPhone")}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Show phone number publicly
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("isUrgent")}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Mark as Urgent
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("isVerified")}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Mark as Verified
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => validateStep(currentStep - 1)}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium ${
                currentStep === 1 || isSubmitting
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => validateStep(currentStep + 1)}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <span>Next Step</span>
                <FiChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <FiSave className="w-5 h-5" />
                <span>
                  {isSubmitting ? "Publishing..." : "Publish Property"}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FiHome,
// //   FiMapPin,
// //   FiDollarSign,
// //   FiUpload,
// //   FiSave,
// //   FiPlus,
// //   FiX,
// // } from "react-icons/fi";

// // const AddProperty = () => {
// //   const navigate = useNavigate();
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     propertyType: "",
// //     price: "",
// //     location: "",
// //     bedrooms: "",
// //     bathrooms: "",
// //     area: "",
// //     yearBuilt: "",
// //     features: [],
// //     amenities: [],
// //     images: [],
// //     contactName: "",
// //     contactEmail: "",
// //     contactPhone: "",
// //   });

// //   const [newFeature, setNewFeature] = useState("");
// //   const [newAmenity, setNewAmenity] = useState("");

// //   const propertyTypes = [
// //     "Apartment",
// //     "Villa",
// //     "Townhouse",
// //     "Penthouse",
// //     "Commercial",
// //     "Land",
// //     "Duplex",
// //     "Studio",
// //   ];

// //   const amenitiesList = [
// //     "Swimming Pool",
// //     "Gym",
// //     "Parking",
// //     "Security",
// //     "Garden",
// //     "Balcony",
// //     "Furnished",
// //     "Pet Friendly",
// //     "Air Conditioning",
// //     "Heating",
// //     "Elevator",
// //     "Concierge",
// //   ];

// //   const handleInputChange = (field, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };

// //   const handleAddFeature = () => {
// //     if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         features: [...prev.features, newFeature.trim()],
// //       }));
// //       setNewFeature("");
// //     }
// //   };

// //   const handleRemoveFeature = (feature) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       features: prev.features.filter((f) => f !== feature),
// //     }));
// //   };

// //   const handleToggleAmenity = (amenity) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       amenities: prev.amenities.includes(amenity)
// //         ? prev.amenities.filter((a) => a !== amenity)
// //         : [...prev.amenities, amenity],
// //     }));
// //   };

// //   const handleImageUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     console.log("Uploading images:", files);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Property data:", formData);
// //     navigate("/my-properties");
// //   };

// //   const steps = [
// //     { number: 1, title: "Basic Information" },
// //     { number: 2, title: "Property Details" },
// //     { number: 3, title: "Features & Amenities" },
// //     { number: 4, title: "Photos" },
// //     { number: 5, title: "Contact Info" },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="container mx-auto px-4 max-w-4xl">
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-2">
// //             Add New Property
// //           </h1>
// //           <p className="text-gray-600">
// //             List your property to reach potential buyers and tenants
// //           </p>
// //         </div>
// //         <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
// //           <div className="flex items-center justify-between">
// //             {steps.map((step, index) => (
// //               <React.Fragment key={step.number}>
// //                 <div className="flex items-center">
// //                   <div
// //                     className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
// //                       currentStep >= step.number
// //                         ? "bg-blue-600 border-blue-600 text-white"
// //                         : "border-gray-300 text-gray-500"
// //                     }`}
// //                   >
// //                     {step.number}
// //                   </div>
// //                   <span
// //                     className={`ml-3 font-medium ${
// //                       currentStep >= step.number
// //                         ? "text-blue-600"
// //                         : "text-gray-500"
// //                     }`}
// //                   >
// //                     {step.title}
// //                   </span>
// //                 </div>
// //                 {index < steps.length - 1 && (
// //                   <div
// //                     className={`flex-1 h-1 mx-4 ${
// //                       currentStep > step.number ? "bg-blue-600" : "bg-gray-300"
// //                     }`}
// //                   />
// //                 )}
// //               </React.Fragment>
// //             ))}
// //           </div>
// //         </div>
// //         <form
// //           onSubmit={handleSubmit}
// //           className="bg-white rounded-2xl p-6 shadow-lg"
// //         >
// //           {currentStep === 1 && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 Basic Information
// //               </h2>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Property Title *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.title}
// //                   onChange={(e) => handleInputChange("title", e.target.value)}
// //                   required
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="e.g., Luxury 3-Bedroom Apartment with Sea View"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Description *
// //                 </label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) =>
// //                     handleInputChange("description", e.target.value)
// //                   }
// //                   required
// //                   rows="4"
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
// //                   placeholder="Describe your property in detail..."
// //                 />
// //               </div>

// //               <div className="grid md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Property Type *
// //                   </label>
// //                   <select
// //                     value={formData.propertyType}
// //                     onChange={(e) =>
// //                       handleInputChange("propertyType", e.target.value)
// //                     }
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="">Select Type</option>
// //                     {propertyTypes.map((type) => (
// //                       <option key={type} value={type}>
// //                         {type}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Price (AED) *
// //                   </label>
// //                   <div className="relative">
// //                     <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                     <input
// //                       type="number"
// //                       value={formData.price}
// //                       onChange={(e) =>
// //                         handleInputChange("price", e.target.value)
// //                       }
// //                       required
// //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       placeholder="Enter price"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Location *
// //                 </label>
// //                 <div className="relative">
// //                   <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                   <input
// //                     type="text"
// //                     value={formData.location}
// //                     onChange={(e) =>
// //                       handleInputChange("location", e.target.value)
// //                     }
// //                     required
// //                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="Enter full address"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {currentStep === 2 && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 Property Details
// //               </h2>

// //               <div className="grid md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bedrooms *
// //                   </label>
// //                   <select
// //                     value={formData.bedrooms}
// //                     onChange={(e) =>
// //                       handleInputChange("bedrooms", e.target.value)
// //                     }
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="">Select</option>
// //                     {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
// //                       <option key={num} value={num}>
// //                         {num} {num === 1 ? "Bedroom" : "Bedrooms"}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bathrooms *
// //                   </label>
// //                   <select
// //                     value={formData.bathrooms}
// //                     onChange={(e) =>
// //                       handleInputChange("bathrooms", e.target.value)
// //                     }
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="">Select</option>
// //                     {[1, 2, 3, 4, 5, 6].map((num) => (
// //                       <option key={num} value={num}>
// //                         {num} {num === 1 ? "Bathroom" : "Bathrooms"}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Area (sq ft) *
// //                   </label>
// //                   <input
// //                     type="number"
// //                     value={formData.area}
// //                     onChange={(e) => handleInputChange("area", e.target.value)}
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="Enter area"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Year Built
// //                   </label>
// //                   <input
// //                     type="number"
// //                     value={formData.yearBuilt}
// //                     onChange={(e) =>
// //                       handleInputChange("yearBuilt", e.target.value)
// //                     }
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="e.g., 2020"
// //                     min="1900"
// //                     max="2024"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //           {currentStep === 3 && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 Features & Amenities
// //               </h2>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Property Features
// //                 </label>
// //                 <div className="flex space-x-2 mb-3">
// //                   <input
// //                     type="text"
// //                     value={newFeature}
// //                     onChange={(e) => setNewFeature(e.target.value)}
// //                     className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="Add a feature (e.g., Sea View, Smart Home)"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={handleAddFeature}
// //                     className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
// //                   >
// //                     <FiPlus className="w-5 h-5" />
// //                   </button>
// //                 </div>
// //                 <div className="flex flex-wrap gap-2">
// //                   {formData.features.map((feature, index) => (
// //                     <div
// //                       key={index}
// //                       className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
// //                     >
// //                       <span>{feature}</span>
// //                       <button
// //                         type="button"
// //                         onClick={() => handleRemoveFeature(feature)}
// //                         className="text-blue-600 hover:text-blue-800"
// //                       >
// //                         <FiX className="w-3 h-3" />
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   Amenities
// //                 </label>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// //                   {amenitiesList.map((amenity) => (
// //                     <label
// //                       key={amenity}
// //                       className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer"
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={formData.amenities.includes(amenity)}
// //                         onChange={() => handleToggleAmenity(amenity)}
// //                         className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
// //                       />
// //                       <span className="text-gray-700">{amenity}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //           {currentStep === 4 && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 Property Photos
// //               </h2>

// //               <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
// //                 <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                 <h3 className="text-lg font-medium text-gray-900 mb-2">
// //                   Upload Property Photos
// //                 </h3>
// //                 <p className="text-gray-600 mb-4">
// //                   Upload high-quality photos of your property. You can upload up
// //                   to 20 images.
// //                 </p>
// //                 <input
// //                   type="file"
// //                   multiple
// //                   accept="image/*"
// //                   onChange={handleImageUpload}
// //                   className="hidden"
// //                   id="property-images"
// //                 />
// //                 <label
// //                   htmlFor="property-images"
// //                   className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
// //                 >
// //                   <FiUpload className="w-5 h-5" />
// //                   <span>Choose Files</span>
// //                 </label>
// //               </div>
// //               <div className="grid grid-cols-2 md:grid-cols-3 gap-4"></div>
// //             </div>
// //           )}
// //           {currentStep === 5 && (
// //             <div className="space-y-6">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 Contact Information
// //               </h2>

// //               <div className="grid md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Contact Name *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.contactName}
// //                     onChange={(e) =>
// //                       handleInputChange("contactName", e.target.value)
// //                     }
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="Your full name"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Contact Email *
// //                   </label>
// //                   <input
// //                     type="email"
// //                     value={formData.contactEmail}
// //                     onChange={(e) =>
// //                       handleInputChange("contactEmail", e.target.value)
// //                     }
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="your.email@example.com"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Contact Phone *
// //                   </label>
// //                   <input
// //                     type="tel"
// //                     value={formData.contactPhone}
// //                     onChange={(e) =>
// //                       handleInputChange("contactPhone", e.target.value)
// //                     }
// //                     required
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="+971 50 123 4567"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //           <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={() => setCurrentStep((prev) => prev - 1)}
// //               disabled={currentStep === 1}
// //               className={`px-6 py-3 rounded-xl font-medium ${
// //                 currentStep === 1
// //                   ? "text-gray-400 cursor-not-allowed"
// //                   : "text-gray-700 hover:bg-gray-100"
// //               }`}
// //             >
// //               Previous
// //             </button>

// //             {currentStep < steps.length ? (
// //               <button
// //                 type="button"
// //                 onClick={() => setCurrentStep((prev) => prev + 1)}
// //                 className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
// //               >
// //                 <span>Next Step</span>
// //               </button>
// //             ) : (
// //               <button
// //                 type="submit"
// //                 className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200"
// //               >
// //                 <FiSave className="w-5 h-5" />
// //                 <span>Publish Property</span>
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddProperty;

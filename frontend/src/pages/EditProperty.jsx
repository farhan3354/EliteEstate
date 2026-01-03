import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiUpload,
  FiSave,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiTrash2,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";
import api from "../utils/routeapi";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyData, setPropertyData] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    reset,
    setValue,
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

  const purpose = watch("purpose");

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

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "sold", label: "Sold" },
    { value: "rented", label: "Rented" },
    { value: "pending", label: "Pending" },
    { value: "draft", label: "Draft" },
  ];

  const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const bathroomOptions = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const property = response.data.data.property;
          setPropertyData(property);
          if (property.images && property.images.length > 0) {
            setExistingImages(property.images.map(url => ({
              url,
              isExisting: true,
              isPrimary: false
            })));
          }
          reset({
            title: property.title || "",
            description: property.description || "",
            price: property.price || "",
            purpose: property.purpose || "sale",
            category: property.category || "",
            bedrooms: property.bedrooms || "",
            bathrooms: property.bathrooms || "",
            area: property.area || "",
            areaUnit: property.areaUnit || "sqft",
            yearBuilt: property.yearBuilt || "",
            furnishing: property.furnishing || "",
            location: {
              address: property.location?.address || "",
              city: property.location?.city || "Abu Dhabi",
              area: property.location?.area || "",
            },
            contactInfo: {
              name: property.contactInfo?.name || "",
              phone: property.contactInfo?.phone || "",
              email: property.contactInfo?.email || "",
              showPhone: property.contactInfo?.showPhone !== false,
            },
            status: property.status || "active",
            isVerified: property.isVerified || false,
            isUrgent: property.isUrgent || false,
          });
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        alert("Failed to load property. Please try again.");
        navigate("/user-dashboard/my-properties");
      } finally {
        setIsLoading(false);
      }
    };

    if (token && id) {
      fetchProperty();
    }
  }, [id, token, navigate, reset]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
      isExisting: false,
      isPrimary: existingImages.length === 0 && uploadedImages.length === 0,
    }));
    const totalImages = [...existingImages, ...uploadedImages, ...newImages].slice(0, 5);
    const newUploadedImages = totalImages.filter(img => !img.isExisting);
    setUploadedImages(newUploadedImages);
  };

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      const updatedImages = uploadedImages.filter((_, i) => i !== index);
      if (index === 0 && updatedImages.length > 0) {
        updatedImages[0].isPrimary = true;
      }
      setUploadedImages(updatedImages);
    }
  };

  const handleSetPrimaryImage = (index, isExisting) => {
    if (isExisting) {
      const updatedExisting = existingImages.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }));
      setExistingImages(updatedExisting);
      const updatedUploaded = uploadedImages.map(img => ({
        ...img,
        isPrimary: false,
      }));
      setUploadedImages(updatedUploaded);
    } else {
      const updatedUploaded = uploadedImages.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }));
      setUploadedImages(updatedUploaded);
      
      const updatedExisting = existingImages.map(img => ({
        ...img,
        isPrimary: false,
      }));
      setExistingImages(updatedExisting);
    }
  };

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
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("purpose", data.purpose);
      formData.append("category", data.category);
      formData.append("bedrooms", data.bedrooms);
      formData.append("bathrooms", data.bathrooms);
      formData.append("area", data.area);
      formData.append("areaUnit", data.areaUnit || "sqft");
      if (data.yearBuilt) formData.append("yearBuilt", data.yearBuilt);
      if (data.furnishing) formData.append("furnishing", data.furnishing);
      formData.append("isUrgent", data.isUrgent ? "true" : "false");
      formData.append("isVerified", data.isVerified ? "true" : "false");
      formData.append("location", JSON.stringify(data.location || {}));
      formData.append("contactInfo", JSON.stringify(data.contactInfo || {}));
      formData.append("status", data.status || "active");
      if (uploadedImages.length > 0) {
        uploadedImages.forEach((img) => {
          if (img.file) {
            console.log(`📸 Adding new image:`, img.file.name);
            formData.append("images", img.file);
          }
        });
      }
      console.log("📦 FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(
          `${key}:`,
          typeof value === "object" ? value.name || value : value
        );
      }
      const response = await api.put(`/properties/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Property updated:", response.data);
      alert("Property updated successfully!");
      navigate("/owner-dashboard/my-properties");
    } catch (error) {
      console.error("❌ Error updating property:", error);
      console.error("Error details:", error.response?.data);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to update property. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProperty = async () => {
    if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      try {
        const response = await api.delete(`/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          alert("Property deleted successfully!");
          navigate("/owner-dashboard/my-properties");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading property details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The property you're trying to edit doesn't exist or you don't have permission to edit it.
            </p>
            <Link
              to="/owner-dashboard/my-properties"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to My Properties</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = [...existingImages, ...uploadedImages];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Link
                  to="/owner-dashboard/my-properties"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <FiArrowLeft className="w-5 h-5" />
                  <span>Back to Properties</span>
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Property
              </h1>
              <p className="text-gray-600 mt-2">
                Update your property listing information
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/property/${id}`}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                <FiEye className="w-5 h-5" />
                <span>View Property</span>
              </Link>
              <button
                onClick={deleteProperty}
                className="flex items-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                <FiTrash2 className="w-5 h-5" />
                <span>Delete Property</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <FiEye className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Make changes to your property listing. All updates will be reviewed by our team before going live.
              </p>
            </div>
          </div>
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

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                  Upload New Photos
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add more photos to your property. You can upload up to 5 total images.
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
                  <span>Add More Photos</span>
                </label>
              </div>

              {/* Existing and Uploaded Images Preview */}
              {allImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mt-4 mb-2">
                    Property images ({allImages.length}/5)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(index, img.isExisting)}
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
                            onClick={() => handleRemoveImage(index, img.isExisting)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        {img.isExisting && (
                          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Existing
                          </span>
                        )}
                        {img.isPrimary && (
                          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
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
                <span>{isSubmitting ? "Updating..." : "Update Property"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiHome,
//   FiDollarSign,
//   FiMapPin,
//   FiGrid,
//   FiMaximize,
//   FiCamera,
//   FiCheck,
//   FiArrowLeft,
//   FiSave,
//   FiEye,
//   FiTrash2,
//   FiUpload,
//   FiInfo,
//   FiCalendar,
// } from "react-icons/fi";
// import {
//   MdApartment,
//   MdBathtub,
//   MdBed,
//   MdOutlineBalcony,
// } from "react-icons/md";

// const EditProperty = () => {
//   const [property, setProperty] = useState({
//     title: "Modern 3-Bedroom Apartment in Downtown",
//     type: "apartment",
//     price: "2500000",
//     address: "123 Luxury Street, Downtown",
//     city: "New York",
//     state: "NY",
//     zipCode: "10001",
//     bedrooms: 3,
//     bathrooms: 2,
//     area: "1800",
//     areaUnit: "sqft",
//     description:
//       "A stunning modern apartment in the heart of downtown with panoramic city views. Features include hardwood floors, stainless steel appliances, walk-in closets, and a private balcony.",
//     status: "active",
//     listingType: "sale",
//     yearBuilt: "2020",
//     parkingSpots: 2,
//     furnished: true,
//     petFriendly: false,
//     amenities: ["gym", "pool", "security", "parking", "elevator"],
//   });

//   const [images, setImages] = useState([
//     "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
//     "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
//     "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800",
//   ]);

//   const [newImage, setNewImage] = useState("");

//   const propertyTypes = [
//     { value: "apartment", label: "Apartment", icon: <MdApartment /> },
//     { value: "house", label: "House", icon: <FiHome /> },
//     { value: "villa", label: "Villa", icon: <FiHome /> },
//     { value: "condo", label: "Condo", icon: <MdApartment /> },
//     { value: "townhouse", label: "Townhouse", icon: <FiHome /> },
//   ];

//   const amenitiesList = [
//     { id: "gym", label: "Gym", icon: "🏋️" },
//     { id: "pool", label: "Swimming Pool", icon: "🏊" },
//     { id: "security", label: "24/7 Security", icon: "👮" },
//     { id: "parking", label: "Parking", icon: "🅿️" },
//     { id: "elevator", label: "Elevator", icon: "⬆️" },
//     { id: "garden", label: "Garden", icon: "🌳" },
//     { id: "balcony", label: "Balcony", icon: <MdOutlineBalcony /> },
//     { id: "ac", label: "Air Conditioning", icon: "❄️" },
//     { id: "heating", label: "Heating", icon: "🔥" },
//     { id: "laundry", label: "Laundry", icon: "👕" },
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProperty((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAmenityToggle = (amenityId) => {
//     setProperty((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenityId)
//         ? prev.amenities.filter((id) => id !== amenityId)
//         : [...prev.amenities, amenityId],
//     }));
//   };

//   const handleImageUpload = () => {
//     if (newImage) {
//       setImages([...images, newImage]);
//       setNewImage("");
//     }
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated property:", property);
//     alert("Property updated successfully!");
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-4">
//             <Link
//               to="/owner-dashboard/my-properties"
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//             >
//               <FiArrowLeft className="h-5 w-5" />
//               Back to Properties
//             </Link>
//             <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link
//               to={`/property/1`}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               <FiEye className="h-4 w-4" />
//               View Property
//             </Link>
//             <button
//               onClick={handleSubmit}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <FiSave className="h-4 w-4" />
//               Save Changes
//             </button>
//           </div>
//         </div>
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
//           <div className="flex items-center gap-3">
//             <FiInfo className="h-5 w-5 text-blue-600" />
//             <p className="text-sm text-blue-800">
//               Make changes to your property listing. All updates will be
//               reviewed by our team before going live.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Property Details */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FiHome className="h-5 w-5 text-blue-600" />
//               Basic Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Property Title */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Property Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={property.title}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter property title"
//                 />
//               </div>

//               {/* Property Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Property Type *
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {propertyTypes.map((type) => (
//                     <button
//                       key={type.value}
//                       type="button"
//                       onClick={() =>
//                         setProperty({ ...property, type: type.value })
//                       }
//                       className={`flex items-center justify-center gap-2 p-3 border rounded-lg ${
//                         property.type === type.value
//                           ? "border-blue-500 bg-blue-50 text-blue-700"
//                           : "border-gray-300 hover:bg-gray-50"
//                       }`}
//                     >
//                       <span className="text-lg">{type.icon}</span>
//                       <span>{type.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Listing Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Listing Type *
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setProperty({ ...property, listingType: "sale" })
//                     }
//                     className={`flex items-center justify-center gap-2 p-3 border rounded-lg ${
//                       property.listingType === "sale"
//                         ? "border-green-500 bg-green-50 text-green-700"
//                         : "border-gray-300 hover:bg-gray-50"
//                     }`}
//                   >
//                     <FiDollarSign className="h-5 w-5" />
//                     For Sale
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setProperty({ ...property, listingType: "rent" })
//                     }
//                     className={`flex items-center justify-center gap-2 p-3 border rounded-lg ${
//                       property.listingType === "rent"
//                         ? "border-purple-500 bg-purple-50 text-purple-700"
//                         : "border-gray-300 hover:bg-gray-50"
//                     }`}
//                   >
//                     <FiCalendar className="h-5 w-5" />
//                     For Rent
//                   </button>
//                 </div>
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiDollarSign className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="number"
//                     name="price"
//                     value={property.price}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="0.00"
//                   />
//                 </div>
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Status *
//                 </label>
//                 <select
//                   name="status"
//                   value={property.status}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="active">Active</option>
//                   <option value="pending">Pending</option>
//                   <option value="sold">Sold</option>
//                   <option value="rented">Rented</option>
//                   <option value="draft">Draft</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Location Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FiMapPin className="h-5 w-5 text-blue-600" />
//               Location Details
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Address *
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={property.address}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Street address"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={property.city}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="City"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   State *
//                 </label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={property.state}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="State"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   ZIP Code *
//                 </label>
//                 <input
//                   type="text"
//                   name="zipCode"
//                   value={property.zipCode}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="ZIP Code"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FiGrid className="h-5 w-5 text-blue-600" />
//               Property Description
//             </h2>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={property.description}
//                 onChange={handleChange}
//                 rows="6"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Describe your property in detail..."
//               />
//               <p className="text-sm text-gray-500 mt-2">
//                 {property.description.length}/2000 characters
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Features & Images */}
//         <div>
//           {/* Property Features */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FiMaximize className="h-5 w-5 text-blue-600" />
//               Property Features
//             </h2>

//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bedrooms
//                 </label>
//                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() =>
//                       setProperty({
//                         ...property,
//                         bedrooms: Math.max(1, property.bedrooms - 1),
//                       })
//                     }
//                     className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
//                   >
//                     -
//                   </button>
//                   <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2">
//                     <MdBed className="h-5 w-5 text-gray-600" />
//                     <span className="font-bold">{property.bedrooms}</span>
//                   </div>
//                   <button
//                     onClick={() =>
//                       setProperty({
//                         ...property,
//                         bedrooms: property.bedrooms + 1,
//                       })
//                     }
//                     className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bathrooms
//                 </label>
//                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() =>
//                       setProperty({
//                         ...property,
//                         bathrooms: Math.max(1, property.bathrooms - 1),
//                       })
//                     }
//                     className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
//                   >
//                     -
//                   </button>
//                   <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2">
//                     <MdBathtub className="h-5 w-5 text-gray-600" />
//                     <span className="font-bold">{property.bathrooms}</span>
//                   </div>
//                   <button
//                     onClick={() =>
//                       setProperty({
//                         ...property,
//                         bathrooms: property.bathrooms + 1,
//                       })
//                     }
//                     className="px-3 py-3 bg-gray-100 hover:bg-gray-200"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Area (sqft)
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     name="area"
//                     value={property.area}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Year Built
//                 </label>
//                 <input
//                   type="number"
//                   name="yearBuilt"
//                   value={property.yearBuilt}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Toggle Features */}
//             <div className="space-y-3">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="furnished"
//                   checked={property.furnished}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 rounded"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Furnished</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="petFriendly"
//                   checked={property.petFriendly}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 rounded"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Pet Friendly</span>
//               </label>
//             </div>
//           </div>

//           {/* Amenities */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FiCheck className="h-5 w-5 text-blue-600" />
//               Amenities
//             </h2>

//             <div className="grid grid-cols-2 gap-3">
//               {amenitiesList.map((amenity) => (
//                 <button
//                   key={amenity.id}
//                   type="button"
//                   onClick={() => handleAmenityToggle(amenity.id)}
//                   className={`flex items-center gap-2 p-3 border rounded-lg ${
//                     property.amenities.includes(amenity.id)
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   <span className="text-lg">{amenity.icon}</span>
//                   <span className="text-sm">{amenity.label}</span>
//                   {property.amenities.includes(amenity.id) && (
//                     <FiCheck className="h-4 w-4 text-blue-600 ml-auto" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Images */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FiCamera className="h-5 w-5 text-blue-600" />
//               Property Images
//             </h2>

//             <div className="mb-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <input
//                   type="text"
//                   value={newImage}
//                   onChange={(e) => setNewImage(e.target.value)}
//                   placeholder="Enter image URL"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//                 <button
//                   onClick={handleImageUpload}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   <FiUpload className="h-5 w-5" />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500">
//                 Add up to 10 images. First image will be the cover photo.
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {images.map((img, index) => (
//                 <div key={index} className="relative group">
//                   <img
//                     src={img}
//                     alt={`Property ${index + 1}`}
//                     className="w-full h-32 object-cover rounded-lg"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
//                     <button
//                       onClick={() => removeImage(index)}
//                       className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
//                     >
//                       <FiTrash2 className="h-4 w-4" />
//                     </button>
//                     {index === 0 && (
//                       <span className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
//                         Cover
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProperty;

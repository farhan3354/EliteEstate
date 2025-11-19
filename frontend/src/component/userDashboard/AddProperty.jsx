import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiUpload,
  FiSave,
  FiPlus,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const AddProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    yearBuilt: "",
    features: [],
    amenities: [],
    images: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newAmenity, setNewAmenity] = useState("");

  const propertyTypes = [
    "Apartment",
    "Villa",
    "Townhouse",
    "Penthouse",
    "Commercial",
    "Land",
    "Duplex",
    "Studio",
  ];

  const amenitiesList = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Garden",
    "Balcony",
    "Furnished",
    "Pet Friendly",
    "Air Conditioning",
    "Heating",
    "Elevator",
    "Concierge",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleToggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("Uploading images:", files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property data:", formData);
    navigate("/my-properties");
  };

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Details" },
    { number: 3, title: "Features" },
    { number: 4, title: "Photos" },
    { number: 5, title: "Contact" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Add New Property
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              List your property to reach potential buyers and tenants
            </p>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
            <div className="block md:hidden">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentStep === 1}
                  className={`p-2 rounded-lg ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center flex-1 mx-4">
                  <div className="text-sm font-medium text-gray-900">
                    Step {currentStep} of {steps.length}
                  </div>
                  <div className="text-xs text-gray-600">
                    {steps[currentStep - 1].title}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setCurrentStep((prev) => Math.min(steps.length, prev + 1))
                  }
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
                        currentStep > step.number
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg"
          >
            {currentStep === 1 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Basic Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Luxury 3-Bedroom Apartment with Sea View"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    required
                    rows="4"
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Describe your property in detail..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        handleInputChange("propertyType", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (AED) *
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        required
                        className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      required
                      className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Property Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms *
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) =>
                        handleInputChange("bedrooms", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Bedroom" : "Bedrooms"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms *
                    </label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) =>
                        handleInputChange("bathrooms", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sq ft) *
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter area"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) =>
                        handleInputChange("yearBuilt", e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2020"
                      min="1900"
                      max="2024"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Features & Amenities
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Features
                  </label>
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-3">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a feature (e.g., Sea View, Smart Home)"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs md:text-sm"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {amenitiesList.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center space-x-3 p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleToggleAmenity(amenity)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm md:text-base text-gray-700">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Property Photos
                </h2>

                <div className="border-2 border-dashed border-gray-300 rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
                  <FiUpload className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                    Upload Property Photos
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    Upload high-quality photos of your property. You can upload
                    up to 20 images.
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
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm md:text-base"
                  >
                    <FiUpload className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Choose Files</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"></div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        handleInputChange("contactPhone", e.target.value)
                      }
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium text-sm md:text-base ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>Previous</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                >
                  <span>Next Step</span>
                  <FiChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-green-700 transition-colors duration-200 text-sm md:text-base"
                >
                  <FiSave className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Publish Property</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiHome,
//   FiMapPin,
//   FiDollarSign,
//   FiUpload,
//   FiSave,
//   FiPlus,
//   FiX,
// } from "react-icons/fi";

// const AddProperty = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     propertyType: "",
//     price: "",
//     location: "",
//     bedrooms: "",
//     bathrooms: "",
//     area: "",
//     yearBuilt: "",
//     features: [],
//     amenities: [],
//     images: [],
//     contactName: "",
//     contactEmail: "",
//     contactPhone: "",
//   });

//   const [newFeature, setNewFeature] = useState("");
//   const [newAmenity, setNewAmenity] = useState("");

//   const propertyTypes = [
//     "Apartment",
//     "Villa",
//     "Townhouse",
//     "Penthouse",
//     "Commercial",
//     "Land",
//     "Duplex",
//     "Studio",
//   ];

//   const amenitiesList = [
//     "Swimming Pool",
//     "Gym",
//     "Parking",
//     "Security",
//     "Garden",
//     "Balcony",
//     "Furnished",
//     "Pet Friendly",
//     "Air Conditioning",
//     "Heating",
//     "Elevator",
//     "Concierge",
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleAddFeature = () => {
//     if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         features: [...prev.features, newFeature.trim()],
//       }));
//       setNewFeature("");
//     }
//   };

//   const handleRemoveFeature = (feature) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((f) => f !== feature),
//     }));
//   };

//   const handleToggleAmenity = (amenity) => {
//     setFormData((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter((a) => a !== amenity)
//         : [...prev.amenities, amenity],
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     console.log("Uploading images:", files);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Property data:", formData);
//     navigate("/my-properties");
//   };

//   const steps = [
//     { number: 1, title: "Basic Information" },
//     { number: 2, title: "Property Details" },
//     { number: 3, title: "Features & Amenities" },
//     { number: 4, title: "Photos" },
//     { number: 5, title: "Contact Info" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Add New Property
//           </h1>
//           <p className="text-gray-600">
//             List your property to reach potential buyers and tenants
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <React.Fragment key={step.number}>
//                 <div className="flex items-center">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
//                       currentStep >= step.number
//                         ? "bg-blue-600 border-blue-600 text-white"
//                         : "border-gray-300 text-gray-500"
//                     }`}
//                   >
//                     {step.number}
//                   </div>
//                   <span
//                     className={`ml-3 font-medium ${
//                       currentStep >= step.number
//                         ? "text-blue-600"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {step.title}
//                   </span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`flex-1 h-1 mx-4 ${
//                       currentStep > step.number ? "bg-blue-600" : "bg-gray-300"
//                     }`}
//                   />
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl p-6 shadow-lg"
//         >
//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Basic Information
//               </h2>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Property Title *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => handleInputChange("title", e.target.value)}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="e.g., Luxury 3-Bedroom Apartment with Sea View"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     handleInputChange("description", e.target.value)
//                   }
//                   required
//                   rows="4"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                   placeholder="Describe your property in detail..."
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Property Type *
//                   </label>
//                   <select
//                     value={formData.propertyType}
//                     onChange={(e) =>
//                       handleInputChange("propertyType", e.target.value)
//                     }
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select Type</option>
//                     {propertyTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price (AED) *
//                   </label>
//                   <div className="relative">
//                     <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) =>
//                         handleInputChange("price", e.target.value)
//                       }
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter price"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Location *
//                 </label>
//                 <div className="relative">
//                   <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) =>
//                       handleInputChange("location", e.target.value)
//                     }
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter full address"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Property Details
//               </h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bedrooms *
//                   </label>
//                   <select
//                     value={formData.bedrooms}
//                     onChange={(e) =>
//                       handleInputChange("bedrooms", e.target.value)
//                     }
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select</option>
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
//                       <option key={num} value={num}>
//                         {num} {num === 1 ? "Bedroom" : "Bedrooms"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bathrooms *
//                   </label>
//                   <select
//                     value={formData.bathrooms}
//                     onChange={(e) =>
//                       handleInputChange("bathrooms", e.target.value)
//                     }
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select</option>
//                     {[1, 2, 3, 4, 5, 6].map((num) => (
//                       <option key={num} value={num}>
//                         {num} {num === 1 ? "Bathroom" : "Bathrooms"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Area (sq ft) *
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.area}
//                     onChange={(e) => handleInputChange("area", e.target.value)}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter area"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Year Built
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.yearBuilt}
//                     onChange={(e) =>
//                       handleInputChange("yearBuilt", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="e.g., 2020"
//                     min="1900"
//                     max="2024"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//           {currentStep === 3 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Features & Amenities
//               </h2>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Property Features
//                 </label>
//                 <div className="flex space-x-2 mb-3">
//                   <input
//                     type="text"
//                     value={newFeature}
//                     onChange={(e) => setNewFeature(e.target.value)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Add a feature (e.g., Sea View, Smart Home)"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddFeature}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
//                   >
//                     <FiPlus className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                     >
//                       <span>{feature}</span>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveFeature(feature)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <FiX className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Amenities
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {amenitiesList.map((amenity) => (
//                     <label
//                       key={amenity}
//                       className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={formData.amenities.includes(amenity)}
//                         onChange={() => handleToggleAmenity(amenity)}
//                         className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <span className="text-gray-700">{amenity}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//           {currentStep === 4 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Property Photos
//               </h2>

//               <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
//                 <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   Upload Property Photos
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Upload high-quality photos of your property. You can upload up
//                   to 20 images.
//                 </p>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="property-images"
//                 />
//                 <label
//                   htmlFor="property-images"
//                   className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
//                 >
//                   <FiUpload className="w-5 h-5" />
//                   <span>Choose Files</span>
//                 </label>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4"></div>
//             </div>
//           )}
//           {currentStep === 5 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Contact Information
//               </h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.contactName}
//                     onChange={(e) =>
//                       handleInputChange("contactName", e.target.value)
//                     }
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Your full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Email *
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.contactEmail}
//                     onChange={(e) =>
//                       handleInputChange("contactEmail", e.target.value)
//                     }
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="your.email@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Phone *
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.contactPhone}
//                     onChange={(e) =>
//                       handleInputChange("contactPhone", e.target.value)
//                     }
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="+971 50 123 4567"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//           <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={() => setCurrentStep((prev) => prev - 1)}
//               disabled={currentStep === 1}
//               className={`px-6 py-3 rounded-xl font-medium ${
//                 currentStep === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               Previous
//             </button>

//             {currentStep < steps.length ? (
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep((prev) => prev + 1)}
//                 className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
//               >
//                 <span>Next Step</span>
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200"
//               >
//                 <FiSave className="w-5 h-5" />
//                 <span>Publish Property</span>
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProperty;

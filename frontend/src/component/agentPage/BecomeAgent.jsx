import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FiCheck,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiAward,
  FiCalendar,
  FiGlobe,
  FiBriefcase,
  FiMapPin,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../utils/routeapi";

const BecomeAgent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const token = useSelector((state) => state.auth.token);

  const benefits = [
    "Access to exclusive property listings",
    "Advanced CRM and management tools",
    "Marketing and advertising support",
    "Training and professional development",
    "Competitive commission structure",
    "Dedicated support team",
  ];

  const specializationOptions = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "luxury", label: "Luxury Properties" },
    { value: "rental", label: "Rental" },
    { value: "investment", label: "Investment" },
    { value: "new_development", label: "New Developments" },
  ];

  const emirateOptions = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
  ];

  const languageOptions = [
    "English",
    "Arabic",
    "Hindi",
    "Urdu",
    "Russian",
    "French",
    "Spanish",
    "Chinese",
    "Other",
  ];
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (!token) {
        alert("Please login first to become an agent");
        navigate("/login");
        return;
      }
      const formData = {
        licenseNumber: data.licenseNumber,
        licenseExpiry: data.licenseExpiry,
        specialization: data.specialization || [],
        bio: data.bio,
        languages: data.languages || [],
        officeAddress: data.officeAddress,
        officePhone: data.officePhone,
        website: data.website,
        companyName: data.companyName,
        yearsOfExperience: parseInt(data.yearsOfExperience) || 0,
        areasServed: data.areasServed ? [data.areasServed] : [],
      };

      const response = await api.post("/become-agent", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert("Application submitted successfully! Awaiting admin approval.");
        reset();
        console.log("Agent registration successful:", response.data);
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.message || "Registration failed";

        if (
          error.response.status === 400 &&
          errorMessage.includes("already registered")
        ) {
          alert("You are already registered as an agent.");
        } else if (
          error.response.status === 400 &&
          errorMessage.includes("License number")
        ) {
          alert("This license number is already registered.");
        } else if (
          error.response.status === 400 &&
          errorMessage.includes("Owners cannot")
        ) {
          alert("Owners cannot register as agents.");
        } else if (error.response.status === 401) {
          alert("Session expired. Please login again.");
          // dispatch(logout());
        } else {
          alert(`Error: ${errorMessage}`);
        }
      } else if (error.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Team of Real Estate Experts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your successful career in real estate with our comprehensive
            support and industry-leading tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Join Us?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <FiCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600">Agents</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-600">5,000+</div>
                <div className="text-sm text-gray-600">Properties</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-600">AED 2B+</div>
                <div className="text-sm text-gray-600">Annual Sales</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Requirements:
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Valid RERA License</li>
                <li>• Minimum 1 year experience (recommended)</li>
                <li>• Good communication skills</li>
                <li>• Professional references</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RERA License Number *
                </label>
                <input
                  type="text"
                  {...register("licenseNumber", {
                    required: "License number is required",
                    pattern: {
                      value: /^RERA-[A-Z0-9]+$/i,
                      message: "License number should be in format RERA-12345",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="RERA-12345"
                />
                {errors.licenseNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.licenseNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Expiry Date *
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    {...register("licenseExpiry", {
                      required: "License expiry date is required",
                      validate: (value) => {
                        const expiryDate = new Date(value);
                        const today = new Date();
                        return (
                          expiryDate > today ||
                          "License must be valid (future date)"
                        );
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.licenseExpiry && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.licenseExpiry.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <FiAward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      {...register("yearsOfExperience", {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 50, message: "Maximum 50 years" },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                  {errors.yearsOfExperience && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specializationOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`specialization-${option.value}`}
                        value={option.value}
                        {...register("specialization")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label
                        htmlFor={`specialization-${option.value}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`language-${language}`}
                        value={language}
                        {...register("languages")}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label
                        htmlFor={`language-${language}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas Served */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Area Served
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    {...register("areasServed")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">Select Primary Emirate</option>
                    {emirateOptions.map((emirate) => (
                      <option key={emirate} value={emirate}>
                        {emirate}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name (Optional)
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register("companyName")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Office Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Address (Optional)
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register("officeAddress")}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full office address"
                  />
                </div>
              </div>

              {/* Office Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Phone (Optional)
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    {...register("officePhone", {
                      pattern: {
                        value: /^[+\d\s\-()]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+971 4 123 4567"
                  />
                </div>
                {errors.officePhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.officePhone.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: "Invalid website URL",
                      },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.website.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio (Optional)
                </label>
                <textarea
                  rows="4"
                  {...register("bio", {
                    maxLength: {
                      value: 1000,
                      message: "Bio cannot exceed 1000 characters",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Tell us about your professional background, achievements, and approach to real estate..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg transition-colors duration-200 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>

              {/* Terms Note */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this application, you agree to our terms and
                conditions. Your application will be reviewed by our team within
                2-3 business days.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAgent;

// import React, { useState } from "react";
// import {
//   FiCheck,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiHome,
//   FiAward,
//   FiDollarSign,
// } from "react-icons/fi";

// const BecomeAgent = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     experience: "",
//     location: "",
//     specialties: "",
//     license: "",
//     message: "",
//   });

//   const benefits = [
//     "Access to exclusive property listings",
//     "Advanced CRM and management tools",
//     "Marketing and advertising support",
//     "Training and professional development",
//     "Competitive commission structure",
//     "Dedicated support team",
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Agent application:", formData);
//     // Handle form submission
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Join Our Team of Real Estate Experts
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Start your successful career in real estate with our comprehensive
//             support and industry-leading tools
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Benefits Section */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Why Join Us?
//             </h2>
//             <div className="space-y-4">
//               {benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-start space-x-3">
//                   <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
//                     <FiCheck className="w-4 h-4 text-green-600" />
//                   </div>
//                   <p className="text-gray-700">{benefit}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Stats */}
//             <div className="mt-8 grid grid-cols-2 gap-4">
//               <div className="bg-white rounded-xl p-4 text-center shadow-lg">
//                 <div className="text-2xl font-bold text-blue-600">200+</div>
//                 <div className="text-sm text-gray-600">Agents</div>
//               </div>
//               <div className="bg-white rounded-xl p-4 text-center shadow-lg">
//                 <div className="text-2xl font-bold text-blue-600">5,000+</div>
//                 <div className="text-sm text-gray-600">Properties</div>
//               </div>
//               <div className="bg-white rounded-xl p-4 text-center shadow-lg">
//                 <div className="text-2xl font-bold text-blue-600">AED 2B+</div>
//                 <div className="text-sm text-gray-600">Annual Sales</div>
//               </div>
//               <div className="bg-white rounded-xl p-4 text-center shadow-lg">
//                 <div className="text-2xl font-bold text-blue-600">98%</div>
//                 <div className="text-sm text-gray-600">Client Satisfaction</div>
//               </div>
//             </div>
//           </div>

//           {/* Application Form */}
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name *
//                   </label>
//                   <div className="relative">
//                     <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       required
//                       value={formData.firstName}
//                       onChange={(e) =>
//                         handleInputChange("firstName", e.target.value)
//                       }
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="John"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.lastName}
//                     onChange={(e) =>
//                       handleInputChange("lastName", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Doe"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="tel"
//                     required
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="+971 50 123 4567"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Years of Experience
//                   </label>
//                   <div className="relative">
//                     <FiAward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="number"
//                       value={formData.experience}
//                       onChange={(e) =>
//                         handleInputChange("experience", e.target.value)
//                       }
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Preferred Location
//                   </label>
//                   <div className="relative">
//                     <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={formData.location}
//                       onChange={(e) =>
//                         handleInputChange("location", e.target.value)
//                       }
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//                     >
//                       <option value="">Select Location</option>
//                       <option value="Abu Dhabi">Abu Dhabi</option>
//                       <option value="Dubai">Dubai</option>
//                       <option value="Sharjah">Sharjah</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   RERA License Number
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.license}
//                   onChange={(e) => handleInputChange("license", e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="RERA-12345"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Specialties & Experience
//                 </label>
//                 <textarea
//                   rows="4"
//                   value={formData.message}
//                   onChange={(e) => handleInputChange("message", e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                   placeholder="Tell us about your real estate experience and specialties..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
//               >
//                 Submit Application
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BecomeAgent;

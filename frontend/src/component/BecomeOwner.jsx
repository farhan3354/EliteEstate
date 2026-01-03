import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiBriefcase,
  FiMapPin,
  FiPhone,
  FiAlertCircle,
  FiHome,
  FiUser,
} from "react-icons/fi";
import api from "../utils/routeapi";
import { login } from "./../redux/slices/authSlice";

const BecomeOwner = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const businessTypeOptions = [
    { value: "individual", label: "Individual" },
    { value: "company", label: "Company" },
    { value: "trust", label: "Trust" },
    { value: "partnership", label: "Partnership" },
  ];

  const benefits = [
    "List and manage unlimited properties",
    "Find verified tenants quickly",
    "Professional property management tools",
    "Secure payment processing",
    "Maintenance request management",
    "Legal and tax document management",
    "Market insights and analytics",
    "24/7 support for property owners",
  ];

  const onSubmit = async (data) => {
    try {
      setSubmitError("");
      setSubmitSuccess("");

      if (!token) {
        setSubmitError("Please login first to become an owner");
        navigate("/login");
        return;
      }

      // Form data without bank details
      const formData = {
        companyName: data.companyName,
        businessType: data.businessType || "individual",
        taxId: data.taxId || "",
        registrationNumber: data.registrationNumber || "",
        businessAddress: {
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zipCode || "",
          country: data.country || "",
        },
        alternatePhone: data.alternatePhone || "",
        emergencyContact: {
          name: data.emergencyContactName || "",
          phone: data.emergencyContactPhone || "",
          relationship: data.emergencyContactRelationship || "",
        },
      };

      const response = await api.post("/become-owner", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setSubmitSuccess("Owner registration submitted successfully!");
        reset();

        // Update Redux store with new user data and token
        if (response.data.token && response.data.data?.user) {
          dispatch(
            login({
              user: response.data.data.user,
              token: response.data.token,
            })
          );
        }

        // Navigate after a delay
        setTimeout(() => {
          navigate("/owner-dashboard");
        }, 2000);
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Owner registration error:", error);

      if (error.response) {
        const errorData = error.response.data;
        const errorMessage = errorData.message || "Registration failed";

        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Show validation errors
          setSubmitError(errorData.errors.join(", "));
        } else if (error.response.status === 400) {
          if (errorMessage.includes("already registered")) {
            setSubmitError("You are already registered as an owner.");
          } else if (errorMessage.includes("Agents cannot")) {
            setSubmitError("Agents cannot register as property owners.");
          } else {
            setSubmitError(`Error: ${errorMessage}`);
          }
        } else if (error.response.status === 401) {
          setSubmitError("Session expired. Please login again.");
        } else {
          setSubmitError(`Error: ${errorMessage}`);
        }
      } else if (error.request) {
        setSubmitError("Network error. Please check your connection.");
      } else {
        setSubmitError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Success/Error Messages */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <FiCheck className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-700">{submitSuccess}</p>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-700">{submitError}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Register as an Owner?
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Requirements:
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Valid government-issued ID</li>
                  <li>• Proof of property ownership</li>
                  <li>• You can add bank details later</li>
                  <li>• Tax identification number (optional)</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Note:</h3>
                <p className="text-sm text-gray-600">
                  Your registration will be verified by our team within 24-48
                  hours. You'll be able to list properties once verified. You
                  can add bank details later in your profile settings.
                </p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Register as Property Owner
                </h1>
                <p className="text-gray-600">
                  Complete your profile to start listing and managing properties
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Business Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiBriefcase className="mr-2" /> Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type *
                      </label>
                      <select
                        {...register("businessType", {
                          required: "Business type is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Business Type</option>
                        {businessTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.businessType && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.businessType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        {...register("companyName")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax ID (Optional)
                      </label>
                      <input
                        type="text"
                        {...register("taxId")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tax identification number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number (Optional)
                      </label>
                      <input
                        type="text"
                        {...register("registrationNumber")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Business registration number"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Address */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiMapPin className="mr-2" /> Business Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        {...register("street")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Street and building number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        {...register("city", {
                          required: "City is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        {...register("state", {
                          required: "State/Province is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="State or province"
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        {...register("zipCode")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Postal code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiPhone className="mr-2" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alternate Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("alternatePhone", {
                          pattern: {
                            value: /^[+\d\s\-()]+$/,
                            message: "Invalid phone number format",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+971 50 123 4567"
                      />
                      {errors.alternatePhone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.alternatePhone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiUser className="mr-2" /> Emergency Contact (Optional)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        {...register("emergencyContactName")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency contact person"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        {...register("emergencyContactPhone", {
                          pattern: {
                            value: /^[+\d\s\-()]+$/,
                            message: "Invalid phone number format",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+971 50 123 4567"
                      />
                      {errors.emergencyContactPhone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.emergencyContactPhone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        {...register("emergencyContactRelationship")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Spouse, Family, Business Partner"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    {...register("agreeTerms", {
                      required: "You must agree to the terms and conditions",
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="ml-2 text-sm text-gray-600"
                  >
                    I confirm that I am the legal owner of the properties I will
                    list and I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    . I understand that I can add my bank details later in my
                    profile settings.
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.agreeTerms.message}
                  </p>
                )}

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-blue-600 text-white py-4 rounded-lg font-medium text-lg transition-colors duration-200 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Register as Owner"}
                  </button>
                  <Link
                    to="/"
                    className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg hover:bg-gray-300 font-medium text-lg text-center"
                  >
                    Cancel
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our verification
                  process. You'll receive an email once your owner account is
                  verified. Bank details can be added later in your profile
                  settings.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeOwner;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const BecomeOwner = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     propertiesOwned: "",
//     agreeTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Owner registration:", formData);
//     // API call would go here
//     alert("Registration submitted! Admin will verify your account.");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-3xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Become a Property Owner
//             </h1>
//             <p className="text-gray-600">
//               List and manage your properties with our platform
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   First Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number *
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address *
//               </label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 rows="2"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Number of Properties Owned
//               </label>
//               <input
//                 type="number"
//                 name="propertiesOwned"
//                 value={formData.propertiesOwned}
//                 onChange={handleChange}
//                 min="1"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="agreeTerms"
//                 checked={formData.agreeTerms}
//                 onChange={handleChange}
//                 required
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 text-sm text-gray-600">
//                 I agree to the{" "}
//                 <Link to="/terms" className="text-blue-600">
//                   Terms & Conditions
//                 </Link>{" "}
//                 and confirm that I am the legal owner of the properties I list.
//               </label>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
//               >
//                 Register as Owner
//               </button>
//               <Link
//                 to="/"
//                 className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 font-medium text-center"
//               >
//                 Cancel
//               </Link>
//             </div>
//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <h3 className="text-lg font-medium mb-3">
//               Benefits for Property Owners:
//             </h3>
//             <ul className="space-y-2 text-gray-600">
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-2">✓</span>
//                 List properties for sale or rent
//               </li>
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-2">✓</span>
//                 Connect with verified agents
//               </li>
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-2">✓</span>
//                 Receive inquiries directly
//               </li>
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-2">✓</span>
//                 Manage multiple properties
//               </li>
//               <li className="flex items-center">
//                 <span className="text-green-500 mr-2">✓</span>
//                 Get admin support for disputes
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BecomeOwner;

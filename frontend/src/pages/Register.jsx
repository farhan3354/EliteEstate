import axios from "axios";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiCheck,
  FiShield,
  FiStar
} from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();
  const [formdata, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userType: "tenant",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.submit) {
      setErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  const handlePhoneChange = (value) => {
    setformData((prev) => ({
      ...prev,
      phone: value,
    }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formdata.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formdata.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formdata.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formdata.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formdata.password) {
      newErrors.password = "Password is required";
    } else if (formdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formdata
      );
      console.log("Registration success:", response.data);
      
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            message: "Registration successful! Please login to continue.",
            email: formdata.email
          }
        });
      }, 1000);
      
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ 
        submit: error.response?.data?.message || "Registration failed. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-orange-500 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-center">
            <div className="flex items-center mb-8">
              <FiHome className="w-12 h-12 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">EstateElite</h1>
                <p className="text-blue-100">Premium Properties</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">Start Your Journey</h2>
            <p className="text-blue-100 text-lg mb-8">
              Join our community of property seekers and owners. Find your dream home or list your property with confidence.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FiShield className="w-5 h-5" />
                </div>
                <span>Secure & Verified Listings</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FiStar className="w-5 h-5" />
                </div>
                <span>Premium Property Portfolio</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FiUser className="w-5 h-5" />
                </div>
                <span>5000+ Successful Matches</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 lg:p-12">
          <div className="text-center lg:text-left mb-8">
            <div className="lg:hidden flex items-center justify-center mb-6">
              <FiHome className="w-10 h-10 text-orange-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EstateElite</h1>
                <p className="text-gray-600 text-sm">Premium Properties</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join EstateElite</h2>
            <p className="text-gray-600">Create your account and unlock premium property access</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setformData((prev) => ({ ...prev, userType: "tenant" }))}
                disabled={loading}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                  formdata.userType === "tenant"
                    ? "border-orange-500 bg-orange-50 text-orange-700 shadow-md"
                    : "border-gray-200 hover:border-orange-300 text-gray-700 hover:bg-orange-25"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="w-8 h-8 mx-auto mb-2">
                  <FiHome className={`w-6 h-6 mx-auto ${
                    formdata.userType === "tenant" ? "text-orange-500" : "text-gray-400"
                  }`} />
                </div>
                <span className="text-sm font-medium block">Find Properties</span>
                <span className="text-xs text-gray-500 mt-1 block">Tenant</span>
              </button>
              <button
                type="button"
                onClick={() => setformData((prev) => ({ ...prev, userType: "landlord" }))}
                disabled={loading}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                  formdata.userType === "landlord"
                    ? "border-orange-500 bg-orange-50 text-orange-700 shadow-md"
                    : "border-gray-200 hover:border-orange-300 text-gray-700 hover:bg-orange-25"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="w-8 h-8 mx-auto mb-2">
                  <FiUser className={`w-6 h-6 mx-auto ${
                    formdata.userType === "landlord" ? "text-orange-500" : "text-gray-400"
                  }`} />
                </div>
                <span className="text-sm font-medium block">List Properties</span>
                <span className="text-xs text-gray-500 mt-1 block">Landlord</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleForm} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleInput}
                  placeholder="Enter your full name"
                  disabled={loading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">•</span>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handleInput}
                  placeholder="your@email.com"
                  disabled={loading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">•</span>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className={`border rounded-xl focus-within:ring-2 transition-colors ${
                errors.phone
                  ? "border-red-300 focus-within:ring-red-500 focus-within:border-red-500"
                  : "border-gray-300 focus-within:ring-orange-500 focus-within:border-orange-500"
              }`}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <PhoneInput
                    international
                    defaultCountry="AE"
                    value={formdata.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter phone number"
                    disabled={loading}
                    className="w-full"
                    inputClassName="!border-none !shadow-none !outline-none !ring-0 w-full pl-10 pr-3 py-3 rounded-xl disabled:opacity-50"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">•</span>
                  {errors.phone}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formdata.password}
                  onChange={handleInput}
                  placeholder="Create a secure password"
                  disabled={loading}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">•</span>
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex items-start space-x-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  disabled={loading}
                  className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 disabled:opacity-50"
                />
                {agreeToTerms && (
                  <FiCheck className="w-3 h-3 text-white absolute left-1 pointer-events-none" />
                )}
              </div>
              <label htmlFor="terms" className={`text-sm text-gray-600 ${loading ? 'opacity-50' : ''}`}>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="mr-1">•</span>
                {errors.terms}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white py-4 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <FiUser className="w-5 h-5" />
                  <span>Create Your Account</span>
                </>
              )}
            </button>
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600 text-center flex items-center justify-center">
                  <span className="mr-2">•</span>
                  {errors.submit}
                </p>
              </div>
            )}
          </form>
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm font-medium">Already have an account?</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="text-center">
            <Link
              to="/login"
              className={`inline-flex items-center justify-center w-full bg-white border border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                loading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              <FiUser className="w-4 h-4 mr-2" />
              Sign In to Existing Account
            </Link>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm mb-4">Trusted by real estate professionals</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-gray-400">
                <FiShield className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Secure</span>
              </div>
              <div className="text-gray-400">
                <FiStar className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Verified</span>
              </div>
              <div className="text-gray-400">
                <FiUser className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import axios from "axios";
// import React, { useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [formdata, setformData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     userType: "tenant",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setformData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handlePhoneChange = (value) => {
//     setformData((prev) => ({
//       ...prev,
//       phone: value,
//     }));
//     if (errors.phone) {
//       setErrors((prev) => ({ ...prev, phone: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formdata.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formdata.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formdata.phone) {
//       newErrors.phone = "Phone number is required";
//     }

//     if (!formdata.password) {
//       newErrors.password = "Password is required";
//     } else if (formdata.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleForm = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const respo = await axios.post(
//         "http://localhost:8000/api/register",
//         formdata
//       );
//       console.log("Registration success:", respo.data);
//       navigate("/login");
//     } catch (error) {
//       console.error("Registration error:", error);
//       setErrors({ submit: "Registration failed. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
//               <h1 className="text-2xl font-bold text-white text-center">
//                 Create Your Account
//               </h1>
//               <p className="text-orange-100 text-center mt-2">
//                 Join thousands finding their perfect property
//               </p>
//             </div>

//             <div className="p-6">
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   I want to:
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setformData((prev) => ({ ...prev, userType: "tenant" }))
//                     }
//                     className={`p-3 border rounded-lg text-center transition-all duration-200 ${
//                       formdata.userType === "tenant"
//                         ? "border-orange-500 bg-orange-50 text-orange-700"
//                         : "border-gray-300 hover:border-gray-400 text-gray-700"
//                     }`}
//                   >
//                     <div className="w-6 h-6 mx-auto mb-2">
//                       <svg
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                         />
//                       </svg>
//                     </div>
//                     <span className="text-sm font-medium">Rent Properties</span>
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setformData((prev) => ({ ...prev, userType: "landlord" }))
//                     }
//                     className={`p-3 border rounded-lg text-center transition-all duration-200 ${
//                       formdata.userType === "landlord"
//                         ? "border-orange-500 bg-orange-50 text-orange-700"
//                         : "border-gray-300 hover:border-gray-400 text-gray-700"
//                     }`}
//                   >
//                     <div className="w-6 h-6 mx-auto mb-2">
//                       <svg
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                         />
//                       </svg>
//                     </div>
//                     <span className="text-sm font-medium">List Properties</span>
//                   </button>
//                 </div>
//               </div>

//               <form onSubmit={handleForm} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formdata.name}
//                     onChange={handleInput}
//                     placeholder="Enter your full name"
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
//                       errors.name
//                         ? "border-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
//                     }`}
//                   />
//                   {errors.name && (
//                     <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formdata.email}
//                     onChange={handleInput}
//                     placeholder="Enter your email"
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
//                       errors.email
//                         ? "border-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
//                     }`}
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <div
//                     className={`border rounded-lg focus-within:ring-2 transition duration-200 ${
//                       errors.phone
//                         ? "border-red-300 focus-within:ring-red-500 focus-within:border-red-500"
//                         : "border-gray-300 focus-within:ring-orange-500 focus-within:border-orange-500"
//                     }`}
//                   >
//                     <PhoneInput
//                       international
//                       defaultCountry="AE"
//                       value={formdata.phone}
//                       onChange={handlePhoneChange}
//                       placeholder="Enter phone number"
//                       className="w-full"
//                       inputClassName="!border-none !shadow-none !outline-none !ring-0 w-full px-4 py-3 rounded-lg"
//                     />
//                   </div>
//                   {errors.phone && (
//                     <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formdata.password}
//                     onChange={handleInput}
//                     placeholder="Create a secure password"
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
//                       errors.password
//                         ? "border-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
//                     }`}
//                   />
//                   {errors.password && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-600">
//                     I agree to the{" "}
//                     <a
//                       href="#"
//                       className="text-orange-500 hover:text-orange-600 font-medium"
//                     >
//                       Terms of Service
//                     </a>{" "}
//                     and{" "}
//                     <a
//                       href="#"
//                       className="text-orange-500 hover:text-orange-600 font-medium"
//                     >
//                       Privacy Policy
//                     </a>
//                   </label>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Creating Account...
//                     </div>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>

//                 {errors.submit && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <p className="text-sm text-red-600 text-center">
//                       {errors.submit}
//                     </p>
//                   </div>
//                 )}
//               </form>
//               <div className="text-center border-t border-gray-200 pt-4">
//                 <p className="text-gray-600 text-sm">
//                   Have an account?{" "}
//                   <Link
//                     to="/login"
//                     className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
//                   >
//                     Sign in
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

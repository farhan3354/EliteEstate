import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiHome,
  FiUser,
  FiShield,
} from "react-icons/fi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../redux/slices/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [localErrors, setLocalErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, token, loading, error } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
    if (location.state?.message) {
      console.log(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (localErrors[name]) {
      setLocalErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(loginStart());

      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(
          loginSuccess({
            user: data.data.user,
            token: data.token,
          })
        );
      } else {
        dispatch(loginFailure(data.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure("Login failed. Please try again."));
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

            <h2 className="text-4xl font-bold mb-6">Find Your Dream Home</h2>
            <p className="text-blue-100 text-lg mb-8">
              Access thousands of premium properties and connect with trusted
              real estate professionals.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FiShield className="w-5 h-5" />
                </div>
                <span>Secure & Trusted Platform</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FiUser className="w-5 h-5" />
                </div>
                <span>5000+ Happy Clients</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FiHome className="w-5 h-5" />
                </div>
                <span>10000+ Premium Listings</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 lg:p-12">
          <div className="text-center lg:text-left mb-8">
            <div className="lg:hidden flex items-center justify-center mb-6">
              <FiHome className="w-10 h-10 text-orange-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  EstateElite
                </h1>
                <p className="text-gray-600 text-sm">Premium Properties</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your property dashboard
            </p>
          </div>

          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="your@email.com"
                  disabled={loading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    localErrors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
              </div>
              {localErrors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">•</span>
                  {localErrors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  disabled={loading}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    localErrors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
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
              {localErrors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">•</span>
                  {localErrors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <span
                  className={`text-gray-700 font-medium ${
                    loading ? "opacity-50" : ""
                  }`}
                >
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-orange-500 hover:text-orange-600 font-semibold transition-colors text-sm ${
                  loading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white py-4 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <FiUser className="w-5 h-5" />
                  <span>Sign In to Your Account</span>
                </>
              )}
            </button>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600 text-center flex items-center justify-center">
                  <span className="mr-2">•</span>
                  {error}
                </p>
              </div>
            )}
          </form>
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm font-medium">
              New to EstateElite?
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="text-center">
            <Link
              to="/register"
              className={`inline-flex items-center justify-center w-full bg-white border border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                loading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <FiUser className="w-4 h-4 mr-2" />
              Create New Account
            </Link>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm mb-4">
              Trusted by leading real estate professionals
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-gray-400">
                <FiShield className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Secure</span>
              </div>
              <div className="text-gray-400">
                <FiHome className="w-6 h-6 mx-auto mb-1" />
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

// import React, { useState } from "react";
// import axios from "axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleForm = async (e) => {
//     e.preventDefault();
//     try {
//       const respo = await axios.post("http://localhost:8000/authlogin", {
//         email,
//         password,
//       });
//       console.log("Login success:", respo.data);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//           <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
//             Login
//           </h3>
//           <form onSubmit={handleForm} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 value={email}
//                 placeholder="Enter your email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

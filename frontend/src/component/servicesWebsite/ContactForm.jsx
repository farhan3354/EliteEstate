// import React, { useState } from "react";
// import {
//   FiMail,
//   FiUser,
//   FiPhone,
//   FiMessageSquare,
//   FiSend,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiCheck,
// } from "react-icons/fi";
// import axios from "axios";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [isRobot, setIsRobot] = useState(false);
//   const [checkboxError, setCheckboxError] = useState("");

//   const API_URL = "http://localhost:8000/api";

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (formData.name.length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (
//       !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ""))
//     ) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required";
//     } else if (formData.message.length < 10) {
//       newErrors.message = "Message must be at least 10 characters";
//     }

//     // Check if robot checkbox is checked
//     if (!isRobot) {
//       setCheckboxError("Please confirm you are not a robot");
//     } else {
//       setCheckboxError("");
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     setIsRobot(e.target.checked);
//     if (checkboxError && e.target.checked) {
//       setCheckboxError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();

//     // Check checkbox separately
//     if (!isRobot) {
//       setCheckboxError("Please confirm you are not a robot");
//       return;
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);
//     setSubmitMessage("");

//     try {
//       const response = await axios.post(`${API_URL}/contact/submit`, {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         message: formData.message,
//       });

//       if (response.data.success) {
//         // Success state
//         setSubmitStatus("success");
//         setSubmitMessage(response.data.message || "Thank you! Your message has been sent successfully. We will contact you within 24 hours.");

//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//         setIsRobot(false);
//         setErrors({});
//         setCheckboxError("");

//         // Auto-clear success message after 5 seconds
//         setTimeout(() => {
//           setSubmitStatus(null);
//           setSubmitMessage("");
//         }, 5000);
//       } else {
//         // API returned error
//         setSubmitStatus("error");
//         setSubmitMessage(response.data.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       let errorMessage = "Oops! Something went wrong. Please try again or contact us directly at info@securenet-services.com";

//       if (error.response) {
//         // Server responded with error
//         if (error.response.data.errors) {
//           // Validation errors from server
//           const serverErrors = {};
//           error.response.data.errors.forEach(err => {
//             if (err.includes('Name')) serverErrors.name = err;
//             else if (err.includes('Email')) serverErrors.email = err;
//             else if (err.includes('Phone')) serverErrors.phone = err;
//             else if (err.includes('Message')) serverErrors.message = err;
//           });
//           setErrors(serverErrors);
//           errorMessage = "Please check the form for errors.";
//         } else {
//           errorMessage = error.response.data.message || errorMessage;
//         }
//       } else if (error.request) {
//         // Request was made but no response
//         errorMessage = "Unable to connect to server. Please check your internet connection.";
//       }

//       // Error state
//       setSubmitStatus("error");
//       setSubmitMessage(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
//       <h3 className="text-white text-2xl font-semibold mb-2">
//         Get in Touch
//       </h3>
//       <p className="text-slate-400 text-sm mb-6">
//         Fill out the form and we'll get back to you within 24 hours
//       </p>

//       {/* Status Messages */}
//       {submitStatus === "success" && (
//         <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
//           <div className="flex items-center gap-3 text-green-400">
//             <FiCheckCircle className="w-5 h-5" />
//             <span>{submitMessage}</span>
//           </div>
//         </div>
//       )}

//       {submitStatus === "error" && (
//         <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
//           <div className="flex items-center gap-3 text-red-400">
//             <FiAlertCircle className="w-5 h-5" />
//             <span>{submitMessage}</span>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Field */}
//         <div>
//           <div className="relative">
//             <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name *"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
//                 errors.name
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.name && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
//           )}
//         </div>

//         {/* Email Field */}
//         <div>
//           <div className="relative">
//             <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address *"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
//                 errors.email
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Phone Field */}
//         <div>
//           <div className="relative">
//             <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number *"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
//                 errors.phone
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.phone && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
//           )}
//         </div>

//         {/* Message Field */}
//         <div>
//           <div className="relative">
//             <FiMessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
//             <textarea
//               name="message"
//               placeholder="Tell us about your project or inquiry *"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
//                 errors.message
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.message && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>
//           )}
//         </div>

//         {/* I'm not a robot Checkbox */}
//         <div className="pt-2">
//           <div className={`p-4 bg-slate-900/30 border rounded-lg transition-colors ${checkboxError ? 'border-red-500/50' : 'border-slate-700'}`}>
//             <label className="flex items-center gap-3 cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   checked={isRobot}
//                   onChange={handleCheckboxChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${
//                   isRobot
//                     ? 'bg-amber-500 border-amber-500'
//                     : 'bg-slate-800 border-slate-600'
//                 }`}>
//                   {isRobot && (
//                     <FiCheck className="w-3 h-3 text-white" />
//                   )}
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">I'm not a robot</span>
//                   <div className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   </div>
//                 </div>
//                 <p className="text-slate-400 text-xs mt-1">
//                   Please check this box to confirm you are human and help prevent spam
//                 </p>
//               </div>
//             </label>
//           </div>
//           {checkboxError && (
//             <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
//               <FiAlertCircle className="w-3 h-3" />
//               {checkboxError}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//             isSubmitting
//               ? "opacity-70 cursor-not-allowed"
//               : "hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/50 hover:transform hover:scale-105"
//           }`}
//         >
//           {isSubmitting ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               <span>Sending...</span>
//             </>
//           ) : (
//             <>
//               <FiSend />
//               <span>Send Message</span>
//             </>
//           )}
//         </button>

//         <p className="text-slate-500 text-xs text-center mt-4">
//           By submitting, you agree to our privacy policy. We'll never share your information.
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

import React, { useState } from "react";
import {
  FiMail,
  FiUser,
  FiPhone,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiCheck,
  FiX,
} from "react-icons/fi";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isRobot, setIsRobot] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const API_URL = "http://localhost:8000/api";

  // Comprehensive name validation function
  const validateName = (name) => {
    const nameStr = name.trim();

    if (!nameStr) {
      return "Name is required";
    }

    // Check for minimum length
    if (nameStr.length < 2) {
      return "Name must be at least 2 characters";
    }

    // Check for maximum length
    if (nameStr.length > 50) {
      return "Name cannot exceed 50 characters";
    }

    // Check for numbers
    if (/\d/.test(nameStr)) {
      return "Name cannot contain numbers";
    }

    // Check for special characters (allow spaces, hyphens, apostrophes for names like Mary-Jane or O'Connor)
    if (/[^a-zA-Z\s\-']/.test(nameStr)) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Check for consecutive special characters
    if (/[\-\s']{2,}/.test(nameStr)) {
      return "Name cannot have consecutive special characters";
    }

    // Check if name starts or ends with special character
    if (/^[\-\s']/.test(nameStr) || /[\-\s']$/.test(nameStr)) {
      return "Name cannot start or end with a special character";
    }

    // Check for valid name format (at least one letter)
    if (!/[a-zA-Z]/.test(nameStr)) {
      return "Name must contain at least one letter";
    }

    return null; // No error
  };

  // Comprehensive email validation function
  const validateEmail = (email) => {
    const emailStr = email.trim();

    if (!emailStr) {
      return "Email address is required";
    }

    // Check for multiple @ symbols
    if ((emailStr.match(/@/g) || []).length > 1) {
      return "Email address can only contain one @ symbol";
    }

    // Split email into local and domain parts
    const parts = emailStr.split("@");

    // Must have exactly one @ symbol
    if (parts.length !== 2) {
      return "Please enter a valid email address (name@domain.com)";
    }

    const [localPart, domainPart] = parts;

    // Check local part (before @)
    if (!localPart) {
      return "Email address must have a local part (before @)";
    }

    // Local part cannot start or end with a dot
    if (localPart.startsWith(".") || localPart.endsWith(".")) {
      return "Email address cannot start or end with a dot";
    }

    // Local part cannot have consecutive dots
    if (localPart.includes("..")) {
      return "Email address cannot have consecutive dots";
    }

    // Local part validation (allow letters, digits, and special characters like . _ % + -)
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
      return "Email address contains invalid characters";
    }

    // Check domain part (after @)
    if (!domainPart) {
      return "Email address must have a domain part (after @)";
    }

    // Domain cannot start or end with a dot or hyphen
    if (
      domainPart.startsWith(".") ||
      domainPart.startsWith("-") ||
      domainPart.endsWith(".") ||
      domainPart.endsWith("-")
    ) {
      return "Domain name is invalid";
    }

    // Domain cannot have consecutive dots
    if (domainPart.includes("..")) {
      return "Domain name cannot have consecutive dots";
    }

    // Split domain into parts
    const domainParts = domainPart.split(".");

    // Domain must have at least one dot
    if (domainParts.length < 2) {
      return "Domain name must contain a period (e.g., domain.com)";
    }

    // Check each domain part
    for (let i = 0; i < domainParts.length; i++) {
      const part = domainParts[i];

      // Each part must not be empty
      if (!part) {
        return "Domain name contains empty parts";
      }

      // Each part must not start or end with hyphen
      if (part.startsWith("-") || part.endsWith("-")) {
        return "Domain parts cannot start or end with a hyphen";
      }

      // Each part should only contain letters, digits, and hyphens
      if (!/^[a-zA-Z0-9-]+$/.test(part)) {
        return "Domain name contains invalid characters";
      }
    }

    // Last part (TLD) must be at least 2 characters
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return "Top-level domain must be at least 2 characters";
    }

    // TLD should only contain letters
    if (!/^[a-zA-Z]+$/.test(tld)) {
      return "Top-level domain can only contain letters";
    }

    // Check email length
    if (emailStr.length > 254) {
      return "Email address is too long";
    }

    // Check local part length
    if (localPart.length > 64) {
      return "Local part of email is too long";
    }

    // Final comprehensive regex check
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(emailStr)) {
      return "Please enter a valid email address";
    }

    return null; // No error
  };

  // Function to validate phone number
  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");

    if (!digitsOnly) {
      return "Phone number is required";
    }

    // Check if contains only digits
    if (!/^\d+$/.test(digitsOnly)) {
      return "Phone number should contain only digits (0-9)";
    }

    // Check minimum length (10 digits for most phone numbers)
    if (digitsOnly.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    // Check maximum length (15 digits)
    if (digitsOnly.length > 15) {
      return "Phone number cannot exceed 15 digits";
    }

    return null; // No error
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name using comprehensive function
    const nameError = validateName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
    }

    // Validate email using comprehensive function
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }

    // Validate phone using new function
    const phoneError = validatePhoneNumber(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    // Check if robot checkbox is checked
    if (!isRobot) {
      setCheckboxError("Please confirm you are not a robot");
    } else {
      setCheckboxError("");
    }

    return newErrors;
  };

  // Format phone number for display
  const formatPhoneNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");

    // Don't format if empty or too short
    if (digitsOnly.length === 0) return "";

    // Limit to 15 digits
    const limitedDigits = digitsOnly.slice(0, 15);

    // Format based on length
    if (limitedDigits.length <= 3) {
      return limitedDigits;
    } else if (limitedDigits.length <= 6) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    } else if (limitedDigits.length <= 10) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
        3,
        6
      )}-${limitedDigits.slice(6, 10)}`;
    } else {
      // For numbers longer than 10 digits (international/extensions)
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
        3,
        6
      )}-${limitedDigits.slice(6, 10)} x${limitedDigits.slice(10)}`;
    }
  };

  // Format name (capitalize first letter of each word)
  const formatName = (value) => {
    // Remove numbers and invalid special characters
    const cleaned = value.replace(/[^a-zA-Z\s\-']/g, "");

    // Capitalize first letter of each word
    return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Special handling for name field
    if (name === "name") {
      // Remove numbers and invalid characters
      const cleaned = value.replace(/[^a-zA-Z\s\-']/g, "");

      // Prevent consecutive special characters
      const noConsecutiveSpecial = cleaned.replace(/([\-\s'])\1+/g, "$1");

      // Format name (capitalize first letter of each word)
      newValue = noConsecutiveSpecial;

      // Clear error for this field when user starts typing
      if (errors.name) {
        setErrors((prev) => ({
          ...prev,
          name: "",
        }));
      }
    }
    // Special handling for phone field
    else if (name === "phone") {
      // Only allow digits and basic formatting characters
      // Remove everything except digits, parentheses, spaces, hyphens
      const cleaned = value.replace(/[^\d\s\(\)-]/g, "");

      // Extract digits only to check length
      const digitsOnly = cleaned.replace(/\D/g, "");

      // If digits exceed 15, truncate
      if (digitsOnly.length > 15) {
        // Keep only first 15 digits
        const truncatedDigits = digitsOnly.slice(0, 15);
        // Reformat with the truncated digits
        newValue = formatPhoneNumber(truncatedDigits);
      } else {
        // Format normally
        newValue = formatPhoneNumber(cleaned);
      }

      // Clear error for this field when user starts typing
      if (errors.phone) {
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }
    }
    // Special handling for email field
    else if (name === "email") {
      // Convert to lowercase for consistency
      newValue = value.toLowerCase();

      // Check if email is valid in real-time
      const emailError = validateEmail(newValue);
      if (emailError) {
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
      }

      // Clear error for this field when user starts typing
      if (errors.email) {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for other fields when user starts typing
    if (
      errors[name] &&
      name !== "name" &&
      name !== "phone" &&
      name !== "email"
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle name blur for validation and formatting
  const handleNameBlur = () => {
    if (formData.name.trim()) {
      // Format name on blur
      const formattedName = formatName(formData.name);
      setFormData((prev) => ({
        ...prev,
        name: formattedName,
      }));

      // Validate name
      const nameError = validateName(formattedName);
      if (nameError) {
        setErrors((prev) => ({
          ...prev,
          name: nameError,
        }));
      }
    }
  };

  // Handle email blur for validation
  const handleEmailBlur = () => {
    if (formData.email.trim()) {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        setErrors((prev) => ({
          ...prev,
          email: emailError,
        }));
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
      }
    }
  };

  // Handle phone blur for validation
  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      const phoneError = validatePhoneNumber(formData.phone);
      if (phoneError) {
        setErrors((prev) => ({
          ...prev,
          phone: phoneError,
        }));
      }
    }
  };

  // Clear name field
  const clearName = () => {
    setFormData((prev) => ({
      ...prev,
      name: "",
    }));
    if (errors.name) {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  // Clear email field
  const clearEmail = () => {
    setFormData((prev) => ({
      ...prev,
      email: "",
    }));
    setIsEmailValid(false);
    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setIsRobot(e.target.checked);
    if (checkboxError && e.target.checked) {
      setCheckboxError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    // Check checkbox separately
    if (!isRobot) {
      setCheckboxError("Please confirm you are not a robot");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      // Clean phone number before sending (remove all non-digit characters)
      const cleanedPhone = formData.phone.replace(/\D/g, "");

      const response = await axios.post(`${API_URL}/contact/submit`, {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: cleanedPhone,
        message: formData.message.trim(),
      });

      if (response.data.success) {
        // Success state
        setSubmitStatus("success");
        setSubmitMessage(
          response.data.message ||
            "Thank you! Your message has been sent successfully. We will contact you within 24 hours."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsEmailValid(false);
        setIsRobot(false);
        setErrors({});
        setCheckboxError("");

        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
          setSubmitMessage("");
        }, 5000);
      } else {
        // API returned error
        setSubmitStatus("error");
        setSubmitMessage(
          response.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      let errorMessage =
        "Oops! Something went wrong. Please try again or contact us directly at info@securenet-services.com";

      if (error.response) {
        // Server responded with error
        if (error.response.data.errors) {
          // Validation errors from server
          const serverErrors = {};
          error.response.data.errors.forEach((err) => {
            if (err.includes("Name")) serverErrors.name = err;
            else if (err.includes("Email")) serverErrors.email = err;
            else if (err.includes("Phone")) serverErrors.phone = err;
            else if (err.includes("Message")) serverErrors.message = err;
          });
          setErrors(serverErrors);
          errorMessage = "Please check the form for errors.";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        // Request was made but no response
        errorMessage =
          "Unable to connect to server. Please check your internet connection.";
      }

      // Error state
      setSubmitStatus("error");
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-white text-2xl font-semibold mb-2">Get in Touch</h3>
      <p className="text-slate-400 text-sm mb-6">
        Fill out the form and we'll get back to you within 24 hours
      </p>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-3 text-green-400">
            <FiCheckCircle className="w-5 h-5" />
            <span>{submitMessage}</span>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-3 text-red-400">
            <FiAlertCircle className="w-5 h-5" />
            <span>{submitMessage}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleNameBlur}
              className={`w-full pl-12 ${
                formData.name ? "pr-10" : "pr-4"
              } py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
            />
            {formData.name && (
              <button
                type="button"
                onClick={clearName}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
          {errors.name ? (
            <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
              <FiAlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          ) : (
            <p className="text-slate-500 text-xs mt-1 ml-1">
              Enter your full name (letters only, no numbers)
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              className={`w-full pl-12 ${
                formData.email ? "pr-10" : "pr-4"
              } py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-500"
                  : isEmailValid && formData.email
                  ? "border-green-500 focus:border-green-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
            />
            {formData.email && (
              <button
                type="button"
                onClick={clearEmail}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
            {isEmailValid && formData.email && !errors.email && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500">
                <FiCheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          {errors.email ? (
            <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
              <FiAlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          ) : (
            <p className="text-slate-500 text-xs mt-1 ml-1">
              Enter a valid email address (e.g., name@example.com)
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number * (e.g., (123) 456-7890)"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handlePhoneBlur}
              className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.phone
                  ? "border-red-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
              maxLength="25" // For formatted display
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            {errors.phone ? (
              <p className="text-red-500 text-xs ml-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            ) : (
              <p className="text-slate-500 text-xs ml-1">
                Enter digits only. Auto-formats as you type.
              </p>
            )}
            <p className="text-slate-500 text-xs mr-1">
              {formData.phone.replace(/\D/g, "").length}/15 digits
            </p>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <div className="relative">
            <FiMessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            <textarea
              name="message"
              placeholder="Tell us about your project or inquiry *"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                errors.message
                  ? "border-red-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>
          )}
        </div>

        {/* I'm not a robot Checkbox */}
        <div className="pt-2">
          <div
            className={`p-4 bg-slate-900/30 border rounded-lg transition-colors ${
              checkboxError ? "border-red-500/50" : "border-slate-700"
            }`}
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isRobot}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${
                    isRobot
                      ? "bg-amber-500 border-amber-500"
                      : "bg-slate-800 border-slate-600"
                  }`}
                >
                  {isRobot && <FiCheck className="w-3 h-3 text-white" />}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    I'm not a robot
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  Please check this box to confirm you are human and help
                  prevent spam
                </p>
              </div>
            </label>
          </div>
          {checkboxError && (
            <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
              <FiAlertCircle className="w-3 h-3" />
              {checkboxError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/50 hover:transform hover:scale-105"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FiSend />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-slate-500 text-xs text-center mt-4">
          By submitting, you agree to our privacy policy. We'll never share your
          information.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;

// import React, { useState } from "react";
// import {
//   FiMail,
//   FiUser,
//   FiPhone,
//   FiMessageSquare,
//   FiSend,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiCheck,
// } from "react-icons/fi";
// import emailjs from "@emailjs/browser";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [isRobot, setIsRobot] = useState(false); // State for checkbox
//   const [checkboxError, setCheckboxError] = useState("");

//   // EmailJS Configuration
//   const SERVICE_ID = "YOUR_SERVICE_ID"; // Get from EmailJS
//   const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Get from EmailJS
//   const PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Get from EmailJS

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (formData.name.length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (
//       !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ""))
//     ) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required";
//     } else if (formData.message.length < 10) {
//       newErrors.message = "Message must be at least 10 characters";
//     }

//     // Check if robot checkbox is checked
//     if (!isRobot) {
//       setCheckboxError("Please confirm you are not a robot");
//     } else {
//       setCheckboxError("");
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     setIsRobot(e.target.checked);
//     if (checkboxError && e.target.checked) {
//       setCheckboxError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();

//     // Check checkbox separately
//     if (!isRobot) {
//       setCheckboxError("Please confirm you are not a robot");
//       return;
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);
//     setSubmitMessage("");

//     try {
//       const templateParams = {
//         from_name: formData.name,
//         from_email: formData.email,
//         phone: formData.phone,
//         message: formData.message,

//         to_email: "info@securenet-services.com",
//         date: new Date().toLocaleDateString(),
//         time: new Date().toLocaleTimeString(),
//         is_robot_verified: isRobot ? "Yes" : "No",
//       };

//       // Send email using EmailJS
//       const response = await emailjs.send(
//         SERVICE_ID,
//         TEMPLATE_ID,
//         templateParams,
//         PUBLIC_KEY
//       );

//       console.log("Email sent successfully:", response);

//       // Success state
//       setSubmitStatus("success");
//       setSubmitMessage(
//         "Thank you! Your message has been sent successfully. We will contact you within 24 hours."
//       );

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         message: "",
//         service: "",
//       });
//       setIsRobot(false);
//       setErrors({});
//       setCheckboxError("");

//       // Auto-clear success message after 5 seconds
//       setTimeout(() => {
//         setSubmitStatus(null);
//         setSubmitMessage("");
//       }, 5000);
//     } catch (error) {
//       console.error("Error sending email:", error);

//       // Error state
//       setSubmitStatus("error");
//       setSubmitMessage(
//         "Oops! Something went wrong. Please try again or contact us directly at info@securenet-services.com"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
//       <h3 className="text-white text-2xl font-semibold mb-2">
//         Get a Free Quote
//       </h3>
//       <p className="text-slate-400 text-sm mb-6">
//         Fill out the form and we'll get back to you within 24 hours
//       </p>

//       {/* Status Messages */}
//       {submitStatus === "success" && (
//         <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
//           <div className="flex items-center gap-3 text-green-400">
//             <FiCheckCircle className="w-5 h-5" />
//             <span>{submitMessage}</span>
//           </div>
//         </div>
//       )}

//       {submitStatus === "error" && (
//         <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
//           <div className="flex items-center gap-3 text-red-400">
//             <FiAlertCircle className="w-5 h-5" />
//             <span>{submitMessage}</span>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Field */}
//         <div>
//           <div className="relative">
//             <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name *"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
//                 errors.name
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.name && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
//           )}
//         </div>

//         {/* Email Field */}
//         <div>
//           <div className="relative">
//             <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address *"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
//                 errors.email
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Phone Field */}
//         <div>
//           <div className="relative">
//             <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number *"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
//                 errors.phone
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.phone && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
//           )}
//         </div>

//         <div>
//           <div className="relative">
//             <FiMessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
//             <textarea
//               name="message"
//               placeholder="Tell us about your project or inquiry *"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
//                 errors.message
//                   ? "border-red-500"
//                   : "border-slate-600 focus:border-amber-500"
//               }`}
//             />
//           </div>
//           {errors.message && (
//             <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>
//           )}
//         </div>
//         <div className="pt-2">
//           <div className={`p-4 bg-slate-900/30 border rounded-lg transition-colors ${checkboxError ? 'border-red-500/50' : 'border-slate-700'}`}>
//             <label className="flex items-center gap-3 cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   checked={isRobot}
//                   onChange={handleCheckboxChange}
//                   className="sr-only"
//                 />
//                 <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${
//                   isRobot
//                     ? 'bg-amber-500 border-amber-500'
//                     : 'bg-slate-800 border-slate-600'
//                 }`}>
//                   {isRobot && (
//                     <FiCheck className="w-3 h-3 text-white" />
//                   )}
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">I'm not a robot</span>
//                   <div className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   </div>
//                 </div>
//                 <p className="text-slate-400 text-xs mt-1">
//                   Please check this box to confirm you are human and help prevent spam
//                 </p>
//               </div>
//             </label>
//           </div>
//           {checkboxError && (
//             <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
//               <FiAlertCircle className="w-3 h-3" />
//               {checkboxError}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//             isSubmitting
//               ? "opacity-70 cursor-not-allowed"
//               : "hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/50 hover:transform hover:scale-105"
//           }`}
//         >
//           {isSubmitting ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               <span>Sending...</span>
//             </>
//           ) : (
//             <>
//               <FiSend />
//               <span>Send Message</span>
//             </>
//           )}
//         </button>

//         <p className="text-slate-500 text-xs text-center mt-4">
//           By submitting, you agree to our privacy policy. We'll never share your information.
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

// components/ContactForm.jsx
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

  // API endpoint
  const API_URL = "http://localhost:8000/api";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
      const response = await axios.post(`${API_URL}/contact/submit`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (response.data.success) {
        // Success state
        setSubmitStatus("success");
        setSubmitMessage(response.data.message || "Thank you! Your message has been sent successfully. We will contact you within 24 hours.");

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
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
        setSubmitMessage(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      let errorMessage = "Oops! Something went wrong. Please try again or contact us directly at info@securenet-services.com";
      
      if (error.response) {
        // Server responded with error
        if (error.response.data.errors) {
          // Validation errors from server
          const serverErrors = {};
          error.response.data.errors.forEach(err => {
            if (err.includes('Name')) serverErrors.name = err;
            else if (err.includes('Email')) serverErrors.email = err;
            else if (err.includes('Phone')) serverErrors.phone = err;
            else if (err.includes('Message')) serverErrors.message = err;
          });
          setErrors(serverErrors);
          errorMessage = "Please check the form for errors.";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        // Request was made but no response
        errorMessage = "Unable to connect to server. Please check your internet connection.";
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
      <h3 className="text-white text-2xl font-semibold mb-2">
        Get in Touch
      </h3>
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
              className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
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
              className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.phone
                  ? "border-red-500"
                  : "border-slate-600 focus:border-amber-500"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
          )}
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
          <div className={`p-4 bg-slate-900/30 border rounded-lg transition-colors ${checkboxError ? 'border-red-500/50' : 'border-slate-700'}`}>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isRobot}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${
                  isRobot 
                    ? 'bg-amber-500 border-amber-500' 
                    : 'bg-slate-800 border-slate-600'
                }`}>
                  {isRobot && (
                    <FiCheck className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">I'm not a robot</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  Please check this box to confirm you are human and help prevent spam
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
          By submitting, you agree to our privacy policy. We'll never share your information.
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
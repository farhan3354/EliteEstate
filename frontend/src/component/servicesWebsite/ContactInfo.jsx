// components/ContactInfo.jsx
import React from "react";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <FiPhone className="w-5 h-5" />,
      title: "Call Us",
      content: "+971 50 901 4421",
      link: "tel:+971509014421",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      title: "WhatsApp",
      content: "Chat with us",
      link: "https://wa.me/971509014421",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      title: "Email",
      content: "info@securenet-services.com",
      link: "mailto:info@securenet-services.com",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      title: "Working Hours",
      content: "Mon - Sat: 8:00 AM - 8:00 PM",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      {contactInfo.map((item, index) => (
        <a
          key={index}
          href={item.link || "#"}
          target={item.link?.startsWith("http") ? "_blank" : "_self"}
          rel={item.link?.startsWith("http") ? "noopener noreferrer" : ""}
          className={`block p-5 bg-gradient-to-br ${item.color} rounded-xl hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>
            <div className="text-left">
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-white/90 text-sm mt-1">{item.content}</p>
            </div>
          </div>
        </a>
      ))}

      {/* Quick Response Info */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mt-8">
        <div className="flex items-start gap-3">
          <FiMessageSquare className="w-5 h-5 text-amber-500 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Response</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Emergency Service: 24/7 Available</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Response Time: Within 1 Hour</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Free Consultation & Quote</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

// // components/ContactInfo.jsx
// import React from "react";
// import { FiPhone, FiMail } from "react-icons/fi";

// const ContactInfo = () => {
//   return (
//     <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 flex flex-col justify-center">
//       <p className="text-slate-400 text-sm mb-3">
//         Call us for immediate assistance
//       </p>

//       <a
//         href="tel:+971509014421"
//         className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 mb-4"
//       >
//         <FiPhone className="w-5 h-5" />
//         <span>+971 50 901 4421</span>
//       </a>

//       <a
//         href="mailto:info@securenet-services.com"
//         className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-amber-500 font-semibold rounded-lg transition-all duration-300"
//       >
//         <FiMail className="w-4 h-4" />
//         <span>info@securenet-services.com</span>
//       </a>
//     </div>
//   );
// };

// export default ContactInfo;

// components/Services.jsx
import React from "react";
import {
  FiGlobe,
  FiKey,
  FiWifi,
  FiZap,
  FiThermometer,
  FiHome,
} from "react-icons/fi";

const Services = () => {
  const services = [
    {
      icon: <FiKey className="w-10 h-10" />,
      title: "Access Control & Attendance Systems",
      description: "Security and time management solutions",
      color: "text-amber-500",
    },
    {
      icon: <FiWifi className="w-10 h-10" />,
      title: "Computer Networks",
      description: "Infrastructure, installation and maintenance",
      color: "text-amber-500",
    },
    {
      icon: <FiZap className="w-10 h-10" />,
      title: "Electrical Systems",
      description: "Fitting, fixture and maintenance",
      color: "text-orange-500",
    },
    {
      icon: <FiThermometer className="w-10 h-10" />,
      title: "HVAC Systems",
      description: "Installation and maintenance",
      color: "text-amber-600",
    },
    {
      icon: <FiHome className="w-10 h-10" />,
      title: "Complete Solutions",
      description: "Everything to build your home",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
          >
            <div
              className={`${service.color} mx-auto mb-4 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              {service.icon}
            </div>
            <h3 className="text-white font-semibold mb-2 text-center text-sm">
              {service.title}
            </h3>
            <p className="text-slate-400 text-xs text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

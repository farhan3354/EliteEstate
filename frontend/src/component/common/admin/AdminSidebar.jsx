import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin-dashboard/users", label: "Users", icon: "👥" },
    { path: "/admin-dashboard/owners", label: "Owners", icon: "🤵" },
    { path: "/admin-dashboard/agents", label: "Agents", icon: "🤵" },
    { path: "/admin-dashboard/properties", label: "Properties", icon: "🏠" },
    { path: "/admin-dashboard/properties/pending", label: "Pending Properties", icon: "⏳" },
    { path: "/admin-dashboard/bookings", label: "Viewings", icon: "📅" },
    { path: "/admin-dashboard/reviews", label: "Reviews", icon: "⭐" },
    { path: "/admin-dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-gray-800 text-white ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700"
        >
          {isOpen ? "◀" : "▶"}
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive(item.path) ? "bg-blue-600 text-white" : ""
            }`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <span className="text-lg mr-3">🏠</span>
          {isOpen && <span>Back to Site</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;

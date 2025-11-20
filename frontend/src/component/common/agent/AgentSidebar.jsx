import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPlus,
  FiList,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiBarChart,
  FiUser,
  FiSettings,
  FiLogOut,
  FiX,
} from "react-icons/fi";

const AgentSidebar = ({ isOpen, onClose, user }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/agent", icon: FiHome, label: "Dashboard" },
    { path: "/agent/listings", icon: FiList, label: "My Listings" },
    { path: "/agent/add-property", icon: FiPlus, label: "Add Property" },
    { path: "/agent/clients", icon: FiUsers, label: "Clients" },
    { path: "/agent/schedule", icon: FiCalendar, label: "Schedule" },
    { path: "/agent/inquiries", icon: FiMessageSquare, label: "Inquiries" },
    { path: "/agent/performance", icon: FiBarChart, label: "Performance" },
    { path: "/agent/profile", icon: FiUser, label: "Profile" },
    { path: "/agent/settings", icon: FiSettings, label: "Settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Agent Portal</h1>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {user.initials}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.role}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 w-full transition-colors duration-200">
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentSidebar;

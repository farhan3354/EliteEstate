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
  FiEye,
  FiBookmark,
} from "react-icons/fi";

const AgentSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: FiBarChart,
      path: "/agent",
      badge: null,
    },
    {
      title: "Add Property",
      icon: FiPlus,
      path: "/agent/add-property",
      badge: null,
    },
    {
      title: "My Listings",
      icon: FiList,
      path: "/agent/listings",
      badge: "8",
    },
    {
      title: "Clients",
      icon: FiUsers,
      path: "/agent/clients",
      badge: "15",
    },
    {
      title: "Schedule",
      icon: FiCalendar,
      path: "/agent/schedule",
      badge: "3",
    },
    {
      title: "Inquiries",
      icon: FiMessageSquare,
      path: "/agent/inquiries",
      badge: "12",
    },
    {
      title: "Performance",
      icon: FiBarChart,
      path: "/agent/performance",
      badge: null,
    },
    {
      title: "Profile",
      icon: FiUser,
      path: "/agent/profile",
      badge: null,
    },
    {
      title: "Settings",
      icon: FiSettings,
      path: "/agent/settings",
      badge: null,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <aside className="lg:w-64 w-20 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-0 overflow-y-auto transition-all duration-300">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center lg:space-x-3 justify-center lg:justify-start">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-200"
              />
              <div className="hidden lg:block">
                <div className="font-semibold text-gray-800">farhan</div>
                <div className="text-sm text-gray-500">Agent</div>
              </div>
            </div>
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <FiX className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center rounded-lg transition-all duration-200 group relative
                    lg:justify-between lg:px-4 lg:py-3 justify-center p-3
                    ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 lg:border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }
                  `}
                >
                  <div className="flex items-center lg:space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="hidden lg:block font-medium">
                      {item.title}
                    </span>
                  </div>
                  {item.badge && (
                    <>
                      <span className="hidden lg:block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                        {item.badge}
                      </span>
                      <span className="lg:hidden absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    </>
                  )}
                  <div className="lg:hidden absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                    {item.title}
                    {item.badge && ` (${item.badge})`}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 lg:p-4 p-3 bg-gray-50 rounded-lg">
            <div className="hidden lg:block">
              <h3 className="font-semibold text-gray-800 mb-3">Agent Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listings</span>
                  <span className="font-semibold text-gray-800">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-800">1.2K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Clients</span>
                  <span className="font-semibold text-gray-800">15</span>
                </div>
              </div>
            </div>
            <div className="lg:hidden space-y-4 text-center">
              <div className="group relative">
                <div className="text-sm font-bold text-gray-800">24</div>
                <FiHome className="w-4 h-4 text-gray-600 mx-auto mt-1" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Listings
                </div>
              </div>
              <div className="group relative">
                <div className="text-sm font-bold text-gray-800">1.2K</div>
                <FiEye className="w-4 h-4 text-gray-600 mx-auto mt-1" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Views
                </div>
              </div>
              <div className="group relative">
                <div className="text-sm font-bold text-gray-800">15</div>
                <FiUsers className="w-4 h-4 text-gray-600 mx-auto mt-1" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Clients
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button className="flex items-center rounded-lg transition-all duration-200 group relative lg:justify-start justify-center lg:px-4 lg:py-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 w-full">
              <div className="flex items-center lg:space-x-3">
                <FiLogOut className="w-5 h-5" />
                <span className="hidden lg:block font-medium">Logout</span>
              </div>
              <div className="lg:hidden absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                Logout
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AgentSidebar;

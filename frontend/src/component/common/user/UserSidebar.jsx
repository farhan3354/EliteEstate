import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      path: "/user-dashboard",
      badge: null,
    },
    {
      title: "Add Property",
      icon: "➕",
      path: "/user-dashboard/add-property",
      badge: null,
    },
    {
      title: "My Properties",
      icon: "🏠",
      path: "/user-dashboard/my-properties",
      badge: "5",
    },
    {
      title: "Favorites",
      icon: "❤️",
      path: "/user-dashboard/favorites",
      badge: "12",
    },
    {
      title: "Bookings",
      icon: "📅",
      path: "/user-dashboard/bookings",
      badge: "3",
    },
    {
      title: "Profile",
      icon: "👤",
      path: "/user-dashboard/profile",
      badge: null,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-200"
            />
            <div>
              <div className="font-semibold text-gray-800">John Doe</div>
              <div className="text-sm text-gray-500">Property Agent</div>
            </div>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Properties</span>
                <span className="font-semibold text-gray-800">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Views</span>
                <span className="font-semibold text-gray-800">1.2K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bookings</span>
                <span className="font-semibold text-gray-800">18</span>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-blue-600 text-lg">💡</span>
            <span className="font-semibold text-blue-800">Need Help?</span>
          </div>
          <p className="text-sm text-blue-600 mb-3">
            Contact our support team for assistance
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Get Support
          </button>
        </div> */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

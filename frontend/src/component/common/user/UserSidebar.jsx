import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome,
  FiPlus,
  FiHeart,
  FiCalendar,
  FiUser,
  FiBarChart2,
  FiEye,
  FiBookmark
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: FiBarChart2,
      path: "/user-dashboard",
      badge: null,
    },
    {
      title: "Add Property",
      icon: FiPlus,
      path: "/user-dashboard/add-property",
      badge: null,
    },
    {
      title: "My Properties",
      icon: FiHome,
      path: "/user-dashboard/my-properties",
      badge: "5",
    },
    {
      title: "Favorites",
      icon: FiHeart,
      path: "/user-dashboard/favorites",
      badge: "12",
    },
    {
      title: "Bookings",
      icon: FiCalendar,
      path: "/user-dashboard/bookings",
      badge: "3",
    },
    {
      title: "Profile",
      icon: FiUser,
      path: "/user-dashboard/profile",
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
          <div className="flex items-center lg:space-x-3 justify-center lg:justify-start mb-8">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-200"
            />
            <div className="hidden lg:block">
              <div className="font-semibold text-gray-800">John Doe</div>
              <div className="text-sm text-gray-500">Property Agent</div>
            </div>
          </div>
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
                    <span className="hidden lg:block font-medium">{item.title}</span>
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
          <div className="mt-8 lg:p-4 p-3 bg-gray-50 rounded-lg">
            <div className="hidden lg:block">
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
            <div className="lg:hidden space-y-4 text-center">
              <div className="group relative">
                <div className="text-sm font-bold text-gray-800">24</div>
                <FiHome className="w-4 h-4 text-gray-600 mx-auto mt-1" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Properties
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
                <div className="text-sm font-bold text-gray-800">18</div>
                <FiBookmark className="w-4 h-4 text-gray-600 mx-auto mt-1" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Bookings
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

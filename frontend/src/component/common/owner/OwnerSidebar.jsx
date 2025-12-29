import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiMessageSquare,
  FiUsers,
  FiUser,
  FiLogOut,
  FiX,
  FiDollarSign,
  FiTool,
  FiFileText,
  FiBarChart2,
} from "react-icons/fi";
import { MdApartment } from "react-icons/md";

const OwnerSidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: "", label: "Dashboard", icon: <FiHome className="h-5 w-5" /> },
    {
      path: "my-properties",
      label: "My Properties",
      icon: <MdApartment className="h-5 w-5" />,
    },
    {
      path: "add-property",
      label: "Add Property",
      icon: <FiPlusCircle className="h-5 w-5" />,
    },
    {
      path: "inquiries",
      label: "Inquiries",
      icon: <FiMessageSquare className="h-5 w-5" />,
      badge: 5,
    },
    {
      path: "assign-agent",
      label: "Assign Agent",
      icon: <FiUsers className="h-5 w-5" />,
    },
    {
      path: "assigned-agents",
      label: "Assigned Agents",
      icon: <FiUsers className="h-5 w-5" />,
    },
    // {
    //   path: "tenant-management",
    //   label: "Tenant Management",
    //   icon: <FiUser className="h-5 w-5" />,
    // },
    // {
    //   path: "rent-collection",
    //   label: "Rent Collection",
    //   icon: <FiDollarSign className="h-5 w-5" />,
    //   badge: 2,
    // },
    // {
    //   path: "maintenance",
    //   label: "Maintenance",
    //   icon: <FiTool className="h-5 w-5" />,
    // },
    // {
    //   path: "documents",
    //   label: "Documents",
    //   icon: <FiFileText className="h-5 w-5" />,
    // },
    // {
    //   path: "financials",
    //   label: "Financials",
    //   icon: <FiBarChart2 className="h-5 w-5" />,
    // },
  ];

  const accountItems = [
    { path: "profile", label: "Profile", icon: <FiUser className="h-5 w-5" /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:inset-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                Main Menu
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === ""}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className={`${item.badge ? "relative" : ""}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                Account
              </h3>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    console.log("Logout clicked");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-2"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </nav>
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Total Properties</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 p-2 rounded">
                <div className="text-sm font-medium text-green-800">12</div>
                <div className="text-xs text-green-600">Active</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-sm font-medium text-blue-800">5</div>
                <div className="text-xs text-blue-600">With Agent</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <style jsx>{`
        /* Custom scrollbar for sidebar */
        nav::-webkit-scrollbar {
          width: 6px;
        }
        nav::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        nav::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
};

export default OwnerSidebar;

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiHome,
  FiSearch,
  FiHeart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiPlus,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { logout } from "../../redux/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/properties", label: "Browse", icon: FiSearch },
    { path: "/about", label: "About", icon: FcAbout },
    { path: "/contact", label: "Contact", icon: FiMail },
    { path: "/agents", label: "Agents", icon: FiBriefcase },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <FiHome className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent leading-tight">
                EstateElite
              </span>
              <span className="text-xs text-blue-400 -mt-0.5 font-medium">
                Premium Properties
              </span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 font-medium text-sm ${
                    isActiveRoute(item.path)
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-500 border border-blue-200 shadow-sm"
                      : "text-gray-700 hover:text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => navigate("/become-agent")}
              className="flex items-center space-x-1 sm:space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-xs sm:text-sm"
            >
              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Become Agent</span>
              <span className="xs:hidden">Agent</span>
            </button>
            {isAuthenticated ? (
              <div className="relative">
                <button className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-xl hover:bg-blue-50 transition-colors duration-200 border border-blue-200">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-16 sm:max-w-24 truncate">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 sm:space-x-2 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-300 font-medium shadow-sm text-xs sm:text-sm"
                >
                  <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Login</span>
                  <span className="xs:hidden">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-xs sm:text-sm"
                >
                  <span className="hidden xs:inline">Sign Up</span>
                  <span className="xs:hidden">Join</span>
                </Link>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
            >
              {isMenuOpen ? (
                <>
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </>
              ) : (
                <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-100 py-3 bg-gradient-to-b from-white to-blue-50">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                      isActiveRoute(item.path)
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="border-t border-blue-100 pt-3">
                <button
                  onClick={() => {
                    navigate("/become-agent");
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Become Agent</span>
                </button>
                {!isAuthenticated && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-xl transition-all duration-300 font-medium text-sm"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg text-sm"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="space-y-2 mt-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/my-properties"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      <FiHome className="w-4 h-4" />
                      <span>My Properties</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors duration-200 text-sm"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

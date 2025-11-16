// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   FiHome,
//   FiSearch,
//   FiHeart,
//   FiUser,
//   FiLogOut,
//   FiMenu,
//   FiX,
//   FiPlus,
//   FiBell,
//   FiMessageSquare,
// } from "react-icons/fi";
// import { logout } from "../../redux/slices/authSlice";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const { user, token } = useSelector((state) => state.auth);
//   const isAuthenticated = !!token;

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsUserDropdownOpen(false);
//     navigate("/");
//   };

//   const isActiveRoute = (path) => {
//     return location.pathname === path;
//   };

//   const navItems = [
//     { path: "/", label: "Home", icon: FiHome },
//     { path: "/properties", label: "Browse", icon: FiSearch },
//     { path: "/favorites", label: "Favorites", icon: FiHeart },
//   ];

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-orange-100">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
//               <FiHome className="w-5 h-5 text-white" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
//                 EstateElite
//               </span>
//               <span className="text-xs text-orange-500 -mt-1 font-medium">
//                 Premium Properties
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
//                     isActiveRoute(item.path)
//                       ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 shadow-sm"
//                       : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => navigate("/add-property")}
//               className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
//             >
//               <FiPlus className="w-4 h-4" />
//               <span>List Property</span>
//             </button>

//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-xl hover:bg-orange-50 transition-colors duration-200 border border-orange-200"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
//                     {user?.name?.charAt(0)?.toUpperCase() || "U"}
//                   </div>
//                   <span className="hidden md:block text-sm font-medium text-gray-700 max-w-24 truncate">
//                     {user?.name?.split(" ")[0] || "User"}
//                   </span>
//                 </button>
//                 {isUserDropdownOpen && (
//                   <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-orange-100 py-2 z-50">
//                     <div className="px-4 py-3 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-orange-100">
//                       <p className="font-semibold text-gray-800 truncate">
//                         {user?.name}
//                       </p>
//                       <p className="text-sm text-orange-600 truncate">
//                         {user?.email}
//                       </p>
//                     </div>

//                     <div className="py-2">
//                       <Link
//                         to="/profile"
//                         onClick={() => setIsUserDropdownOpen(false)}
//                         className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
//                       >
//                         <FiUser className="w-4 h-4" />
//                         <span>My Profile</span>
//                       </Link>
//                       <Link
//                         to="/my-properties"
//                         onClick={() => setIsUserDropdownOpen(false)}
//                         className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
//                       >
//                         <FiHome className="w-4 h-4" />
//                         <span>My Properties</span>
//                       </Link>
//                       <Link
//                         to="/favorites"
//                         onClick={() => setIsUserDropdownOpen(false)}
//                         className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
//                       >
//                         <FiHeart className="w-4 h-4" />
//                         <span>Favorites</span>
//                       </Link>
//                     </div>

//                     <div className="border-t border-orange-100 pt-2">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
//                       >
//                         <FiLogOut className="w-4 h-4" />
//                         <span>Sign Out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link
//                   to="/login"
//                   className="hidden sm:flex items-center space-x-2 border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 font-medium shadow-sm"
//                 >
//                   <FiUser className="w-4 h-4" />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors duration-200"
//             >
//               {isMenuOpen ? (
//                 <FiX className="w-6 h-6" />
//               ) : (
//                 <FiMenu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-orange-100 py-4 bg-gradient-to-b from-white to-orange-50">
//             <nav className="flex flex-col space-y-2">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
//                       isActiveRoute(item.path)
//                         ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 shadow-sm"
//                         : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//               {!isAuthenticated && (
//                 <div className="flex flex-col space-y-2 pt-4 border-t border-orange-100">
//                   <Link
//                     to="/login"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center justify-center space-x-2 border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium"
//                   >
//                     <FiUser className="w-4 h-4" />
//                     <span>Login</span>
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg"
//                   >
//                     <span>Sign Up</span>
//                   </Link>
//                 </div>
//               )}
//               <button
//                 onClick={() => {
//                   navigate("/add-property");
//                   setIsMenuOpen(false);
//                 }}
//                 className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg mt-4"
//               >
//                 <FiPlus className="w-4 h-4" />
//                 <span>List Property</span>
//               </button>
//             </nav>
//           </div>
//         )}
//       </div>
//       {(isUserDropdownOpen || isMenuOpen) && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-10 z-40 lg:hidden"
//           onClick={() => {
//             setIsUserDropdownOpen(false);
//             setIsMenuOpen(false);
//           }}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

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
} from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { logout } from "../../redux/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
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
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <FiHome className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                EstateElite
              </span>
              <span className="text-xs text-blue-400 -mt-1 font-medium">
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
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

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/add-property")}
              className="hidden sm:flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              <FiPlus className="w-4 h-4" />
              <span>List Property</span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-blue-50 transition-colors duration-200 border border-blue-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 max-w-24 truncate">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-blue-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
                      <p className="font-semibold text-gray-800 truncate">
                        {user?.name}
                      </p>
                      <p className="text-sm text-blue-600 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <FiUser className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/my-properties"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <FiHome className="w-4 h-4" />
                        <span>My Properties</span>
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <FiHeart className="w-4 h-4" />
                        <span>Favorites</span>
                      </Link>
                    </div>

                    <div className="border-t border-blue-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center space-x-2 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 font-medium shadow-sm"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-100 py-4 bg-gradient-to-b from-white to-blue-50">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      isActiveRoute(item.path)
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-blue-100">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg"
                  >
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
              <button
                onClick={() => {
                  navigate("/add-property");
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg mt-4"
              >
                <FiPlus className="w-4 h-4" />
                <span>List Property</span>
              </button>
            </nav>
          </div>
        )}
      </div>
      {(isUserDropdownOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-40 lg:hidden"
          onClick={() => {
            setIsUserDropdownOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;

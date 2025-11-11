// components/Breadcrumbs.jsx
import React from "react";

const Breadcrumbs = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <nav className="flex items-center text-sm text-gray-500">
        <a href="/" className="flex items-center hover:text-blue-600">
          <img
            width="16px"
            height="16px"
            src="https://static.dubizzle.com/frontend-web/static-resources/assets/property-icons/home_icon.svg"
            alt="Home"
          />
        </a>
        <span className="mx-2">›</span>
        <a href="#" className="hover:text-blue-600">
          Real Estate for Rent
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">
          Properties for rent in Dubai
        </span>
      </nav>
    </div>
  );
};

export default Breadcrumbs;

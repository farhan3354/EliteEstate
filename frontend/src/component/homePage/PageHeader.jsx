// components/PageHeader.jsx
import React from "react";

const PageHeader = () => {
  return (
    <div className="bg-white px-4 py-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-semibold">
            Properties for Rent in Dubai
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500 text-lg">57,197 Ads</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
            <img
              className="w-4 h-4 mr-2"
              alt="Sort"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/sortIcon.svg"
            />
            Sort: Popular
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
            <img
              className="w-4 h-4 mr-2"
              alt="Save search"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/saveIcon.svg"
            />
            Save Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

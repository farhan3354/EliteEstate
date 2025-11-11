// components/FurnishingFilter.jsx
import React, { useState } from "react";

const FurnishingFilter = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="bg-white px-4 py-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex space-x-2 mb-3 md:mb-0">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === "All"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === "Furnished"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("Furnished")}
          >
            Furnished
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === "Unfurnished"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter("Unfurnished")}
          >
            Unfurnished
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Show Verified First</span>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="toggle"
              id="verified-toggle"
              className="sr-only"
            />
            <label
              htmlFor="verified-toggle"
              className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            >
              <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnishingFilter;

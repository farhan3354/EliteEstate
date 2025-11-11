// components/FilterBar.jsx
import React from "react";

const FilterBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Purpose Filter */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center">
            <button className="p-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <svg
                width="8"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M.59 10.59L5.17 6 .59 1.41 2 0l6 6-6 6-1.41-1.41z"
                  fill="#23262A"
                ></path>
              </svg>
            </button>
            <div className="font-medium">Purpose</div>
          </div>
          <button className="w-full text-left p-2 border border-gray-300 rounded-md flex justify-between items-center mt-1 hover:bg-gray-50">
            <div>
              <div className="text-xs text-gray-500">Purpose</div>
              <div className="flex items-center">
                <span className="text-gray-700">Rent</span>
              </div>
            </div>
            <img
              alt="toggle"
              className="w-4 h-4"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/iconDown.svg"
            />
          </button>
        </div>

        {/* Location Filter */}
        <div className="flex-1 min-w-[200px]">
          <div className="text-xs text-gray-500 mb-1">Location</div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter location"
              className="w-full p-2 border border-gray-300 rounded-md pr-10"
            />
            <img
              className="absolute right-3 top-2.5 w-5 h-5"
              alt="Search"
              src="https://static.dubizzle.com/frontend-web/listings/assets/homepage/location-on.svg"
            />
          </div>
        </div>

        {/* Property Type Filter */}
        <div className="flex-1 min-w-[150px]">
          <button className="w-full text-left p-2 border border-gray-300 rounded-md flex justify-between items-center hover:bg-gray-50">
            <div>
              <div className="text-xs text-gray-500">Property Type</div>
              <div className="text-gray-700">All in Residential</div>
            </div>
            <img
              alt="toggle"
              className="w-4 h-4"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/iconDown.svg"
            />
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="flex-1 min-w-[150px]">
          <button className="w-full text-left p-2 border border-gray-300 rounded-md flex justify-between items-center hover:bg-gray-50">
            <div>
              <div className="text-xs text-gray-500">Price Range</div>
              <div className="text-gray-700">Any</div>
            </div>
            <img
              alt="toggle"
              className="w-4 h-4"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/iconDown.svg"
            />
          </button>
        </div>

        {/* Beds Filter */}
        <div className="flex-1 min-w-[120px]">
          <button className="w-full text-left p-2 border border-gray-300 rounded-md flex justify-between items-center hover:bg-gray-50">
            <div>
              <div className="text-xs text-gray-500">Beds</div>
              <div className="text-gray-700">Any</div>
            </div>
            <img
              alt="toggle"
              className="w-4 h-4"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/iconDown.svg"
            />
          </button>
        </div>

        {/* More Filters */}
        <div className="flex-1 min-w-[150px]">
          <button className="w-full text-left p-2 border border-gray-300 rounded-md flex justify-between items-center hover:bg-gray-50">
            <div className="flex items-center">
              <svg
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M15.667 5.817V1.5A.833.833 0 1014 1.5v4.317a2.5 2.5 0 000 4.7V16.5a.834.834 0 001.667 0v-5.983a2.5 2.5 0 000-4.7zM14.834 9a.834.834 0 110-1.667.834.834 0 010 1.667zm-5 1.817V1.5a.833.833 0 00-1.667 0v9.317a2.5 2.5 0 000 4.7v.983a.833.833 0 001.667 0v-.983a2.5 2.5 0 000-4.7zM9 14a.833.833 0 110-1.666A.833.833 0 019 14zM4 4.15V1.5a.833.833 0 10-1.666 0v2.65a2.5 2.5 0 000 4.7v7.65A.833.833 0 004 16.5V8.85a2.5 2.5 0 000-4.7zm-.833 3.183a.833.833 0 110-1.666.833.833 0 010 1.666z"
                  fill="#6B7280"
                ></path>
              </svg>
              <div>
                <div className="text-xs text-gray-500">Filters</div>
                <div className="text-gray-700 text-sm">
                  Baths, Area / Size (sqft), etc
                </div>
              </div>
            </div>
            <img
              alt="toggle"
              className="w-4 h-4"
              src="https://static.dubizzle.com/frontend-web/listings/assets/images/iconDown.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

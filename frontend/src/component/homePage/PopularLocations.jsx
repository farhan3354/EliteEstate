// components/PopularLocations.jsx
import React from "react";

const PopularLocations = () => {
  const popularLocations = [
    { name: "Jumeirah Village Circle (JVC)", count: "6,425" },
    { name: "Business Bay", count: "3,353" },
    { name: "Downtown Dubai", count: "2,829" },
    { name: "Dubai Marina", count: "2,604" },
    { name: "Al Furjan", count: "2,074" },
    { name: "Meydan City", count: "1,938" },
    { name: "Arjan", count: "1,823" },
    { name: "Al Nahda (Dubai)", count: "1,589" },
    { name: "Bur Dubai", count: "1,424" },
    { name: "Palm Jumeirah", count: "1,394" },
  ];

  return (
    <div className="bg-white px-4 py-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-2">
        {popularLocations.map((location, index) => (
          <a
            key={index}
            href="#"
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center"
          >
            {location.name}
            <span className="ml-1 text-gray-500">({location.count})</span>
          </a>
        ))}
        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center">
          View More
        </button>
      </div>
    </div>
  );
};

export default PopularLocations;

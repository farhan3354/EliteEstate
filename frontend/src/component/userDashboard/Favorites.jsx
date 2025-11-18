import React from "react";

const Favorites = () => {
  const favoriteProperties = [
    {
      id: 1,
      title: "Beachfront Villa with Panoramic Views",
      price: 3200000,
      location: "Palm Jumeirah, Dubai",
      type: "Villa",
      beds: 4,
      baths: 5,
      area: 3200,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
      added: "2 days ago",
    },
    {
      id: 2,
      title: "Luxury Penthouse with Private Terrace",
      price: 1850000,
      location: "Downtown Dubai",
      type: "Apartment",
      beds: 3,
      baths: 3,
      area: 2200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      added: "1 week ago",
    },
    {
      id: 3,
      title: "Modern Studio in City Center",
      price: 450000,
      location: "Business Bay, Dubai",
      type: "Apartment",
      beds: 1,
      baths: 1,
      area: 800,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      added: "3 days ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Favorite Properties
        </h1>
        <p className="text-gray-600">Your saved properties for easy access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                ❤️
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                {property.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{property.location}</p>

              <div className="text-xl font-bold text-blue-600 mb-3">
                AED {property.price.toLocaleString()}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>🛏️ {property.beds} beds</span>
                <span>🚿 {property.baths} baths</span>
                <span>📐 {property.area} sqft</span>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Contact Agent
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>

              <div className="mt-3 text-xs text-gray-400">
                Added {property.added}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

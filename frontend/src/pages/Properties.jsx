import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [sortBy, setSortBy] = useState("newest");

  // Sample properties data matching Dubizzle style
  const allProperties = [
    {
      id: 1,
      title: "2BR Luxury Apartment with Sea View",
      price: 120000,
      type: "apartments-for-sale",
      beds: 2,
      baths: 2,
      area: 1200,
      location: "Al Reem Island, Abu Dhabi",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      date: "2 hours ago",
      featured: true,
    },
    {
      id: 2,
      title: "4BR Villa with Private Pool",
      price: 2800,
      type: "villas-for-rent",
      beds: 4,
      baths: 4,
      area: 3200,
      location: "Khalifa City, Abu Dhabi",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
      date: "5 hours ago",
      featured: false,
    },
    {
      id: 3,
      title: "Studio Apartment Near Mosque",
      price: 45000,
      type: "apartments-for-sale",
      beds: 1,
      baths: 1,
      area: 800,
      location: "Mohammed Bin Zayed City",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      date: "1 day ago",
      featured: false,
    },
    {
      id: 4,
      title: "3BR Townhouse for Family",
      price: 1800,
      type: "villas-for-rent",
      beds: 3,
      baths: 2,
      area: 1600,
      location: "Shakhbout City",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
      date: "3 hours ago",
      featured: true,
    },
    {
      id: 5,
      title: "Commercial Office Space",
      price: 850000,
      type: "commercial-for-sale",
      beds: 0,
      baths: 2,
      area: 2500,
      location: "Downtown Abu Dhabi",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
      date: "6 hours ago",
      featured: false,
    },
    {
      id: 6,
      title: "1BR Apartment for Rent",
      price: 2200,
      type: "apartments-for-rent",
      beds: 1,
      baths: 1,
      area: 900,
      location: "Al Raha Beach",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      date: "8 hours ago",
      featured: false,
    },
  ];

  useEffect(() => {
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const filteredProperties = allProperties.filter((property) => {
    if (selectedCategory !== "all" && property.type !== selectedCategory)
      return false;
    if (property.price < priceRange[0] || property.price > priceRange[1])
      return false;
    if (bedrooms !== "any" && property.beds !== parseInt(bedrooms))
      return false;
    return true;
  });

  const categories = [
    { value: "all", label: "All Properties", count: allProperties.length },
    {
      value: "apartments-for-rent",
      label: "Apartments for Rent",
      count: allProperties.filter((p) => p.type === "apartments-for-rent")
        .length,
    },
    {
      value: "apartments-for-sale",
      label: "Apartments for Sale",
      count: allProperties.filter((p) => p.type === "apartments-for-sale")
        .length,
    },
    {
      value: "villas-for-rent",
      label: "Villas for Rent",
      count: allProperties.filter((p) => p.type === "villas-for-rent").length,
    },
    {
      value: "villas-for-sale",
      label: "Villas for Sale",
      count: allProperties.filter((p) => p.type === "villas-for-sale").length,
    },
    {
      value: "commercial-for-rent",
      label: "Commercial for Rent",
      count: allProperties.filter((p) => p.type === "commercial-for-rent")
        .length,
    },
    {
      value: "commercial-for-sale",
      label: "Commercial for Sale",
      count: allProperties.filter((p) => p.type === "commercial-for-sale")
        .length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Properties in Abu Dhabi
          </h1>
          <p className="text-gray-600">
            Find your perfect property from our extensive collection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">
                  Property Type
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full text-left px-3 py-2 rounded transition duration-200 text-sm ${
                        selectedCategory === cat.value
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{cat.label}</span>
                        <span
                          className={`text-xs ${
                            selectedCategory === cat.value
                              ? "text-orange-100"
                              : "text-gray-500"
                          }`}
                        >
                          ({cat.count})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">
                  Price Range (AED)
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{priceRange[0].toLocaleString()}</span>
                    <span>{priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Bedrooms</h4>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                >
                  <option value="any">Any</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 10000000]);
                  setBedrooms("any");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded transition duration-200 font-medium text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600 text-sm">
                  Showing {filteredProperties.length} of {allProperties.length}{" "}
                  properties
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Properties List */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 10000000]);
                    setBedrooms("any");
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition duration-200"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                  >
                    <div className="flex">
                      {/* Property Image */}
                      <div className="w-1/3">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-32 object-cover rounded-l-lg"
                        />
                      </div>

                      {/* Property Details */}
                      <div className="w-2/3 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1 mr-2">
                            {property.title}
                          </h3>
                          {property.featured && (
                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-xs mb-2">
                          {property.location}
                        </p>

                        <div className="text-lg font-bold text-orange-500 mb-2">
                          {property.type.includes("rent")
                            ? `AED ${property.price.toLocaleString()}/month`
                            : `AED ${property.price.toLocaleString()}`}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <span>🛏️ {property.beds} bed</span>
                          <span>🚿 {property.baths} bath</span>
                          <span>📐 {property.area} sq.ft</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-xs">
                            {property.date}
                          </span>
                          <button
                            onClick={() => navigate(`/property/${property.id}`)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-semibold transition duration-200"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;

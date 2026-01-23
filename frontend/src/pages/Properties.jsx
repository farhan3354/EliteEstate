import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/routeapi";
import { locationAPI } from "../services/api";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [furnishing, setFurnishing] = useState("any");
  const [location, setLocation] = useState("any");
  const [sortBy, setSortBy] = useState("newest");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchProperties();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [selectedCategory, priceRange, bedrooms, furnishing, location, sortBy]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      params.append("minPrice", priceRange[0]);
      params.append("maxPrice", priceRange[1]);
      if (bedrooms !== "any") {
        params.append("bedrooms", bedrooms);
      }
      if (furnishing !== "any") {
        params.append("furnishing", furnishing);
      }
      if (location !== "any") {
        params.append("area", location);
      }
      params.append("sortBy", sortBy);

      const response = await api.get(`/properties?${params.toString()}`);
      setProperties(response.data.data.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchFilters = async () => {
    try {
      // Fetch dynamic locations
      const locationRes = await locationAPI.getAll();
      if (locationRes.data.success) {
        setLocations(locationRes.data.data.map((loc) => loc.name));
      }

      const params = new URLSearchParams();
      params.append("category", "all");
      const response = await api.get(`/properties/search?${params.toString()}`);
      const data = response.data.data;
      if (data && data.filters) {
        const filters = data.filters;

        const allCategory = {
          value: "all",
          label: "All Properties",
          count: filters.totalCount || 0,
        };

        setCategories([allCategory, ...(filters.categories || [])]);

        if (filters.minPrice && filters.maxPrice) {
          setPriceRange([filters.minPrice, filters.maxPrice]);
        }
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
      setCategories([
        { value: "all", label: "All Properties", count: 0 },
        { value: "apartments", label: "Apartments", count: 0 },
        { value: "villas", label: "Villas", count: 0 },
        { value: "townhouses", label: "Townhouses", count: 0 },
        { value: "commercial", label: "Commercial", count: 0 },
        { value: "land", label: "Land", count: 0 },
        { value: "rooms", label: "Rooms", count: 0 },
        { value: "warehouses", label: "Warehouses", count: 0 },
        { value: "buildings", label: "Buildings", count: 0 },
      ]);
      // Fallback if API fails
      if (locations.length === 0) {
        setLocations([
          "Al Reem Island",
          "Khalifa City",
          "Mohammed Bin Zayed City",
          "Shakhbout City",
          "Downtown",
          "Al Raha Beach",
          "Yas Island",
          "Saadiyat Island",
        ]);
      }
    }
  };
  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 500000]);
    setBedrooms("any");
    setFurnishing("any");
    setLocation("any");
  };

  const getCategoryLabel = (category) => {
    const labels = {
      apartments: "Apartments",
      villas: "Villas",
      townhouses: "Townhouses",
      commercial: "Commercial",
      land: "Land",
      rooms: "Rooms",
      warehouses: "Warehouses",
      buildings: "Buildings",
    };
    return labels[category] || category;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Property for Sale in Abu Dhabi
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {loading
                  ? "Loading..."
                  : `${properties.length} properties found`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (AED)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value) || 0,
                        priceRange[1],
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value) || 0,
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="any">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="any">Any Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                {showMoreFilters ? "Fewer Filters" : "More Filters"}
                <span
                  className={`transform transition-transform ${
                    showMoreFilters ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              <button
                onClick={resetFilters}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>
            {showMoreFilters && (
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnishing
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["any", "furnished", "semi-furnished", "unfurnished"].map(
                      (furnish) => (
                        <button
                          key={furnish}
                          onClick={() => setFurnishing(furnish)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                            furnishing === furnish
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          {furnish === "any"
                            ? "Any Furnishing"
                            : furnish.charAt(0).toUpperCase() +
                              furnish.slice(1).replace("-", " ")}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { key: "parking", label: "Parking" },
                      { key: "pool", label: "Swimming Pool" },
                      { key: "gym", label: "Gym" },
                      { key: "balcony", label: "Balcony" },
                    ].map((amenity) => (
                      <label
                        key={amenity.key}
                        className="flex items-center space-x-2 cursor-pointer group"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {amenity.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 animate-pulse"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80">
                    <div className="w-full h-48 sm:h-full bg-gray-200"></div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="flex gap-6 mb-4">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 relative">
                    <img
                      src={
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
                      }
                      alt={property.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {property.isUrgent && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                          Urgent
                        </span>
                      )}
                      {property.isVerified && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Verified
                        </span>
                      )}
                      {property.purpose === "rent" && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          For Rent
                        </span>
                      )}
                    </div>
                    <button className="absolute top-3 right-3 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md">
                      ♡
                    </button>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3
                            className="font-semibold text-gray-900 text-lg mb-1 hover:text-blue-600 cursor-pointer"
                            onClick={() =>
                              navigate(`/property/${property._id}`)
                            }
                          >
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>
                              📍{" "}
                              {property.location?.area ||
                                property.location?.city ||
                                "Abu Dhabi"}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="capitalize">
                              {getCategoryLabel(property.category)}
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 whitespace-nowrap ml-4">
                          AED {property.price?.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">🛏️</span>
                          {property.bedrooms} bed
                          {property.bedrooms !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">🚿</span>
                          {property.bathrooms} bath
                          {property.bathrooms !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">📐</span>
                          {property.area?.toLocaleString()}{" "}
                          {property.areaUnit || "sqft"}
                        </span>
                        {property.furnishing && (
                          <span className="flex items-center gap-1 capitalize">
                            <span className="text-lg">🛋️</span>
                            {property.furnishing}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {property.features
                          ?.slice(0, 3)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium capitalize"
                            >
                              {feature}
                            </span>
                          ))}
                        {property.amenities?.building
                          ?.slice(0, 2)
                          .map((amenity, index) => (
                            <span
                              key={`building-${index}`}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium capitalize"
                            >
                              {amenity}
                            </span>
                          ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {formatDate(property.createdAt)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">
                              {property.listedBy?.name || "Property Owner"}
                            </span>
                            {property.listedBy?.verified && (
                              <span className="text-blue-500 text-xs">✓</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition duration-200">
                            📞 Call
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/property/${property._id}`)
                            }
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { propertyAPI } from "../services/api";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (searchFilters = {}) => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAll(searchFilters);
      setProperties(response.data.data.properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties(filters);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      location: "",
    });
    fetchProperties();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          >
            <option value="">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="apartments">Apartments</option>
            <option value="villas">Villas</option>
            <option value="townhouses">Townhouses</option>
            <option value="commercial">Commercial</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={property.images?.[0]?.url || "/placeholder.jpg"}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-2">{property.location.address}</p>
              <p className="text-2xl font-bold text-blue-600 mb-2">
                AED {property.price.toLocaleString()}
                {property.type === "rent" && "/month"}
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>🛏️ {property.bedrooms} beds</span>
                <span>🚿 {property.bathrooms} baths</span>
                <span>📐 {property.area} sq ft</span>
              </div>
              <Link
                to={`/properties/${property._id}`}
                className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No properties found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Properties;

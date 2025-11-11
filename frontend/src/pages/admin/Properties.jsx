import React, { useState, useEffect } from "react";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProperties = [
      {
        id: 1,
        title: "Luxury 3BR Apartment with Sea View",
        price: 2800000,
        type: "sale",
        category: "apartments",
        status: "active",
        featured: true,
        views: 1247,
        favorites: 89,
        listedBy: { name: "Sarah Wilson" },
        location: { area: "Al Reem Island" },
        createdAt: "2024-01-15",
        images: [
          {
            url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
          },
        ],
      },
      {
        id: 2,
        title: "Modern 2BR Villa with Private Pool",
        price: 4200000,
        type: "sale",
        category: "villas",
        status: "active",
        featured: false,
        views: 856,
        favorites: 45,
        listedBy: { name: "Mike Johnson" },
        location: { area: "Khalifa City" },
        createdAt: "2024-01-12",
        images: [
          {
            url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
          },
        ],
      },
      {
        id: 3,
        title: "Studio Apartment for Rent",
        price: 45000,
        type: "rent",
        category: "apartments",
        status: "inactive",
        featured: false,
        views: 234,
        favorites: 12,
        listedBy: { name: "Emily Brown" },
        location: { area: "Downtown" },
        createdAt: "2024-01-10",
        images: [
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
          },
        ],
      },
      {
        id: 4,
        title: "Commercial Office Space",
        price: 1200000,
        type: "sale",
        category: "commercial",
        status: "active",
        featured: true,
        views: 567,
        favorites: 23,
        listedBy: { name: "David Smith" },
        location: { area: "Business Bay" },
        createdAt: "2024-01-08",
        images: [
          {
            url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
          },
        ],
      },
    ];

    setProperties(mockProperties);
    setLoading(false);
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || property.status === filterStatus;
    const matchesType = filterType === "all" || property.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const updatePropertyStatus = (propertyId, status) => {
    setProperties(
      properties.map((property) =>
        property.id === propertyId ? { ...property, status } : property
      )
    );
  };

  const toggleFeatured = (propertyId) => {
    setProperties(
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, featured: !property.featured }
          : property
      )
    );
  };

  const deleteProperty = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Properties Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all property listings in the system
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search properties by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="flex">
              <img
                src={property.images[0]?.url || "/placeholder.jpg"}
                alt={property.title}
                className="w-32 h-32 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex space-x-1">
                    {property.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        property.status === "active"
                          ? "bg-green-100 text-green-800"
                          : property.status === "inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  {property.location.area}
                </p>
                <p className="text-xl font-bold text-blue-600 mb-2">
                  AED {property.price.toLocaleString()}
                  {property.type === "rent" && "/month"}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>👁️ {property.views} views</span>
                  <span>❤️ {property.favorites} favorites</span>
                  <span className="capitalize">{property.category}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Listed by: {property.listedBy.name}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleFeatured(property.id)}
                      className={`px-3 py-1 rounded text-xs ${
                        property.featured
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {property.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() =>
                        updatePropertyStatus(
                          property.id,
                          property.status === "active" ? "inactive" : "active"
                        )
                      }
                      className={`px-3 py-1 rounded text-xs ${
                        property.status === "active"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {property.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No properties found matching your criteria.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {properties.length}
            </p>
            <p className="text-gray-600">Total Properties</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {properties.filter((p) => p.status === "active").length}
            </p>
            <p className="text-gray-600">Active Listings</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {properties.filter((p) => p.featured).length}
            </p>
            <p className="text-gray-600">Featured</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {properties.filter((p) => p.type === "rent").length}
            </p>
            <p className="text-gray-600">For Rent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;

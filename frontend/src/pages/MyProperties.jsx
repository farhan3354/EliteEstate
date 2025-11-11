import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { propertyAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyProperties();
    }
  }, [user]);

  const fetchMyProperties = async () => {
    try {
      const response = await propertyAPI.getUserProperties();
      setProperties(response.data.data.properties);
    } catch (error) {
      setMessage("Error fetching your properties");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      await propertyAPI.delete(propertyId);
      setMessage("Property deleted successfully");
      fetchMyProperties(); // Refresh the list
    } catch (error) {
      setMessage("Error deleting property");
      console.error("Error:", error);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please login to view your properties
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your properties...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link
          to="/create-property"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add New Property
        </Link>
      </div>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${
            message.includes("success")
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            You haven't listed any properties yet.
          </p>
          <Link
            to="/create-property"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            List Your First Property
          </Link>
        </div>
      ) : (
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
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      property.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-2">
                  {property.location.address}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  AED {property.price.toLocaleString()}
                  {property.type === "rent" && "/month"}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>🛏️ {property.bedrooms} beds</span>
                  <span>🚿 {property.bathrooms} baths</span>
                  <span>📐 {property.area} sq ft</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>👁️ {property.views} views</span>
                  <span>❤️ {property.favoritesCount} favorites</span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/properties/${property._id}`}
                    className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteProperty(property._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;

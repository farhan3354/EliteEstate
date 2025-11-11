import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { favoriteAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await favoriteAPI.getFavorites();
      setFavorites(response.data.data.favorites);
    } catch (error) {
      setMessage("Error fetching favorites");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (propertyId) => {
    try {
      await favoriteAPI.removeFavorite(propertyId);
      setMessage("Property removed from favorites");
      fetchFavorites(); // Refresh the list
    } catch (error) {
      setMessage("Error removing from favorites");
      console.error("Error:", error);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please login to view your favorites
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your favorites...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorite Properties</h1>

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

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            You haven't added any properties to favorites yet.
          </p>
          <Link
            to="/properties"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
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

                <div className="flex space-x-2">
                  <Link
                    to={`/properties/${property._id}`}
                    className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFavorite(property._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Remove
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

export default Favorites;

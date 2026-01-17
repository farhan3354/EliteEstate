import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/routeapi";

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/favorites"); // Assuming endpoint exists based on api.js
      setFavorites(response.data.data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading favorites...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto text-center py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Favorite Properties</h1>
        <p className="text-gray-600 mb-6">No favorite properties yet.</p>
        <button 
          onClick={() => navigate("/properties")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Favorite Properties
        </h1>
        <p className="text-gray-600">Your saved properties for easy access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => {
          const property = fav.property || fav; // Handle populated vs direct structure
          return (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={property.images?.[0] || "https://via.placeholder.com/400x300"}
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
                <p className="text-gray-600 text-sm mb-3">
                  📍 {property.location?.city || property.location?.area || "Abu Dhabi"}
                </p>

                <div className="text-xl font-bold text-blue-600 mb-3">
                  AED {property.price?.toLocaleString()}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🛏️ {property.bedrooms} beds</span>
                  <span>🚿 {property.bathrooms} baths</span>
                  <span>📐 {property.area} sqft</span>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;

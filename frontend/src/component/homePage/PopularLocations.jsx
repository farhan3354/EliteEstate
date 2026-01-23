import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import { locationAPI } from "../../services/api";

const PopularLocations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        // Try to get popular locations first
        const popularResponse = await locationAPI.getPopular();
        if (popularResponse.data.data && popularResponse.data.data.length > 0) {
          setLocations(popularResponse.data.data);
        } else {
          // Fallback to all locations if no popular ones
          const allResponse = await locationAPI.getAll();
          setLocations(allResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching locations for home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocationsData();
  }, []);

  const handleLocationClick = (locationName) => {
    navigate(`/properties?location=${locationName}`);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FiMapPin className="w-4 h-4" />
              <span>Prime Locations</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Popular Areas in Abu Dhabi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after neighborhoods in Abu Dhabi
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : locations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {locations.map((location) => (
                  <div
                    key={location._id}
                    className="group cursor-pointer"
                    onClick={() => handleLocationClick(location.name)}
                  >
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {location.name}
                        </h3>
                        <p className="text-gray-200 text-sm line-clamp-2">
                          {location.description || "Explore properties in " + location.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 italic">No popular locations found.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/properties")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-3"
            >
              <FiNavigation className="w-5 h-5" />
              <span>Explore All Locations</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularLocations;

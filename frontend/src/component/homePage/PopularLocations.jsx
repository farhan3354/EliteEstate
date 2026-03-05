import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiNavigation, FiArrowRight } from "react-icons/fi";
import { locationAPI } from "../../services/api";

const PopularLocations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        setLoading(true);
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100">
              <FiMapPin className="w-3 h-3" />
              <span>Elite Neighborhoods</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Prime Destinations
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore the most exclusive and sought-after residential areas in Abu Dhabi.
            </p>
          </div>
          <button
            onClick={() => navigate("/properties")}
            className="group hidden md:flex items-center space-x-3 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            <span className="text-lg">View all locations</span>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
               <FiNavigation className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
             [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-[2.5rem] animate-pulse"></div>
            ))
          ) : locations.length > 0 ? (
            locations.map((location, index) => (
              <div
                key={location._id}
                className={`group cursor-pointer relative h-[30rem] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-blue-200/50 ${
                  index % 2 !== 0 ? 'md:mt-12' : ''
                }`}
                onClick={() => handleLocationClick(location.name)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-10 group-hover:opacity-90 transition-opacity"></div>
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                />

                <div className="absolute inset-x-0 bottom-0 p-8 z-20 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                  <div className="flex items-center space-x-2 mb-3">
                     <span className="w-12 h-[2px] bg-blue-500 rounded-full group-hover:w-20 transition-all duration-500"></span>
                     <span className="text-blue-400 text-xs font-black tracking-widest uppercase">ABU DHABI</span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
                    {location.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {location.description || `Discover handpicked luxury properties and unmatched lifestyle in ${location.name}.`}
                  </p>
                  
                  <div className="mt-6 flex items-center text-white font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                     <span>Explore More</span>
                     <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 z-20">
                   <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <FiMapPin className="text-white w-6 h-6" />
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-xl font-medium italic">No destinations found in the current selection.</p>
            </div>
          )}
        </div>
        
         <button
            onClick={() => navigate("/properties")}
            className="mt-12 w-full md:hidden flex items-center justify-center space-x-3 bg-blue-600 text-white p-5 rounded-2xl font-bold shadow-xl shadow-blue-200 active:scale-95 transition-all"
          >
            <span>Explore All Locations</span>
            <FiNavigation className="w-5 h-5" />
          </button>
      </div>
    </section>
  );
};

export default PopularLocations;

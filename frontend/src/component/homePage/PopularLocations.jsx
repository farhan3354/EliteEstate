import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiNavigation } from "react-icons/fi";

const PopularLocations = () => {
  const navigate = useNavigate();

  const popularLocations = [
    {
      name: "Al Reem Island",
      propertyCount: 1250,
      startingPrice: "AED 80,000",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Modern island community with luxury towers and waterfront views",
      propertyTypes: "Studio, 1, 2+ Bedroom Apartments & Villas",
      featured: true,
    },
    {
      name: "Yas Island",
      propertyCount: 890,
      startingPrice: "AED 120,000",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Entertainment hub with world-class attractions and theme parks",
      propertyTypes: "1, 2+ Bedroom Apartments & Luxury Villas",
    },
    {
      name: "Saadiyat Island",
      propertyCount: 450,
      startingPrice: "AED 150,000",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cultural district with beachfront properties and museums",
      propertyTypes: "Luxury Villas & Premium Apartments",
      luxury: true,
    },
    {
      name: "Al Raha Beach",
      propertyCount: 680,
      startingPrice: "AED 90,000",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Waterfront community with canal views and beach access",
      propertyTypes: "Studio, 1, 2+ Bedroom Apartments",
    },
    {
      name: "Khalifa City",
      propertyCount: 1200,
      startingPrice: "AED 50,000",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Family-friendly suburban community with spacious villas",
      propertyTypes: "2+ Bedroom Villas & Townhouses",
      family: true,
    },
    {
      name: "Corniche Area",
      propertyCount: 280,
      startingPrice: "AED 180,000",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Premium waterfront location with stunning city views",
      propertyTypes: "Luxury Apartments & Penthouses",
      premium: true,
    },
    {
      name: "Al Mushrif",
      propertyCount: 320,
      startingPrice: "AED 100,000",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "Established neighborhood with traditional villas and gardens",
      propertyTypes: "3+ Bedroom Villas & Mansions",
    },
  ];

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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div
                className="lg:col-span-2 lg:row-span-2 group cursor-pointer"
                onClick={() => handleLocationClick(popularLocations[0].name)}
              >
                <div className="relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                  <img
                    src={popularLocations[0].image}
                    alt={popularLocations[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {popularLocations[0].name}
                    </h3>
                    <p className="text-gray-200 mb-3 text-sm">
                      {popularLocations[0].description}
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="text-blue-300">
                        {popularLocations[0].propertyTypes}
                      </div>
                      <div className="font-semibold">
                        Starting from {popularLocations[0].startingPrice}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                {popularLocations.slice(1, 3).map((location, index) => (
                  <div
                    key={location.name}
                    className="group cursor-pointer"
                    onClick={() => handleLocationClick(location.name)}
                  >
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                        <h3 className="text-lg font-bold mb-1">
                          {location.name}
                        </h3>
                        <p className="text-gray-200 text-xs mb-2 line-clamp-2">
                          {location.description}
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="text-blue-300">
                            {location.propertyTypes}
                          </div>
                          <div className="font-semibold">
                            From {location.startingPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3 grid grid-cols-3 gap-4">
                {popularLocations.slice(3, 6).map((location, index) => (
                  <div
                    key={location.name}
                    className="group cursor-pointer"
                    onClick={() => handleLocationClick(location.name)}
                  >
                    <div className="relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-white">
                        <h3 className="text-sm font-bold mb-1">
                          {location.name}
                        </h3>
                        <div className="text-xs text-blue-300 mb-1">
                          {location.propertyTypes.split("&")[0]}
                        </div>
                        <div className="font-semibold text-xs">
                          From {location.startingPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {popularLocations.slice(6).map((location, index) => (
                  <div
                    key={location.name}
                    className="group cursor-pointer"
                    onClick={() => handleLocationClick(location.name)}
                  >
                    <div className="relative h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-white">
                        <h3 className="text-sm font-bold mb-1">
                          {location.name}
                        </h3>
                        <div className="font-semibold text-xs">
                          From {location.startingPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

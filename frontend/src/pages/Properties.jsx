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

      // Fetch dynamic categories
      const categoryRes = await api.get("/categories");
      if (categoryRes.data.success) {
        const cats = categoryRes.data.data.map(c => ({
          value: c.value,
          label: c.name,
          count: c.count || 0
        }));
        
        const totalCount = cats.reduce((acc, curr) => acc + curr.count, 0);
        setCategories([
          { value: "all", label: "All Properties", count: totalCount },
          ...cats
        ]);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };
  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 500000]);
    setBedrooms("any");
    setFurnishing("any");
    setLocation("any");
  };

  const getCategoryLabel = (categoryValue) => {
    const foundCat = categories.find(c => c.value === categoryValue);
    return foundCat ? foundCat.label : categoryValue;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 mt-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Properties in Abu Dhabi
              </h1>
              <p className="text-gray-500 text-lg mt-2 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                {loading
                  ? "Discovering available listings..."
                  : `${properties.length} Exclusive Listings Found`}
              </p>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white px-4 py-2 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-700 shadow-sm transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                Property Categories
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-6 py-3 rounded-2xl border text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                      selectedCategory === cat.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
                    }`}
                  >
                    {cat.label} <span className="ml-1 opacity-60 text-xs">{cat.count}</span>
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
          <div className="grid grid-cols-1 gap-8">
            {properties.map((property) => (
              <div
                key={property._id}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-[400px] relative overflow-hidden">
                    <img
                      src={
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
                      }
                      alt={property.title}
                      className="w-full h-64 lg:h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {property.isUrgent && (
                        <span className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                          Urgent
                        </span>
                      )}
                      {property.isVerified && (
                        <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                          Verified
                        </span>
                      )}
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                        For {property.purpose === "rent" ? "Rent" : "Sale"}
                      </span>
                    </div>
                    
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-red-500 hover:text-white p-3 rounded-2xl shadow-xl transition-all duration-300 text-gray-700 group/fav">
                      <span className="transform group-hover/fav:scale-125 transition-transform inline-block">♡</span>
                    </button>

                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                       <span className="text-xs font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center">
                         <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                         {property.images?.length || 1} Photos
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-8">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3
                            className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight"
                            onClick={() =>
                              navigate(`/property/${property._id}`)
                            }
                          >
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-4">
                             <div className="flex items-center text-gray-500 font-medium">
                                <span className="mr-1.5">📍</span>
                                {property.location?.area || property.location?.city || "Abu Dhabi"}
                             </div>
                             <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                             <div className="text-blue-600 font-bold uppercase text-[10px] tracking-widest bg-blue-50 px-2 py-0.5 rounded-lg">
                                {getCategoryLabel(property.category)}
                             </div>
                          </div>
                        </div>
                        <div className="text-right">
                           <div className="text-3xl font-black text-gray-900 tracking-tighter">
                             <span className="text-blue-600 text-base font-bold mr-1 italic">AED</span>
                             {property.price?.toLocaleString()}
                           </div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                              All-inclusive Price
                           </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50/50 rounded-3xl p-6 mb-6 border border-gray-100 group-hover:bg-blue-50/30 transition-colors duration-500">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-2xl mb-1">🛏️</span>
                          <span className="text-sm font-black text-gray-900">{property.bedrooms} <span className="text-[10px] text-gray-400 uppercase tracking-widest block text-center mt-0.5">Beds</span></span>
                        </div>
                        <div className="flex flex-col items-center justify-center border-l border-gray-200 lg:border-l">
                          <span className="text-2xl mb-1">🚿</span>
                          <span className="text-sm font-black text-gray-900">{property.bathrooms} <span className="text-[10px] text-gray-400 uppercase tracking-widest block text-center mt-0.5">Baths</span></span>
                        </div>
                        <div className="flex flex-col items-center justify-center border-l border-gray-200">
                          <span className="text-2xl mb-1">📐</span>
                          <span className="text-sm font-black text-gray-900">{property.area?.toLocaleString()} <span className="text-[10px] text-gray-400 uppercase tracking-widest block text-center mt-0.5">{property.areaUnit || "sqft"}</span></span>
                        </div>
                        <div className="flex flex-col items-center justify-center border-l border-gray-200">
                          <span className="text-2xl mb-1">🛋️</span>
                          <span className="text-sm font-black text-gray-900 capitalize">{property.furnishing || "—"} <span className="text-[10px] text-gray-400 uppercase tracking-widest block text-center mt-0.5">Furnished</span></span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs uppercase border border-white shadow-sm overflow-hidden">
                             {property.listedBy?.profileImage ? (
                               <img src={property.listedBy.profileImage} className="w-full h-full object-cover" alt="" />
                             ) : (
                               property.listedBy?.name?.charAt(0) || "U"
                             )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 flex items-center">
                              {property.listedBy?.name || "Premium Host"}
                              {property.listedBy?.verified && <span className="ml-1 text-blue-500 text-[10px]">✓</span>}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                               Listed {formatDate(property.createdAt)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="px-6 py-3 border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300 transform active:scale-95 shadow-sm">
                            Contact
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/property/${property._id}`)
                            }
                            className="px-8 py-3 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl text-sm font-bold transition-all duration-500 transform active:scale-95 shadow-xl hover:shadow-blue-200"
                          >
                            Explore Property
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

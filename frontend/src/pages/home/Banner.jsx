import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMapPin, FiHome, FiChevronDown, FiArrowRight } from "react-icons/fi";
import { locationAPI, propertyAPI } from "../../services/api";

const Banner = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchData, setSearchData] = useState({
    category: "",
    location: "",
    keyword: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [locRes, catRes] = await Promise.all([
          locationAPI.getAll(),
          propertyAPI.getCategories()
        ]);
        
        if (locRes.data.success) setLocations(locRes.data.data);
        if (catRes.data.success) setCategories(catRes.data.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleSearch = () => {
    navigate("/properties", {
      state: { searchData },
    });
  };

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-gray-900">
      {/* Premium Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80" 
          alt="Abu Dhabi Skyline" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-10 transform transition-transform hover:scale-105">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-bold text-white tracking-widest uppercase">
              Elite Properties in Abu Dhabi
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
            <span className="block opacity-90">Find Your Next</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Legendary Address
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
            Curated premium real estate in the most prestigious districts of the UAE's capital.
          </p>

          {/* Premium Search Bar */}
          <div className="bg-white/5 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-4xl mx-auto transform transition-all hover:shadow-blue-500/10 active:scale-[0.99]">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Category Select */}
              <div className="relative w-full md:w-1/4 group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400 group-hover:scale-110 transition-transform">
                  <FiHome className="w-5 h-5" />
                </div>
                <select
                  value={searchData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full bg-white/10 text-white pl-14 pr-6 py-5 rounded-3xl border border-transparent focus:border-blue-500/50 outline-none transition-all appearance-none font-bold"
                >
                  <option value="" className="bg-gray-900 text-white">All Types</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-gray-900 text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Location Select */}
              <div className="relative w-full md:w-1/4 group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400 group-hover:scale-110 transition-transform">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <select
                  value={searchData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full bg-white/10 text-white pl-14 pr-6 py-5 rounded-3xl border border-transparent focus:border-blue-500/50 outline-none transition-all appearance-none font-bold"
                >
                  <option value="" className="bg-gray-900 text-white">All Areas</option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc.name} className="bg-gray-900 text-white">
                      {loc.name}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Keyword Input */}
              <div className="relative flex-1 w-full group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400 group-hover:scale-110 transition-transform">
                  <FiSearch className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Street, Building, ID..."
                  value={searchData.keyword}
                  onChange={(e) => handleInputChange("keyword", e.target.value)}
                  className="w-full bg-white/10 text-white pl-14 pr-6 py-5 rounded-3xl border border-transparent focus:border-blue-500/50 outline-none transition-all font-bold placeholder:text-gray-500"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto h-full px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center space-x-3 group"
              >
                <span className="tracking-widest uppercase">Search</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up" 
               style={{ animation: 'fade-in-up 1s ease-out 0.5s forwards' }}>
            {['Luxury Villas', 'Waterfront', 'Penthouse', 'New Launches'].map((item) => (
              <button 
                key={item}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full text-sm font-bold text-gray-200 transition-all hover:border-blue-500/30"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Banner;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { propertyAPI } from "../../services/api";

const PropertyCategories = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categoryImages = {
    apartment: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
    villa: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80",
    townhouse: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=500&q=80",
    commercial: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80",
    land: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80",
    warehouses: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
    buildings: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
    rooms: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await propertyAPI.getCategories();
        
        // Robust handling of different response structures
        let data = [];
        if (response.data?.success) {
          data = response.data.data;
        } else if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data?.properties) {
          data = response.data.properties;
        }

        // Ensure we only set an array
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryValue) => {
    navigate(`/properties?category=${categoryValue}`);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(handleScroll, 300);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 5);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 px-4">
             <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span>EXPLORE BY CATEGORY</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Property Type Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find your ideal space from our curated selection of properties in Abu Dhabi's most prestigious developments.
            </p>
          </div>
          <div className="relative group/arrows">
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white p-4 rounded-full transition-all duration-300 -translate-x-6 border border-gray-100"
                aria-label="Previous categories"
              >
                <FiChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white p-4 rounded-full transition-all duration-300 translate-x-6 border border-gray-100"
                aria-label="Next categories"
              >
                <FiChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            )}
            
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth py-6 px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {loading ? (
                // Skeleton loading state
                [1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-shrink-0 w-72 h-80 bg-white rounded-3xl animate-pulse shadow-sm border border-gray-100"></div>
                ))
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    key={category.value}
                    onClick={() => handleCategoryClick(category.value)}
                    className="group flex-shrink-0 w-72 cursor-pointer transition-all duration-500"
                  >
                    <div className="relative bg-white overflow-hidden rounded-3xl shadow-xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                      <div className="relative w-full h-80 overflow-hidden">
                        <img
                          src={categoryImages[category.value] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:translate-y-[-8px] transition-transform duration-300">
                          <div className="flex items-center justify-between mb-2">
                             <div className="bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase">
                               {category.count} Listings
                             </div>
                          </div>
                          <h4 className="text-2xl font-black mb-1 drop-shadow-md">
                            {category.name}
                          </h4>
                          <div className="w-8 h-1 bg-blue-400 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-gray-400 font-medium italic">
                  No categories found in the collection.
                </div>
              )}
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/categories")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-semibold transition duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>View All Categories</span>
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyCategories;

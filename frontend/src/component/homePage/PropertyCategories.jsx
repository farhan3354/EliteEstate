import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PropertyCategories = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const propertyCategories = [
    {
      value: "apartment",
      name: "Apartment for Rent",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "villa",
      name: "Villa for Rent",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "townhouse",
      name: "Townhouse for Rent",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "penthouse",
      name: "Penthouse for Rent",
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "commercial",
      name: "Commercial for Rent",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "land",
      name: "Land Plots for Sale",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "short-term",
      name: "Short Term Rentals",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      value: "rooms",
      name: "Rooms for Rent",
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ];

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

      setTimeout(() => {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }, 300);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Popular Categories
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our most popular property categories in Abu Dhabi
          </p>
        </div>
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 transition-all duration-300 -translate-x-4"
              aria-label="Previous categories"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 transition-all duration-300 translate-x-4"
              aria-label="Next categories"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {propertyCategories.map((category) => (
              <div
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className="group flex-shrink-0 w-60 cursor-pointer transition-all duration-300"
              >
                <div className="relative bg-white overflow-hidden shadow-lg hover:shadow-xl border-0">
                  <div className="relative w-full h-60 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="text-lg font-bold mb-1">
                        {category.name}
                      </h4>
                    </div>
                    <svg
                      viewBox="0 0 300 300"
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.5,0.5h299v299h-299V0.5z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-orange-500"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/categories")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold transition duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>View All Categories</span>
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PropertyCategories;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiHome,
//   FiMapPin,
//   FiArrowRight,
//   FiStar,
//   FiTrendingUp,
//   FiHeart,
// } from "react-icons/fi";

// const PropertyCategories = () => {
//   const navigate = useNavigate();

//   const propertyCategories = [
//     {
//       value: "apartment",
//       name: "Apartments",
//       count: 1250,
//       image:
//         "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       icon: FiHome,
//       description: "Modern apartments in prime locations",
//       trending: true,
//     },
//     {
//       value: "villa",
//       name: "Villas",
//       count: 890,
//       image:
//         "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       icon: FiHome,
//       description: "Luxury villas with premium amenities",
//       featured: true,
//     },
//     {
//       value: "townhouse",
//       name: "Townhouses",
//       count: 450,
//       image:
//         "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       icon: FiHome,
//       description: "Spacious townhouses in family-friendly communities",
//     },
//     {
//       value: "penthouse",
//       name: "Penthouses",
//       count: 120,
//       image:
//         "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       icon: FiStar,
//       description: "Exclusive penthouses with stunning views",
//       luxury: true,
//     },
//     {
//       value: "commercial",
//       name: "Commercial",
//       count: 680,
//       image:
//         "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       icon: FiTrendingUp,
//       description: "Office spaces and commercial properties",
//     },
//     {
//       value: "land",
//       name: "Land Plots",
//       count: 320,
//       image:
//         "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       icon: FiMapPin,
//       description: "Prime land plots for development",
//     },
//   ];

//   const handleCategoryClick = (categoryValue) => {
//     navigate(`/properties?category=${categoryValue}`);
//   };

//   return (
//     <>
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//               <FiMapPin className="w-4 h-4" />
//               <span>Abu Dhabi Properties</span>
//             </div>
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
//               Browse Property Categories
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Discover the perfect property type that matches your lifestyle and
//               investment goals
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {propertyCategories.map((category) => {
//               const IconComponent = category.icon;
//               return (
//                 <div
//                   key={category.value}
//                   onClick={() => handleCategoryClick(category.value)}
//                   className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-gray-100 overflow-hidden"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
//                     <div className="absolute top-4 left-4 flex flex-col space-y-2">
//                       <div className="bg-white bg-opacity-95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
//                         {category.count.toLocaleString()} properties
//                       </div>
//                       {category.trending && (
//                         <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                           <FiTrendingUp className="w-3 h-3" />
//                           <span>Trending</span>
//                         </div>
//                       )}
//                       {category.featured && (
//                         <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                           <FiStar className="w-3 h-3" />
//                           <span>Featured</span>
//                         </div>
//                       )}
//                       {category.luxury && (
//                         <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                           <FiHeart className="w-3 h-3" />
//                           <span>Luxury</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="absolute bottom-4 right-4 w-12 h-12 bg-orange-500 bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:bg-opacity-90 transition duration-500">
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition duration-300">
//                       {category.name}
//                     </h3>
//                     <p className="text-gray-600 mb-4 leading-relaxed">
//                       {category.description}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2 text-orange-500 font-semibold group-hover:text-orange-600 transition duration-300">
//                         <span>Explore Properties</span>
//                         <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-300" />
//                       </div>

//                       {/* Popularity Indicator */}
//                       <div className="flex items-center space-x-1 text-gray-400">
//                         <FiHeart className="w-4 h-4" />
//                         <span className="text-sm">
//                           {Math.floor(category.count / 10)} favorites
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="text-center mt-12">
//             <button
//               onClick={() => navigate("/properties")}
//               className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-3"
//             >
//               <span>View All Properties</span>
//               <FiArrowRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PropertyCategories;

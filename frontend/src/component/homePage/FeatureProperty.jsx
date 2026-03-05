import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiMapPin, FiArrowRight } from "react-icons/fi";
import { propertyAPI } from "../../services/api";
import { useSelector } from "react-redux";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState({});
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteLoading, setFavoriteLoading] = useState({});
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  useEffect(() => {
    if (token && featuredProperties.length > 0) {
      checkAllFavoriteStatus();
    } else if (!token) {
      const resetFavorites = {};
      featuredProperties.forEach(property => {
        resetFavorites[property._id] = false;
      });
      setIsFavorite(resetFavorites);
    }
  }, [token, featuredProperties]);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getFeatured();
      
      let properties = [];
      if (response.data.success) {
        properties = response.data.data?.properties || [];
      }
      
      // Fallback if no featured properties
      if (properties.length === 0) {
        const fallbackResponse = await propertyAPI.search({ limit: 6, sort: "-createdAt" });
        if (fallbackResponse.data.success) {
          properties = fallbackResponse.data.data?.properties || [];
        }
      }
      
      setFeaturedProperties(properties);
      const initialFavorites = {};
      properties.forEach(property => {
        initialFavorites[property._id] = false;
      });
      setIsFavorite(initialFavorites);
    } catch (error) {
      console.error("Error fetching featured properties:", error);
      setFeaturedProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const checkAllFavoriteStatus = async () => {
    if (!token || featuredProperties.length === 0) return;
    
    try {
      const favoriteStatusPromises = featuredProperties.map(async (property) => {
        try {
          const response = await propertyAPI.checkFavorite(property._id);
          return { 
            propertyId: property._id, 
            isFavorite: response.data.data?.isFavorite || false 
          };
        } catch (error) {
          return { propertyId: property._id, isFavorite: false };
        }
      });
      
      const results = await Promise.all(favoriteStatusPromises);
      const updatedFavorites = {};
      results.forEach(result => {
        updatedFavorites[result.propertyId] = result.isFavorite;
      });
      
      setIsFavorite(updatedFavorites);
    } catch (error) {
      console.error("Error checking all favorite statuses:", error);
    }
  };

  const toggleFavorite = async (e, propertyId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!token) {
      alert("Please login to add properties to your wishlist");
      navigate("/login");
      return;
    }

    if (favoriteLoading[propertyId]) return;

    try {
      setFavoriteLoading(prev => ({ ...prev, [propertyId]: true }));
      
      if (isFavorite[propertyId]) {
        await propertyAPI.removeFavorite(propertyId);
        setIsFavorite(prev => ({ ...prev, [propertyId]: false }));
      } else {
        await propertyAPI.addFavorite(propertyId);
        setIsFavorite(prev => ({ ...prev, [propertyId]: true }));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert(error.response?.data?.message || "Failed to update wishlist");
    } finally {
      setFavoriteLoading(prev => ({ ...prev, [propertyId]: false }));
    }
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current && featuredProperties.length > 0) {
      const containerWidth = carouselRef.current.clientWidth;
      const cardWidth = containerWidth < 768 ? containerWidth : containerWidth / 3;
      const scrollLeft = index * cardWidth;
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    if (featuredProperties.length === 0) return;
    const cardsPerView = window.innerWidth < 768 ? 1 : 3;
    const maxIndex = Math.max(0, featuredProperties.length - cardsPerView);
    const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    if (featuredProperties.length === 0) return;
    const cardsPerView = window.innerWidth < 768 ? 1 : 3;
    const maxIndex = Math.max(0, featuredProperties.length - cardsPerView);
    const prevIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const PropertyCard = ({ property }) => {
    const formatPrice = (price) => {
      if (!price && price !== 0) return "Price on request";
      return `AED ${price?.toLocaleString() || "0"}`;
    };

    return (
      <div
        className="flex-shrink-0 w-full md:w-1/3 px-4 mb-8"
        onClick={() => handlePropertyClick(property._id)}
      >
        <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer relative">
           {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
             <button 
              onClick={(e) => toggleFavorite(e, property._id)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white hover:text-red-500 transition-all duration-300"
            >
              <FiHeart className={`w-5 h-5 ${isFavorite[property._id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>

            <div className="absolute top-4 left-4 flex flex-col gap-2">
               <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                 {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
               </span>
               {property.isFeatured && (
                 <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                   Featured
                 </span>
               )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
               <span className="text-xl font-bold tracking-tight">{formatPrice(property.price)}</span>
               <div className="flex items-center space-x-1 text-xs font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <FiMapPin className="w-3 h-3" />
                  <span className="truncate max-w-[100px]">{property.location?.area || property.location?.city || "Abu Dhabi"}</span>
               </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
            
            <div className="flex items-center space-x-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">
               <div className="flex items-center space-x-1">
                  <span className="font-bold text-gray-900">{property.bedrooms || 0}</span>
                  <span>Beds</span>
               </div>
               <div className="flex items-center space-x-1">
                  <span className="font-bold text-gray-900">{property.bathrooms || 0}</span>
                  <span>Baths</span>
               </div>
               <div className="flex items-center space-x-1">
                  <span className="font-bold text-gray-900">{property.area?.toLocaleString() || 0}</span>
                  <span>Sqft</span>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden">
                     {property.listedBy?.profileImage ? (
                        <img src={property.listedBy.profileImage} alt="" className="w-full h-full object-cover" />
                     ) : (
                        <span className="text-blue-600 font-bold">{property.listedBy?.name?.charAt(0) || 'E'}</span>
                     )}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-gray-900 leading-none">{property.listedBy?.name || 'Elite Agent'}</span>
                     <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Verified Provider</span>
                  </div>
               </div>
               <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FiArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
           <div className="h-10 w-48 bg-gray-200 rounded-full animate-pulse mb-12"></div>
           <div className="flex space-x-6 overflow-hidden">
              {[1, 2, 3].map(i => (
                 <div key={i} className="w-1/3 h-[30rem] bg-white rounded-[2rem] animate-pulse"></div>
              ))}
           </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-4">
              <span>PREMIUM SELECTION</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Featured Highlights
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
             <Link
              to="/properties"
              className="text-gray-500 font-bold hover:text-blue-600 transition-colors mr-4"
            >
              Explore All
            </Link>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-gray-100 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                <FiArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-gray-100 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide -mx-4 pb-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <div className="w-full px-4">
               <div className="h-64 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 italic">
                  No highlighted listings currently available.
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiHeart,
//   FiMapPin,
//   FiHome,
//   FiStar,
//   FiArrowRight,
// } from "react-icons/fi";

// const FeaturedProperties = () => {
//   const navigate = useNavigate();
//   const carouselRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState({});

//   const featuredProperties = [
//     {
//       id: 1,
//       title:
//         "Prime Location Multiple Studio Available Near Mall of the Emirates",
//       location: "Al Barsha",
//       price: "AED 50,000",
//       image:
//         "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       type: "Studio",
//       beds: 0,
//       baths: 1,
//       area: "360 SqFt",
//       photos: 14,
//       timeAgo: "23 minutes",
//       agent: {
//         name: "City Tower Real Estate L.L.C",
//         logo: "https://dbz-images.dubizzle.com/profiles/property_agency/City-Tower_New-Thumb_2017.06.png?impolicy=agency",
//       },
//     },
//     {
//       id: 2,
//       title: "3BR+MAID+STUDY | SPACIOUS | SINGLE ROW",
//       location: "Reem",
//       price: "AED 175,000",
//       image:
//         "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       type: "Villa",
//       beds: 3,
//       baths: 4,
//       area: "2,882 SqFt",
//       photos: 19,
//       timeAgo: "26 minutes",
//       agent: {
//         name: "Savvy Homes Real Estate",
//         logo: "https://dbz-images.dubizzle.com/profiles/property_agency/2025/07/11/e7b4130c48de4b2e90e32372bbb39fd0-.jpg?impolicy=agency",
//       },
//     },
//     {
//       id: 3,
//       title: "Fully furnished 1 Bedroom Apartment | Burj views | High Floor",
//       location: "Sobha Hartland",
//       price: "AED 90,000",
//       image:
//         "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       type: "Apartment",
//       beds: 1,
//       baths: 1,
//       area: "515 SqFt",
//       photos: 10,
//       timeAgo: "28 minutes",
//       agent: {
//         name: "La Vida Nova Real Estate",
//         logo: "https://dbz-images.dubizzle.com/profiles/property_agency/1680154254_LAVIDANOVAREALESTATEL.L.C.png?impolicy=agency",
//       },
//     },
//     {
//       id: 4,
//       title: "Spacious | Open View | Peaceful | Ready to Move In",
//       location: "Jumeirah Village Circle (JVC)",
//       price: "AED 60,000",
//       image:
//         "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       type: "Studio",
//       beds: 0,
//       baths: 1,
//       area: "490 SqFt",
//       photos: 11,
//       timeAgo: "35 minutes",
//       agent: {
//         name: "Provident Real Estate",
//         logo: "https://dbz-images.dubizzle.com/profiles/property_agency/2025/08/11/0255228425fc4deeb1e2eeeaac97af6a-.jpg?impolicy=agency",
//       },
//     },
//     {
//       id: 5,
//       title: "4BR + Guest Room + Maid Room Villa with Garden",
//       location: "Dubai South",
//       price: "AED 200,000",
//       image:
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       type: "Villa",
//       beds: 4,
//       baths: 6,
//       area: "2,711 SqFt",
//       photos: 53,
//       timeAgo: "36 minutes",
//       agent: {
//         name: "The Legends Real Estate",
//         logo: "https://dbz-images.dubizzle.com/profiles/property_agency/the_legends_logo.jpg?impolicy=agency",
//       },
//     },
//     {
//       id: 6,
//       title: "Prime Location | 3BR+Maid | Ready to move",
//       location: "Dubai South",
//       price: "AED 120,000",
//       image:
//         "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       type: "Villa",
//       beds: 3,
//       baths: 4,
//       area: "1,577 SqFt",
//       photos: 30,
//       timeAgo: "42 minutes",
//       agent: {
//         name: "The Legends Real Estate",
//         logo: "https://dbz-images.dubizzle.com/profiles/property_agency/the_legends_logo.jpg?impolicy=agency",
//       },
//     },
//   ];

//   const toggleFavorite = (e, propertyId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsFavorite((prev) => ({
//       ...prev,
//       [propertyId]: !prev[propertyId],
//     }));
//   };

//   const handlePropertyClick = (propertyId) => {
//     navigate(`/property/${propertyId}`);
//   };

//   const scrollToIndex = (index) => {
//     if (carouselRef.current) {
//       const scrollLeft = index * 320; 
//       carouselRef.current.scrollTo({
//         left: scrollLeft,
//         behavior: "smooth",
//       });
//       setCurrentIndex(index);
//     }
//   };

//   const nextSlide = () => {
//     const nextIndex =
//       (currentIndex + 1) % Math.ceil(featuredProperties.length / 2);
//     scrollToIndex(nextIndex);
//   };

//   const prevSlide = () => {
//     const prevIndex =
//       currentIndex === 0
//         ? Math.ceil(featuredProperties.length / 2) - 1
//         : currentIndex - 1;
//     scrollToIndex(prevIndex);
//   };

//   const HeartIcon = ({ filled, onClick }) => (
//     <svg
//       viewBox="0 0 40 40"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       onClick={onClick}
//       className="cursor-pointer"
//       style={{ width: "24px", height: "24px" }}
//     >
//       <rect
//         x="6"
//         y="6"
//         width="28"
//         height="28"
//         rx="6"
//         fill="white"
//         fillOpacity="0.6"
//       ></rect>
//       <path
//         opacity="1"
//         d="M28.172 12.8791C27.112 11.8163 25.7068 11.1676 24.2103 11.0502C22.7139 10.9329 21.2248 11.3545 20.012 12.2391C18.7397 11.2927 17.156 10.8636 15.5799 11.0381C14.0038 11.2126 12.5524 11.9778 11.518 13.1797C10.4835 14.3815 9.94282 15.9306 10.0048 17.5151C10.0668 19.0996 10.7268 20.6017 11.852 21.7191L18.062 27.9391C18.582 28.4509 19.2824 28.7377 20.012 28.7377C20.7416 28.7377 21.442 28.4509 21.962 27.9391L28.172 21.7191C29.3396 20.5443 29.9949 18.9553 29.9949 17.2991C29.9949 15.6428 29.3396 14.0538 28.172 12.8791Z"
//         fill={filled ? "#ff3b30" : "transparent"}
//         stroke={filled ? "#ff3b30" : "#6b7280"}
//         strokeWidth="1.5"
//       ></path>
//     </svg>
//   );

//   const PropertyCard = ({ property }) => {
//     return (
//       <div
//         className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden flex-shrink-0 w-80"
//         onClick={() => handlePropertyClick(property.id)}
//       >
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={property.image}
//             alt={property.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute top-3 right-3">
//             <div
//               className="favorite-container bg-white bg-opacity-80 rounded-full p-1"
//               onClick={(e) => toggleFavorite(e, property.id)}
//             >
//               <HeartIcon filled={isFavorite[property.id]} />
//             </div>
//           </div>
//           <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
//             {property.photos} Photos
//           </div>
//         </div>

//         <div className="p-4">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <span className="text-lg font-bold text-gray-800">
//                 {property.price}
//               </span>
//               <h3 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">
//                 {property.title}
//               </h3>
//               <p className="text-gray-600 text-sm mt-1">
//                 {property.type} •{" "}
//                 {property.beds > 0
//                   ? `${property.beds} Bed${property.beds > 1 ? "s" : ""} • `
//                   : ""}
//                 {property.baths} Bath{property.baths > 1 ? "s" : ""} •{" "}
//                 {property.area}
//               </p>
//             </div>
//             <div className="flex-shrink-0 ml-2">
//               <img
//                 src={property.agent.logo}
//                 alt={property.agent.name}
//                 className="w-10 h-10 rounded-full object-cover border border-gray-200"
//               />
//             </div>
//           </div>

//           <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
//             <div className="flex items-center text-gray-600 text-sm">
//               <FiMapPin className="w-3 h-3 mr-1" />
//               <span>{property.location}</span>
//             </div>
//             <span className="text-gray-500 text-xs">{property.timeAgo}</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800">
//               Featured Properties
//             </h2>
//           </div>
//           <Link
//             to="/properties"
//             className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
//           >
//             See more Property for Rent listings
//             <FiArrowRight className="ml-1 w-5 h-5" />
//           </Link>
//         </div>

//         <div className="relative">
//           <div
//             ref={carouselRef}
//             className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {featuredProperties.map((property) => (
//               <PropertyCard key={property.id} property={property} />
//             ))}
//           </div>

//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 8 12"
//               fill="#212223"
//               height="14"
//               width="14"
//             >
//               <path d="M7.41008 1.41008L2.82008 6.00008L7.41008 10.5901L6.00008 12.0001L0.00008 6.00008L6.00008 0.00008L7.41008 1.41008Z"></path>
//             </svg>
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 8 12"
//               fill="#212223"
//               height="14"
//               width="14"
//             >
//               <path d="M0.419922 10.5899L4.999922 5.99992L0.419922 1.40992L1.829922 -7.62939e-05L7.829922 5.99992L1.829922 11.9999L0.419922 10.5899Z"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProperties;

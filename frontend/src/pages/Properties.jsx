// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";

// const Properties = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 500000]);
//   const [bedrooms, setBedrooms] = useState("any");
//   const [furnishing, setFurnishing] = useState("any");
//   const [amenities, setAmenities] = useState({
//     parking: false,
//     pool: false,
//     gym: false,
//     balcony: false,
//   });
//   const [location, setLocation] = useState("any");
//   const [sortBy, setSortBy] = useState("newest");
//   const [showMoreFilters, setShowMoreFilters] = useState(false);

//   const allProperties = [
//     {
//       id: 1,
//       title: "2BR Luxury Apartment with Sea View",
//       price: 120000,
//       type: "apartments-for-sale",
//       beds: 2,
//       baths: 2,
//       area: 1200,
//       location: "Al Reem Island",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//       date: "2 hours ago",
//       featured: true,
//       furnishing: "furnished",
//       amenities: ["parking", "gym", "balcony"],
//       verified: true,
//       agent: "Premium Real Estate",
//       agentVerified: true,
//     },
//     {
//       id: 2,
//       title: "4BR Villa with Private Pool",
//       price: 280000,
//       type: "villas-for-sale",
//       beds: 4,
//       baths: 4,
//       area: 3200,
//       location: "Khalifa City",
//       city: "Abu Dhabi",
//       image:
//         "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
//       date: "5 hours ago",
//       featured: false,
//       furnishing: "unfurnished",
//       amenities: ["parking", "pool", "gym"],
//       verified: true,
//       agent: "Luxury Properties",
//       agentVerified: true,
//     },
//     {
//       id: 3,
//       title: "Studio Apartment Near Mosque",
//       price: 45000,
//       type: "apartments-for-sale",
//       beds: 1,
//       baths: 1,
//       area: 800,
//       location: "Mohammed Bin Zayed City",
//       city: "Abu Dhabi",
//       image:
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
//       date: "1 day ago",
//       featured: false,
//       furnishing: "furnished",
//       amenities: ["parking", "balcony"],
//       verified: false,
//       agent: "City Realty",
//       agentVerified: false,
//     },
//     {
//       id: 4,
//       title: "3BR Townhouse for Family",
//       price: 180000,
//       type: "villas-for-sale",
//       beds: 3,
//       baths: 2,
//       area: 1600,
//       location: "Shakhbout City",
//       city: "Abu Dhabi",
//       image:
//         "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
//       date: "3 hours ago",
//       featured: true,
//       furnishing: "semi-furnished",
//       amenities: ["parking", "pool"],
//       verified: true,
//       agent: "Family Homes",
//       agentVerified: true,
//     },
//     {
//       id: 5,
//       title: "Commercial Office Space",
//       price: 850000,
//       type: "commercial-for-sale",
//       beds: 0,
//       baths: 2,
//       area: 2500,
//       location: "Downtown",
//       city: "Abu Dhabi",
//       image:
//         "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
//       date: "6 hours ago",
//       featured: false,
//       furnishing: "unfurnished",
//       amenities: ["parking"],
//       verified: true,
//       agent: "Commercial Real Estate",
//       agentVerified: true,
//     },
//     {
//       id: 6,
//       title: "1BR Apartment for Rent",
//       price: 55000,
//       type: "apartments-for-sale",
//       beds: 1,
//       baths: 1,
//       area: 900,
//       location: "Al Raha Beach",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
//       date: "8 hours ago",
//       featured: false,
//       furnishing: "furnished",
//       amenities: ["gym", "balcony"],
//       verified: false,
//       agent: "Beach Properties",
//       agentVerified: false,
//     },
//   ];

//   const locations = [
//     "Al Reem Island",
//     "Khalifa City",
//     "Mohammed Bin Zayed City",
//     "Shakhbout City",
//     "Downtown",
//     "Al Raha Beach",
//     "Yas Island",
//     "Saadiyat Island",
//   ];

//   useEffect(() => {
//     const category = searchParams.get("category");
//     if (category) setSelectedCategory(category);
//   }, [searchParams]);

//   const filteredProperties = allProperties.filter((property) => {
//     if (selectedCategory !== "all" && property.type !== selectedCategory)
//       return false;
//     if (property.price < priceRange[0] || property.price > priceRange[1])
//       return false;
//     if (bedrooms !== "any" && property.beds !== parseInt(bedrooms))
//       return false;
//     if (furnishing !== "any" && property.furnishing !== furnishing)
//       return false;
//     if (location !== "any" && property.location !== location) return false;

//     const selectedAmenities = Object.keys(amenities).filter(
//       (key) => amenities[key]
//     );
//     if (selectedAmenities.length > 0) {
//       const hasAllAmenities = selectedAmenities.every((amenity) =>
//         property.amenities.includes(amenity)
//       );
//       if (!hasAllAmenities) return false;
//     }

//     return true;
//   });

//   const categories = [
//     { value: "all", label: "All Properties", count: allProperties.length },
//     {
//       value: "apartments-for-sale",
//       label: "Apartments for Sale",
//       count: allProperties.filter((p) => p.type === "apartments-for-sale")
//         .length,
//     },
//     {
//       value: "villas-for-sale",
//       label: "Villas for Sale",
//       count: allProperties.filter((p) => p.type === "villas-for-sale").length,
//     },
//     {
//       value: "commercial-for-sale",
//       label: "Commercial for Sale",
//       count: allProperties.filter((p) => p.type === "commercial-for-sale")
//         .length,
//     },
//   ];

//   const handleAmenityChange = (amenity) => {
//     setAmenities((prev) => ({
//       ...prev,
//       [amenity]: !prev[amenity],
//     }));
//   };

//   const resetFilters = () => {
//     setSelectedCategory("all");
//     setPriceRange([0, 500000]);
//     setBedrooms("any");
//     setFurnishing("any");
//     setLocation("any");
//     setAmenities({
//       parking: false,
//       pool: false,
//       gym: false,
//       balcony: false,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-6">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Property for Sale in Abu Dhabi
//               </h1>
//               <p className="text-gray-600 text-sm mt-1">
//                 {filteredProperties.length} properties found
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-600 whitespace-nowrap">
//                 Sort by:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
//               >
//                 <option value="newest">Newest</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Property Type
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.value}
//                     onClick={() => setSelectedCategory(cat.value)}
//                     className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
//                       selectedCategory === cat.value
//                         ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
//                     }`}
//                   >
//                     {cat.label} ({cat.count})
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price Range (AED)
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     value={priceRange[0]}
//                     onChange={(e) =>
//                       setPriceRange([
//                         parseInt(e.target.value) || 0,
//                         priceRange[1],
//                       ])
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                     placeholder="Min"
//                   />
//                   <input
//                     type="number"
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       setPriceRange([
//                         priceRange[0],
//                         parseInt(e.target.value) || 0,
//                       ])
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                     placeholder="Max"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bedrooms
//                 </label>
//                 <select
//                   value={bedrooms}
//                   onChange={(e) => setBedrooms(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 >
//                   <option value="any">Any Bedrooms</option>
//                   <option value="1">1 Bedroom</option>
//                   <option value="2">2 Bedrooms</option>
//                   <option value="3">3 Bedrooms</option>
//                   <option value="4">4+ Bedrooms</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Location
//                 </label>
//                 <select
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 >
//                   <option value="any">Any Location</option>
//                   {locations.map((loc) => (
//                     <option key={loc} value={loc}>
//                       {loc}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//               <button
//                 onClick={() => setShowMoreFilters(!showMoreFilters)}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//               >
//                 {showMoreFilters ? "Fewer Filters" : "More Filters"}
//                 <span
//                   className={`transform transition-transform ${
//                     showMoreFilters ? "rotate-180" : ""
//                   }`}
//                 >
//                   ▼
//                 </span>
//               </button>

//               <button
//                 onClick={resetFilters}
//                 className="text-gray-600 hover:text-gray-800 text-sm font-medium"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//             {showMoreFilters && (
//               <div className="pt-4 border-t border-gray-200 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Furnishing
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {["any", "furnished", "semi-furnished", "unfurnished"].map(
//                       (furnish) => (
//                         <button
//                           key={furnish}
//                           onClick={() => setFurnishing(furnish)}
//                           className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
//                             furnishing === furnish
//                               ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                               : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
//                           }`}
//                         >
//                           {furnish === "any"
//                             ? "Any Furnishing"
//                             : furnish.charAt(0).toUpperCase() +
//                               furnish.slice(1).replace("-", " ")}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Amenities
//                   </label>
//                   <div className="flex flex-wrap gap-4">
//                     {[
//                       { key: "parking", label: "Parking" },
//                       { key: "pool", label: "Swimming Pool" },
//                       { key: "gym", label: "Gym" },
//                       { key: "balcony", label: "Balcony" },
//                     ].map((amenity) => (
//                       <label
//                         key={amenity.key}
//                         className="flex items-center space-x-2 cursor-pointer group"
//                       >
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             checked={amenities[amenity.key]}
//                             onChange={() => handleAmenityChange(amenity.key)}
//                             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                           />
//                         </div>
//                         <span className="text-sm text-gray-700 group-hover:text-gray-900">
//                           {amenity.label}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {filteredProperties.length === 0 ? (
//           <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//             <div className="text-6xl mb-4">🏠</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               No properties found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your filters to see more results
//             </p>
//             <button
//               onClick={resetFilters}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredProperties.map((property) => (
//               <div
//                 key={property.id}
//                 className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
//               >
//                 <div className="flex flex-col sm:flex-row">
//                   <div className="sm:w-80 relative">
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className="w-full h-48 sm:h-full object-cover"
//                     />
//                     <div className="absolute top-3 left-3 flex flex-col gap-2">
//                       {property.featured && (
//                         <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
//                           Featured
//                         </span>
//                       )}
//                       {property.verified && (
//                         <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                           Verified
//                         </span>
//                       )}
//                     </div>
//                     <button className="absolute top-3 right-3 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md">
//                       ♡
//                     </button>
//                   </div>
//                   <div className="flex-1 p-6">
//                     <div className="flex flex-col h-full">
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-900 text-lg mb-1 hover:text-blue-600 cursor-pointer">
//                             {property.title}
//                           </h3>
//                           <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                             <span>
//                               📍 {property.location}, {property.city}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="text-2xl font-bold text-blue-600 whitespace-nowrap ml-4">
//                           AED {property.price.toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
//                         <span className="flex items-center gap-1">
//                           <span className="text-lg">🛏️</span>
//                           {property.beds} bed{property.beds !== 1 ? "s" : ""}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <span className="text-lg">🚿</span>
//                           {property.baths} bath{property.baths !== 1 ? "s" : ""}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <span className="text-lg">📐</span>
//                           {property.area.toLocaleString()} sq.ft
//                         </span>
//                         <span className="flex items-center gap-1 capitalize">
//                           <span className="text-lg">🛋️</span>
//                           {property.furnishing}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 mb-4 flex-wrap">
//                         {property.amenities.map((amenity) => (
//                           <span
//                             key={amenity}
//                             className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium capitalize"
//                           >
//                             {amenity}
//                           </span>
//                         ))}
//                       </div>
//                       <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-500">
//                             {property.date}
//                           </span>
//                           <span className="text-gray-300">•</span>
//                           <div className="flex items-center gap-1">
//                             <span className="text-sm text-gray-600">
//                               {property.agent}
//                             </span>
//                             {property.agentVerified && (
//                               <span className="text-blue-500 text-xs">✓</span>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex gap-2">
//                           <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition duration-200">
//                             📞 Call
//                           </button>
//                           <button
//                             onClick={() => navigate(`/property/${property.id}`)}
//                             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200"
//                           >
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Properties;

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/routeapi";

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
      // Get initial filters without any category selected
      const params = new URLSearchParams();
      params.append("category", "all"); // Get counts for all categories

      const response = await api.get(`/properties/search?${params.toString()}`);
      const data = response.data.data;

      if (data && data.filters) {
        const filters = data.filters;

        // Add "All Properties" category
        const allCategory = {
          value: "all",
          label: "All Properties",
          count: filters.totalCount || 0,
        };

        setCategories([allCategory, ...(filters.categories || [])]);

        // Fix: Extract just the location strings, not the objects
        if (filters.locations) {
          // locations is an array of objects like [{value: "Al Reem Island", label: "Al Reem Island", count: 5}, ...]
          // We need to extract just the value strings for the dropdown
          const locationValues = filters.locations
            .filter((loc) => loc && loc.value) // Filter out null/undefined
            .map((loc) => loc.value); // Extract just the value string

          setLocations(locationValues);
        }

        if (filters.minPrice && filters.maxPrice) {
          setPriceRange([filters.minPrice, filters.maxPrice]);
        }
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
      // Set default categories
      setCategories([
        { value: "all", label: "All Properties", count: 0 },
        { value: "apartments", label: "Apartments", count: 0 },
        { value: "villas", label: "Villas", count: 0 },
        { value: "townhouses", label: "Townhouses", count: 0 },
        { value: "commercial", label: "Commercial", count: 0 },
        { value: "land", label: "Land", count: 0 },
        { value: "rooms", label: "Rooms", count: 0 },
        { value: "warehouses", label: "Warehouses", count: 0 },
        { value: "buildings", label: "Buildings", count: 0 },
      ]);

      // Set default locations as strings
      setLocations([
        "Al Reem Island",
        "Khalifa City",
        "Mohammed Bin Zayed City",
        "Shakhbout City",
        "Downtown",
        "Al Raha Beach",
        "Yas Island",
        "Saadiyat Island",
      ]);
    }
  };
  // const fetchFilters = async () => {
  //   try {
  //     const response = await api.get("/properties/search");
  //     const filters = response.data.data.filters || {};
  //     if (filters.categories) {
  //       const allCategory = {
  //         value: "all",
  //         label: "All Properties",
  //         count: filters.categories.reduce((sum, cat) => sum + cat.count, 0),
  //       };
  //       setCategories([allCategory, ...filters.categories]);
  //     }
  //     if (filters.locations) {
  //       setLocations(filters.locations);
  //     }
  //     if (filters.minPrice && filters.maxPrice) {
  //       setPriceRange([filters.minPrice, filters.maxPrice]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching filters:", error);
  //     setCategories([
  //       { value: "all", label: "All Properties", count: 0 },
  //       { value: "apartments", label: "Apartments", count: 0 },
  //       { value: "villas", label: "Villas", count: 0 },
  //       { value: "townhouses", label: "Townhouses", count: 0 },
  //       { value: "commercial", label: "Commercial", count: 0 },
  //       { value: "land", label: "Land", count: 0 },
  //       { value: "rooms", label: "Rooms", count: 0 },
  //       { value: "warehouses", label: "Warehouses", count: 0 },
  //       { value: "buildings", label: "Buildings", count: 0 },
  //     ]);
  //     setLocations([
  //       "Al Reem Island",
  //       "Khalifa City",
  //       "Mohammed Bin Zayed City",
  //       "Shakhbout City",
  //       "Downtown",
  //       "Al Raha Beach",
  //       "Yas Island",
  //       "Saadiyat Island",
  //     ]);
  //   }
  // };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 500000]);
    setBedrooms("any");
    setFurnishing("any");
    setLocation("any");
  };

  const getCategoryLabel = (category) => {
    const labels = {
      apartments: "Apartments",
      villas: "Villas",
      townhouses: "Townhouses",
      commercial: "Commercial",
      land: "Land",
      rooms: "Rooms",
      warehouses: "Warehouses",
      buildings: "Buildings",
    };
    return labels[category] || category;
  };

  const formatDate = (dateString) => {
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Property for Sale in Abu Dhabi
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {loading
                  ? "Loading..."
                  : `${properties.length} properties found`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {cat.label} ({cat.count})
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
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-80 relative">
                    <img
                      src={
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
                      }
                      alt={property.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {property.isUrgent && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                          Urgent
                        </span>
                      )}
                      {property.isVerified && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Verified
                        </span>
                      )}
                      {property.purpose === "rent" && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          For Rent
                        </span>
                      )}
                    </div>
                    <button className="absolute top-3 right-3 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md">
                      ♡
                    </button>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3
                            className="font-semibold text-gray-900 text-lg mb-1 hover:text-blue-600 cursor-pointer"
                            onClick={() =>
                              navigate(`/property/${property._id}`)
                            }
                          >
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>
                              📍{" "}
                              {property.location?.area ||
                                property.location?.city ||
                                "Abu Dhabi"}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="capitalize">
                              {getCategoryLabel(property.category)}
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 whitespace-nowrap ml-4">
                          AED {property.price?.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">🛏️</span>
                          {property.bedrooms} bed
                          {property.bedrooms !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">🚿</span>
                          {property.bathrooms} bath
                          {property.bathrooms !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">📐</span>
                          {property.area?.toLocaleString()}{" "}
                          {property.areaUnit || "sqft"}
                        </span>
                        {property.furnishing && (
                          <span className="flex items-center gap-1 capitalize">
                            <span className="text-lg">🛋️</span>
                            {property.furnishing}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {property.features
                          ?.slice(0, 3)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium capitalize"
                            >
                              {feature}
                            </span>
                          ))}
                        {property.amenities?.building
                          ?.slice(0, 2)
                          .map((amenity, index) => (
                            <span
                              key={`building-${index}`}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium capitalize"
                            >
                              {amenity}
                            </span>
                          ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {formatDate(property.createdAt)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">
                              {property.listedBy?.name || "Property Owner"}
                            </span>
                            {property.listedBy?.verified && (
                              <span className="text-blue-500 text-xs">✓</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition duration-200">
                            📞 Call
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/property/${property._id}`)
                            }
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200"
                          >
                            View Details
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

// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";

// const Properties = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 500000]);
//   const [bedrooms, setBedrooms] = useState("any");
//   const [furnishing, setFurnishing] = useState("any");
//   const [amenities, setAmenities] = useState({
//     parking: false,
//     pool: false,
//     gym: false,
//     balcony: false,
//   });
//   const [location, setLocation] = useState("any");
//   const [sortBy, setSortBy] = useState("newest");

//   // Sample properties data
//   const allProperties = [
//     {
//       id: 1,
//       title: "2BR Luxury Apartment with Sea View",
//       price: 120000,
//       type: "apartments-for-sale",
//       beds: 2,
//       baths: 2,
//       area: 1200,
//       location: "Al Reem Island",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//       date: "2 hours ago",
//       featured: true,
//       furnishing: "furnished",
//       amenities: ["parking", "gym", "balcony"],
//       verified: true,
//       agent: "Premium Real Estate",
//       agentVerified: true
//     },
//     {
//       id: 2,
//       title: "4BR Villa with Private Pool",
//       price: 280000,
//       type: "villas-for-sale",
//       beds: 4,
//       baths: 4,
//       area: 3200,
//       location: "Khalifa City",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
//       date: "5 hours ago",
//       featured: false,
//       furnishing: "unfurnished",
//       amenities: ["parking", "pool", "gym"],
//       verified: true,
//       agent: "Luxury Properties",
//       agentVerified: true
//     },
//     {
//       id: 3,
//       title: "Studio Apartment Near Mosque",
//       price: 45000,
//       type: "apartments-for-sale",
//       beds: 1,
//       baths: 1,
//       area: 800,
//       location: "Mohammed Bin Zayed City",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
//       date: "1 day ago",
//       featured: false,
//       furnishing: "furnished",
//       amenities: ["parking", "balcony"],
//       verified: false,
//       agent: "City Realty",
//       agentVerified: false
//     },
//     {
//       id: 4,
//       title: "3BR Townhouse for Family",
//       price: 180000,
//       type: "villas-for-sale",
//       beds: 3,
//       baths: 2,
//       area: 1600,
//       location: "Shakhbout City",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
//       date: "3 hours ago",
//       featured: true,
//       furnishing: "semi-furnished",
//       amenities: ["parking", "pool"],
//       verified: true,
//       agent: "Family Homes",
//       agentVerified: true
//     },
//     {
//       id: 5,
//       title: "Commercial Office Space",
//       price: 850000,
//       type: "commercial-for-sale",
//       beds: 0,
//       baths: 2,
//       area: 2500,
//       location: "Downtown",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
//       date: "6 hours ago",
//       featured: false,
//       furnishing: "unfurnished",
//       amenities: ["parking"],
//       verified: true,
//       agent: "Commercial Real Estate",
//       agentVerified: true
//     },
//     {
//       id: 6,
//       title: "1BR Apartment for Rent",
//       price: 55000,
//       type: "apartments-for-sale",
//       beds: 1,
//       baths: 1,
//       area: 900,
//       location: "Al Raha Beach",
//       city: "Abu Dhabi",
//       image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
//       date: "8 hours ago",
//       featured: false,
//       furnishing: "furnished",
//       amenities: ["gym", "balcony"],
//       verified: false,
//       agent: "Beach Properties",
//       agentVerified: false
//     },
//   ];

//   const locations = [
//     "Al Reem Island",
//     "Khalifa City",
//     "Mohammed Bin Zayed City",
//     "Shakhbout City",
//     "Downtown",
//     "Al Raha Beach",
//     "Yas Island",
//     "Saadiyat Island"
//   ];

//   useEffect(() => {
//     const category = searchParams.get("category");
//     if (category) setSelectedCategory(category);
//   }, [searchParams]);

//   const filteredProperties = allProperties.filter((property) => {
//     if (selectedCategory !== "all" && property.type !== selectedCategory)
//       return false;
//     if (property.price < priceRange[0] || property.price > priceRange[1])
//       return false;
//     if (bedrooms !== "any" && property.beds !== parseInt(bedrooms))
//       return false;
//     if (furnishing !== "any" && property.furnishing !== furnishing)
//       return false;
//     if (location !== "any" && property.location !== location)
//       return false;

//     const selectedAmenities = Object.keys(amenities).filter(key => amenities[key]);
//     if (selectedAmenities.length > 0) {
//       const hasAllAmenities = selectedAmenities.every(amenity =>
//         property.amenities.includes(amenity)
//       );
//       if (!hasAllAmenities) return false;
//     }

//     return true;
//   });

//   const categories = [
//     { value: "all", label: "All Properties", count: allProperties.length },
//     {
//       value: "apartments-for-sale",
//       label: "Apartments for Sale",
//       count: allProperties.filter((p) => p.type === "apartments-for-sale").length,
//     },
//     {
//       value: "villas-for-sale",
//       label: "Villas for Sale",
//       count: allProperties.filter((p) => p.type === "villas-for-sale").length,
//     },
//     {
//       value: "commercial-for-sale",
//       label: "Commercial for Sale",
//       count: allProperties.filter((p) => p.type === "commercial-for-sale").length,
//     },
//   ];

//   const handleAmenityChange = (amenity) => {
//     setAmenities(prev => ({
//       ...prev,
//       [amenity]: !prev[amenity]
//     }));
//   };

//   const resetFilters = () => {
//     setSelectedCategory("all");
//     setPriceRange([0, 500000]);
//     setBedrooms("any");
//     setFurnishing("any");
//     setLocation("any");
//     setAmenities({
//       parking: false,
//       pool: false,
//       gym: false,
//       balcony: false,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-6">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <nav className="text-sm text-gray-500">
//             <span>UAE</span>
//             <span className="mx-2">›</span>
//             <span>Abu Dhabi</span>
//             <span className="mx-2">›</span>
//             <span className="text-gray-800 font-medium">Property For Sale</span>
//           </nav>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filters Sidebar - Dubizzle Style */}
//           <div className="lg:w-80">
//             <div className="bg-white rounded-lg border border-gray-200 sticky top-6">
//               {/* Filters Header */}
//               <div className="border-b border-gray-200 p-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//                   <button
//                     onClick={resetFilters}
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                   >
//                     Clear all
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
//                 {/* Category Filter */}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
//                     PROPERTY TYPE
//                   </h4>
//                   <div className="space-y-2">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat.value}
//                         onClick={() => setSelectedCategory(cat.value)}
//                         className={`w-full text-left px-3 py-2 rounded transition duration-200 text-sm flex justify-between items-center ${
//                           selectedCategory === cat.value
//                             ? "bg-blue-50 text-blue-600 border border-blue-200"
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                       >
//                         <span>{cat.label}</span>
//                         <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs min-w-8 text-center">
//                           {cat.count}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Range */}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
//                     PRICE (AED)
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={priceRange[0]}
//                         onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
//                         className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                         placeholder="Min"
//                       />
//                       <input
//                         type="number"
//                         value={priceRange[1]}
//                         onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
//                         className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                         placeholder="Max"
//                       />
//                     </div>
//                     <div className="px-1">
//                       <input
//                         type="range"
//                         min="0"
//                         max="500000"
//                         step="10000"
//                         value={priceRange[1]}
//                         onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                         className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bedrooms */}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
//                     BEDROOMS
//                   </h4>
//                   <div className="grid grid-cols-4 gap-2">
//                     {["any", "1", "2", "3", "4", "5", "6", "7+"].map((bed) => (
//                       <button
//                         key={bed}
//                         onClick={() => setBedrooms(bed)}
//                         className={`px-3 py-2 rounded border text-sm font-medium ${
//                           bedrooms === bed
//                             ? "bg-blue-600 text-white border-blue-600"
//                             : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                         }`}
//                       >
//                         {bed === "any" ? "Any" : bed === "7+" ? "7+" : bed}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
//                     LOCATION
//                   </h4>
//                   <select
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                   >
//                     <option value="any">Any Location</option>
//                     {locations.map((loc) => (
//                       <option key={loc} value={loc}>{loc}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Furnishing */}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
//                     FURNISHING
//                   </h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {["any", "furnished", "unfurnished"].map((furnish) => (
//                       <button
//                         key={furnish}
//                         onClick={() => setFurnishing(furnish)}
//                         className={`px-3 py-2 rounded border text-sm font-medium ${
//                           furnishing === furnish
//                             ? "bg-blue-600 text-white border-blue-600"
//                             : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                         }`}
//                       >
//                         {furnish === "any" ? "Any" : furnish.charAt(0).toUpperCase() + furnish.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Amenities */}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
//                     AMENITIES
//                   </h4>
//                   <div className="space-y-2">
//                     {[
//                       { key: "parking", label: "Parking" },
//                       { key: "pool", label: "Swimming Pool" },
//                       { key: "gym", label: "Gym" },
//                       { key: "balcony", label: "Balcony" },
//                     ].map((amenity) => (
//                       <label key={amenity.key} className="flex items-center space-x-3 cursor-pointer group">
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             checked={amenities[amenity.key]}
//                             onChange={() => handleAmenityChange(amenity.key)}
//                             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                           />
//                         </div>
//                         <span className="text-sm text-gray-700 group-hover:text-gray-900">{amenity.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Header */}
//             <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     Property for Sale in Abu Dhabi
//                   </h1>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {filteredProperties.length} properties found
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
//                   >
//                     <option value="newest">Newest</option>
//                     <option value="price-low">Price: Low to High</option>
//                     <option value="price-high">Price: High to Low</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Properties List */}
//             {filteredProperties.length === 0 ? (
//               <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//                 <div className="text-6xl mb-4">🏠</div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   No properties found
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Try adjusting your filters to see more results
//                 </p>
//                 <button
//                   onClick={resetFilters}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredProperties.map((property) => (
//                   <div
//                     key={property.id}
//                     className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
//                   >
//                     <div className="flex flex-col sm:flex-row">
//                       {/* Property Image */}
//                       <div className="sm:w-80 relative">
//                         <img
//                           src={property.image}
//                           alt={property.title}
//                           className="w-full h-48 sm:h-full object-cover"
//                         />
//                         <div className="absolute top-3 left-3 flex flex-col gap-2">
//                           {property.featured && (
//                             <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
//                               Featured
//                             </span>
//                           )}
//                           {property.verified && (
//                             <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                               Verified
//                             </span>
//                           )}
//                         </div>
//                         <button className="absolute top-3 right-3 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md">
//                           ♡
//                         </button>
//                       </div>

//                       {/* Property Details */}
//                       <div className="flex-1 p-6">
//                         <div className="flex flex-col h-full">
//                           {/* Header */}
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-gray-900 text-lg mb-1 hover:text-blue-600 cursor-pointer">
//                                 {property.title}
//                               </h3>
//                               <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                                 <span>📍 {property.location}, {property.city}</span>
//                               </div>
//                             </div>
//                             <div className="text-2xl font-bold text-blue-600 whitespace-nowrap ml-4">
//                               AED {property.price.toLocaleString()}
//                             </div>
//                           </div>

//                           {/* Property Features */}
//                           <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
//                             <span className="flex items-center gap-1">
//                               <span className="text-lg">🛏️</span>
//                               {property.beds} bed{property.beds !== 1 ? 's' : ''}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <span className="text-lg">🚿</span>
//                               {property.baths} bath{property.baths !== 1 ? 's' : ''}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <span className="text-lg">📐</span>
//                               {property.area.toLocaleString()} sq.ft
//                             </span>
//                             <span className="flex items-center gap-1 capitalize">
//                               <span className="text-lg">🛋️</span>
//                               {property.furnishing}
//                             </span>
//                           </div>

//                           {/* Amenities */}
//                           <div className="flex items-center gap-2 mb-4 flex-wrap">
//                             {property.amenities.map((amenity) => (
//                               <span
//                                 key={amenity}
//                                 className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium capitalize"
//                               >
//                                 {amenity}
//                               </span>
//                             ))}
//                           </div>

//                           {/* Footer */}
//                           <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
//                             <div className="flex items-center gap-2">
//                               <span className="text-sm text-gray-500">{property.date}</span>
//                               <span className="text-gray-300">•</span>
//                               <div className="flex items-center gap-1">
//                                 <span className="text-sm text-gray-600">{property.agent}</span>
//                                 {property.agentVerified && (
//                                   <span className="text-blue-500 text-xs">✓</span>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition duration-200">
//                                 📞 Call
//                               </button>
//                               <button
//                                 onClick={() => navigate(`/property/${property.id}`)}
//                                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200"
//                               >
//                                 View Details
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Properties;

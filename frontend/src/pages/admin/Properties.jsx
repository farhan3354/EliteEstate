import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/routeapi";
import {
  FiHome,
  FiEdit,
  FiTrash2,
  FiEye,
  FiFilter,
  FiRefreshCw,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiStar,
  FiCheck,
  FiX,
} from "react-icons/fi";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    soldProperties: 0,
    rentedProperties: 0,
    inactiveProperties: 0,
  });

  const token = useSelector((state) => state.auth.token);

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/properties/admin", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: pagination.page,
          limit: pagination.limit,
          status: filterStatus !== "all" ? filterStatus : undefined,
          purpose: filterType !== "all" ? filterType : undefined,
          category: filterCategory !== "all" ? filterCategory : undefined,
          search: searchTerm || undefined,
        },
      });

      if (response.data.success) {
        setProperties(response.data.data.properties);
        setPagination(response.data.data.pagination);
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProperties();
    }
  }, [token, pagination.page, filterStatus, filterType, filterCategory]);

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchProperties();
  };

  const updatePropertyStatus = async (propertyId, status) => {
    try {
      const response = await api.put(
        `/properties/${propertyId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchProperties(); // Refresh list
        alert(`Property status updated to ${status}`);
      }
    } catch (error) {
      console.error("Error updating property status:", error);
      alert("Failed to update property status");
    }
  };

  const toggleFeatured = async (propertyId, isFeatured) => {
    try {
      const response = await api.put(
        `/properties/${propertyId}`,
        { isFeatured: !isFeatured },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchProperties(); // Refresh list
        alert(
          `Property ${!isFeatured ? "featured" : "unfeatured"} successfully`
        );
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("Failed to update featured status");
    }
  };

  const toggleVerified = async (propertyId, isVerified) => {
    try {
      const response = await api.put(
        `/properties/${propertyId}`,
        { isVerified: !isVerified },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchProperties(); // Refresh list
        alert(
          `Property ${!isVerified ? "verified" : "unverified"} successfully`
        );
      }
    } catch (error) {
      console.error("Error toggling verified:", error);
      alert("Failed to update verified status");
    }
  };

  const deleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await api.delete(`/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          fetchProperties(); // Refresh list
          alert("Property deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property");
      }
    }
  };

  if (loading && properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Properties Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all property listings in the system
          </p>
        </div>
        <button
          onClick={fetchProperties}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiRefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalProperties}
            </p>
            <p className="text-gray-600">Total Properties</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.activeProperties}
            </p>
            <p className="text-gray-600">Active</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.soldProperties}
            </p>
            <p className="text-gray-600">Sold</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.rentedProperties}
            </p>
            <p className="text-gray-600">Rented</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">
              {stats.inactiveProperties}
            </p>
            <p className="text-gray-600">Inactive</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search properties by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPagination({ ...pagination, page: 1 });
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPagination({ ...pagination, page: 1 });
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-16 flex-shrink-0">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <FiHome className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiMapPin className="w-3 h-3 mr-1" />
                          {property.location?.area || "N/A"}
                        </div>
                        <div className="text-sm font-bold text-blue-600 flex items-center">
                          <FiDollarSign className="w-3 h-3 mr-1" />
                          AED {property.price?.toLocaleString()}
                          {property.purpose === "rent" && "/month"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <FiHome className="w-3 h-3 mr-1" />
                        {property.category || "N/A"}
                      </div>
                      <div className="flex items-center mt-1">
                        <span>🛏️ {property.bedrooms || 0} Beds</span>
                        <span className="mx-2">•</span>
                        <span>🚿 {property.bathrooms || 0} Baths</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span>
                          📏 {property.area || 0} {property.areaUnit || "sqft"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {property.listedBy?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.listedBy?.email || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <FiCalendar className="w-3 h-3 inline mr-1" />
                      {new Date(property.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === "active"
                            ? "bg-green-100 text-green-800"
                            : property.status === "sold"
                            ? "bg-purple-100 text-purple-800"
                            : property.status === "rented"
                            ? "bg-yellow-100 text-yellow-800"
                            : property.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {property.status}
                      </span>
                      <div className="flex space-x-1">
                        {property.isFeatured && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                            <FiStar className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                        {property.isVerified && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            <FiCheck className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            updatePropertyStatus(
                              property._id,
                              property.status === "active"
                                ? "inactive"
                                : "active"
                            )
                          }
                          className={`px-2 py-1 text-xs rounded ${
                            property.status === "active"
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {property.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                        <button
                          onClick={() =>
                            toggleFeatured(property._id, property.isFeatured)
                          }
                          className={`px-2 py-1 text-xs rounded ${
                            property.isFeatured
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          }`}
                        >
                          {property.isFeatured ? "sold" : "unsold"}
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            toggleVerified(property._id, property.isVerified)
                          }
                          className={`px-2 py-1 text-xs rounded ${
                            property.isVerified
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          {property.isVerified ? "Rented" : "unrent"}
                        </button>
                        <button
                          onClick={() => deleteProperty(property._id)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing page {pagination.page} of {pagination.pages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
                disabled={pagination.page === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {properties.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProperties;

// import React, { useState, useEffect } from "react";

// const AdminProperties = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterType, setFilterType] = useState("all");

//   // Mock data - replace with actual API call
//   useEffect(() => {
//     const mockProperties = [
//       {
//         id: 1,
//         title: "Luxury 3BR Apartment with Sea View",
//         price: 2800000,
//         type: "sale",
//         category: "apartments",
//         status: "active",
//         featured: true,
//         views: 1247,
//         favorites: 89,
//         listedBy: { name: "Sarah Wilson" },
//         location: { area: "Al Reem Island" },
//         createdAt: "2024-01-15",
//         images: [
//           {
//             url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: "Modern 2BR Villa with Private Pool",
//         price: 4200000,
//         type: "sale",
//         category: "villas",
//         status: "active",
//         featured: false,
//         views: 856,
//         favorites: 45,
//         listedBy: { name: "Mike Johnson" },
//         location: { area: "Khalifa City" },
//         createdAt: "2024-01-12",
//         images: [
//           {
//             url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: "Studio Apartment for Rent",
//         price: 45000,
//         type: "rent",
//         category: "apartments",
//         status: "inactive",
//         featured: false,
//         views: 234,
//         favorites: 12,
//         listedBy: { name: "Emily Brown" },
//         location: { area: "Downtown" },
//         createdAt: "2024-01-10",
//         images: [
//           {
//             url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: "Commercial Office Space",
//         price: 1200000,
//         type: "sale",
//         category: "commercial",
//         status: "active",
//         featured: true,
//         views: 567,
//         favorites: 23,
//         listedBy: { name: "David Smith" },
//         location: { area: "Business Bay" },
//         createdAt: "2024-01-08",
//         images: [
//           {
//             url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
//           },
//         ],
//       },
//     ];

//     setProperties(mockProperties);
//     setLoading(false);
//   }, []);

//   const filteredProperties = properties.filter((property) => {
//     const matchesSearch =
//       property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       property.location.area.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       filterStatus === "all" || property.status === filterStatus;
//     const matchesType = filterType === "all" || property.type === filterType;
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const updatePropertyStatus = (propertyId, status) => {
//     setProperties(
//       properties.map((property) =>
//         property.id === propertyId ? { ...property, status } : property
//       )
//     );
//   };

//   const toggleFeatured = (propertyId) => {
//     setProperties(
//       properties.map((property) =>
//         property.id === propertyId
//           ? { ...property, featured: !property.featured }
//           : property
//       )
//     );
//   };

//   const deleteProperty = (propertyId) => {
//     if (window.confirm("Are you sure you want to delete this property?")) {
//       setProperties(
//         properties.filter((property) => property.id !== propertyId)
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">Loading properties...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Properties Management
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage all property listings in the system
//           </p>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="md:col-span-2">
//             <input
//               type="text"
//               placeholder="Search properties by title or location..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="sold">Sold</option>
//             <option value="rented">Rented</option>
//           </select>
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="all">All Types</option>
//             <option value="sale">For Sale</option>
//             <option value="rent">For Rent</option>
//           </select>
//         </div>
//       </div>

//       {/* Properties Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {filteredProperties.map((property) => (
//           <div
//             key={property.id}
//             className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//           >
//             <div className="flex">
//               <img
//                 src={property.images[0]?.url || "/placeholder.jpg"}
//                 alt={property.title}
//                 className="w-32 h-32 object-cover"
//               />
//               <div className="flex-1 p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-semibold text-gray-900 line-clamp-2">
//                     {property.title}
//                   </h3>
//                   <div className="flex space-x-1">
//                     {property.featured && (
//                       <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
//                         Featured
//                       </span>
//                     )}
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         property.status === "active"
//                           ? "bg-green-100 text-green-800"
//                           : property.status === "inactive"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-blue-100 text-blue-800"
//                       }`}
//                     >
//                       {property.status}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-gray-600 text-sm mb-2">
//                   {property.location.area}
//                 </p>
//                 <p className="text-xl font-bold text-blue-600 mb-2">
//                   AED {property.price.toLocaleString()}
//                   {property.type === "rent" && "/month"}
//                 </p>

//                 <div className="flex justify-between text-sm text-gray-500 mb-3">
//                   <span>👁️ {property.views} views</span>
//                   <span>❤️ {property.favorites} favorites</span>
//                   <span className="capitalize">{property.category}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">
//                     Listed by: {property.listedBy.name}
//                   </span>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => toggleFeatured(property.id)}
//                       className={`px-3 py-1 rounded text-xs ${
//                         property.featured
//                           ? "bg-gray-100 text-gray-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {property.featured ? "Unfeature" : "Feature"}
//                     </button>
//                     <button
//                       onClick={() =>
//                         updatePropertyStatus(
//                           property.id,
//                           property.status === "active" ? "inactive" : "active"
//                         )
//                       }
//                       className={`px-3 py-1 rounded text-xs ${
//                         property.status === "active"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {property.status === "active" ? "Deactivate" : "Activate"}
//                     </button>
//                     <button
//                       onClick={() => deleteProperty(property.id)}
//                       className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredProperties.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">
//             No properties found matching your criteria.
//           </p>
//         </div>
//       )}

//       {/* Summary */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           <div>
//             <p className="text-2xl font-bold text-blue-600">
//               {properties.length}
//             </p>
//             <p className="text-gray-600">Total Properties</p>
//           </div>
//           <div>
//             <p className="text-2xl font-bold text-green-600">
//               {properties.filter((p) => p.status === "active").length}
//             </p>
//             <p className="text-gray-600">Active Listings</p>
//           </div>
//           <div>
//             <p className="text-2xl font-bold text-yellow-600">
//               {properties.filter((p) => p.featured).length}
//             </p>
//             <p className="text-gray-600">Featured</p>
//           </div>
//           <div>
//             <p className="text-2xl font-bold text-purple-600">
//               {properties.filter((p) => p.type === "rent").length}
//             </p>
//             <p className="text-gray-600">For Rent</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProperties;

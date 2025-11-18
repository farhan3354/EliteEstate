import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiPlus,
  FiEdit,
  FiEye,
  FiTrash2,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

const MyProperties = () => {
  const [activeTab, setActiveTab] = useState("active");

  const properties = {
    active: [
      {
        id: 1,
        title: "Luxury 3-Bedroom Apartment",
        location: "Al Reem Island, Abu Dhabi",
        price: "2,500,000 AED",
        type: "Apartment",
        status: "For Sale",
        image: "/api/placeholder/400/300",
        views: 245,
        inquiries: 12,
        date: "2024-01-15",
      },
      {
        id: 2,
        title: "Modern 2-Bedroom Villa",
        location: "Yas Island, Abu Dhabi",
        price: "3,800,000 AED",
        type: "Villa",
        status: "For Sale",
        image: "/api/placeholder/400/300",
        views: 189,
        inquiries: 8,
        date: "2024-01-10",
      },
    ],
    pending: [
      {
        id: 3,
        title: "Waterfront Studio Apartment",
        location: "Al Raha Beach, Abu Dhabi",
        price: "850,000 AED",
        type: "Apartment",
        status: "Under Review",
        image: "/api/placeholder/400/300",
        date: "2024-01-20",
      },
    ],
    draft: [
      {
        id: 4,
        title: "Commercial Space - Downtown",
        location: "Al Maryah Island, Abu Dhabi",
        price: "5,200,000 AED",
        type: "Commercial",
        status: "Draft",
        image: "/api/placeholder/400/300",
        date: "2024-01-18",
      },
    ],
  };

  const stats = [
    { label: "Total Properties", value: "4", color: "blue" },
    { label: "Active Listings", value: "2", color: "green" },
    { label: "Total Views", value: "434", color: "purple" },
    { label: "Inquiries", value: "20", color: "orange" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Properties
            </h1>
            <p className="text-gray-600">
              Manage your property listings and track performance
            </p>
          </div>
          <Link
            to="/add-property"
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 mt-4 lg:mt-0"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className={`text-2xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                {
                  id: "active",
                  label: "Active Listings",
                  count: properties.active.length,
                },
                {
                  id: "pending",
                  label: "Pending Review",
                  count: properties.pending.length,
                },
                {
                  id: "draft",
                  label: "Drafts",
                  count: properties.draft.length,
                },
                { id: "sold", label: "Sold/Rented", count: 0 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Property List */}
          <div className="p-6">
            {properties[activeTab].length === 0 ? (
              <div className="text-center py-12">
                <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-6">
                  You don't have any {activeTab} properties yet.
                </p>
                <Link
                  to="/add-property"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Your First Property</span>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {properties[activeTab].map((property) => (
                  <div
                    key={property.id}
                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Property Image */}
                      <div className="lg:w-48 lg:h-32">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-32 lg:h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Property Details */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {property.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <FiMapPin className="w-4 h-4" />
                                <span>{property.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiDollarSign className="w-4 h-4" />
                                <span>{property.price}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiCalendar className="w-4 h-4" />
                                <span>Listed on {property.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-3 lg:mb-0">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                property.status === "For Sale"
                                  ? "bg-green-100 text-green-800"
                                  : property.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {property.status}
                            </span>
                          </div>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3 lg:mb-0">
                            {property.views && (
                              <div>
                                <span className="font-semibold">
                                  {property.views}
                                </span>{" "}
                                views
                              </div>
                            )}
                            {property.inquiries && (
                              <div>
                                <span className="font-semibold">
                                  {property.inquiries}
                                </span>{" "}
                                inquiries
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <Link
                              to={`/properties/${property.id}`}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                              <FiEye className="w-4 h-4" />
                              <span>View</span>
                            </Link>
                            <Link
                              to={`/edit-property/${property.id}`}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                              <FiEdit className="w-4 h-4" />
                              <span>Edit</span>
                            </Link>
                            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                              <FiTrash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
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
      </div>
    </div>
  );
};

export default MyProperties;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const MyProperty = () => {
//   const properties = [
//     {
//       id: 1,
//       title: "Luxury Villa with Private Pool",
//       type: "Villa",
//       price: 2800000,
//       location: "Palm Jumeirah, Dubai",
//       status: "Active",
//       views: 1245,
//       bookings: 23,
//       image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
//       date: "2024-01-15"
//     },
//     {
//       id: 2,
//       title: "Modern 2BR Apartment",
//       type: "Apartment",
//       price: 850000,
//       location: "Downtown Dubai",
//       status: "Sold",
//       views: 892,
//       bookings: 18,
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//       date: "2024-01-10"
//     },
//     {
//       id: 3,
//       title: "Commercial Office Space",
//       type: "Commercial",
//       price: 4200000,
//       location: "DIFC, Dubai",
//       status: "Pending",
//       views: 567,
//       bookings: 12,
//       image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
//       date: "2024-01-05"
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-600';
//       case 'Sold': return 'bg-blue-100 text-blue-600';
//       case 'Pending': return 'bg-yellow-100 text-yellow-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
//           <p className="text-gray-600">Manage and track your property listings</p>
//         </div>
//         <Link 
//           to="/user-dashboard/add-property"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//         >
//           + Add New Property
//         </Link>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: "Total Properties", value: "24", color: "blue" },
//           { label: "Active Listings", value: "6", color: "green" },
//           { label: "Properties Sold", value: "18", color: "purple" },
//           { label: "Total Revenue", value: "$4.2M", color: "orange" }
//         ].map((stat, index) => (
//           <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//             <div className={`text-2xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
//             <div className="text-sm text-gray-600">{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Properties Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property) => (
//           <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
//             <img 
//               src={property.image} 
//               alt={property.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex items-start justify-between mb-2">
//                 <h3 className="font-semibold text-gray-800 text-lg">{property.title}</h3>
//                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(property.status)}`}>
//                   {property.status}
//                 </span>
//               </div>
//               <p className="text-gray-600 text-sm mb-2">{property.location}</p>
//               <div className="text-lg font-bold text-blue-600 mb-3">AED {property.price.toLocaleString()}</div>
              
//               <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                 <span>👁️ {property.views} views</span>
//                 <span>📞 {property.bookings} bookings</span>
//               </div>

//               <div className="flex space-x-2">
//                 <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
//                   Edit
//                 </button>
//                 <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
//                   View
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyProperty;
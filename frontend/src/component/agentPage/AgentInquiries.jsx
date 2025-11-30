import React, { useState } from "react";
import {
  FiSearch,
  FiMessageSquare,
  FiUser,
  FiPhone,
  FiMail,
  FiHome,
  FiChevronDown,
} from "react-icons/fi";

const AgentInquiries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const inquiries = [
    {
      id: 1,
      client: "Mohammed Ali",
      email: "mohammed.ali@email.com",
      phone: "+971 50 111 2222",
      property: "Luxury Villa - Al Reem Island",
      message:
        "I'm interested in viewing this property. Please let me know available times.",
      date: "2024-02-15 10:30",
      status: "new",
      type: "Viewing Request",
    },
    {
      id: 2,
      client: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+971 55 333 4444",
      property: "Modern Apartment - Corniche",
      message:
        "Can you provide more details about the maintenance fees and community amenities?",
      date: "2024-02-14 14:15",
      status: "replied",
      type: "Information Request",
    },
    {
      id: 3,
      client: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+971 52 555 6666",
      property: "Commercial Space - DIFC",
      message:
        "I would like to discuss the investment potential of this property.",
      date: "2024-02-14 09:45",
      status: "new",
      type: "Investment Inquiry",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Viewing Request":
        return "bg-purple-100 text-purple-800";
      case "Information Request":
        return "bg-orange-100 text-orange-800";
      case "Investment Inquiry":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full:
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      short: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Inquiries
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage property inquiries and messages
            </p>
          </div>
        </div>

        {/* Stats and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Stats Card */}
          <div className="bg-white rounded-xl p-4 text-center shadow-lg lg:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs sm:text-sm text-gray-600">
              New Inquiries
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-lg lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="relative">
                <select className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base appearance-none bg-white">
                  <option>Sort by: Recent</option>
                  <option>Sort by: Property</option>
                  <option>Sort by: Client</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Recent Inquiries
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {inquiries.map((inquiry) => {
              const formattedDate = formatDate(inquiry.date);
              return (
                <div
                  key={inquiry.id}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FiMessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Header with status badges and date */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3 gap-2">
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  inquiry.status
                                )}`}
                              >
                                {inquiry.status}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                  inquiry.type
                                )}`}
                              >
                                {inquiry.type}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 sm:text-sm">
                              <span className="sm:hidden">
                                {formattedDate.short} • {formattedDate.time}
                              </span>
                              <span className="hidden sm:inline">
                                {formattedDate.full}
                              </span>
                            </span>
                          </div>

                          {/* Property title */}
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">
                            {inquiry.property}
                          </h3>

                          {/* Client info */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                            <div className="flex items-center space-x-1">
                              <FiUser className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{inquiry.client}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FiMail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate hidden xs:inline">
                                {inquiry.email}
                              </span>
                              <span className="truncate inline xs:hidden">
                                {inquiry.email.split("@")[0]}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{inquiry.phone}</span>
                            </div>
                          </div>

                          {/* Message */}
                          <p className="text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-xl text-sm sm:text-base">
                            {inquiry.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-2">
                      <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm font-medium">
                        Reply
                      </button>
                      <button className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-sm font-medium">
                        Mark as Read
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInquiries;

// import React, { useState } from "react";
// import {
//   FiSearch,
//   FiMessageSquare,
//   FiUser,
//   FiPhone,
//   FiMail,
//   FiHome,
// } from "react-icons/fi";

// const AgentInquiries = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const inquiries = [
//     {
//       id: 1,
//       client: "Mohammed Ali",
//       email: "mohammed.ali@email.com",
//       phone: "+971 50 111 2222",
//       property: "Luxury Villa - Al Reem Island",
//       message:
//         "I'm interested in viewing this property. Please let me know available times.",
//       date: "2024-02-15 10:30",
//       status: "new",
//       type: "Viewing Request",
//     },
//     {
//       id: 2,
//       client: "Sarah Johnson",
//       email: "sarah.j@email.com",
//       phone: "+971 55 333 4444",
//       property: "Modern Apartment - Corniche",
//       message:
//         "Can you provide more details about the maintenance fees and community amenities?",
//       date: "2024-02-14 14:15",
//       status: "replied",
//       type: "Information Request",
//     },
//     {
//       id: 3,
//       client: "Mike Chen",
//       email: "mike.chen@email.com",
//       phone: "+971 52 555 6666",
//       property: "Commercial Space - DIFC",
//       message:
//         "I would like to discuss the investment potential of this property.",
//       date: "2024-02-14 09:45",
//       status: "new",
//       type: "Investment Inquiry",
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "bg-blue-100 text-blue-800";
//       case "replied":
//         return "bg-green-100 text-green-800";
//       case "closed":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case "Viewing Request":
//         return "bg-purple-100 text-purple-800";
//       case "Information Request":
//         return "bg-orange-100 text-orange-800";
//       case "Investment Inquiry":
//         return "bg-indigo-100 text-indigo-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries</h1>
//           <p className="text-gray-600">
//             Manage property inquiries and messages
//           </p>
//         </div>
//         <div className="flex items-center space-x-4 mt-4 lg:mt-0">
//           <div className="bg-white rounded-xl p-4 text-center shadow-lg">
//             <div className="text-2xl font-bold text-blue-600">8</div>
//             <div className="text-sm text-gray-600">New Inquiries</div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search inquiries..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="all">All Status</option>
//             <option value="new">New</option>
//             <option value="replied">Replied</option>
//             <option value="closed">Closed</option>
//           </select>

//           <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
//             <option>Sort by: Recent</option>
//             <option>Sort by: Property</option>
//             <option>Sort by: Client</option>
//           </select>
//         </div>
//       </div>

//       {/* Inquiries List */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {inquiries.map((inquiry) => (
//             <div
//               key={inquiry.id}
//               className="p-6 hover:bg-gray-50 transition-colors duration-200"
//             >
//               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                       <FiMessageSquare className="w-6 h-6 text-blue-600" />
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex items-center space-x-4 mb-3">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
//                             inquiry.status
//                           )}`}
//                         >
//                           {inquiry.status}
//                         </span>
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
//                             inquiry.type
//                           )}`}
//                         >
//                           {inquiry.type}
//                         </span>
//                         <span className="text-sm text-gray-500">
//                           {inquiry.date}
//                         </span>
//                       </div>

//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         {inquiry.property}
//                       </h3>

//                       <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
//                         <div className="flex items-center space-x-1">
//                           <FiUser className="w-4 h-4" />
//                           <span>{inquiry.client}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <FiMail className="w-4 h-4" />
//                           <span>{inquiry.email}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <FiPhone className="w-4 h-4" />
//                           <span>{inquiry.phone}</span>
//                         </div>
//                       </div>

//                       <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
//                         {inquiry.message}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm">
//                     Reply
//                   </button>
//                   <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm">
//                     Mark as Read
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentInquiries;

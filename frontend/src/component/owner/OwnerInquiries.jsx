import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageSquare,
  FiCheck,
  FiX,
  FiEye,
  FiArchive,
  FiDownload,
  FiUser,
  FiChevronRight,
  FiClock,
  FiStar,
  FiMapPin,
} from "react-icons/fi";

const OwnerInquiries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiries, setSelectedInquiries] = useState([]);

  const inquiries = [
    {
      id: 1,
      property: "Modern Downtown Apartment",
      propertyImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      buyer: "John Smith",
      buyerImage: "https://ui-avatars.com/api/?name=John+Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      message:
        "I'm very interested in this property. Can we schedule a viewing this weekend?",
      date: "2024-03-15",
      time: "10:30 AM",
      status: "new",
      priority: "high",
      type: "viewing",
      propertyPrice: "$2,500/month",
    },
    {
      id: 2,
      property: "Luxury Beach Villa",
      propertyImage:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      buyer: "Sarah Johnson",
      buyerImage: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      message:
        "Could you provide more details about the property amenities and maintenance fees?",
      date: "2024-03-14",
      time: "2:15 PM",
      status: "responded",
      priority: "medium",
      type: "information",
      propertyPrice: "$1.2M",
    },
    {
      id: 3,
      property: "Family Suburban Home",
      propertyImage:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
      buyer: "Mike Chen",
      buyerImage: "https://ui-avatars.com/api/?name=Mike+Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 456-7890",
      message: "Is the property still available? I'd like to make an offer.",
      date: "2024-03-13",
      time: "4:45 PM",
      status: "scheduled",
      priority: "high",
      type: "offer",
      propertyPrice: "$750,000",
    },
    {
      id: 4,
      property: "City Center Condo",
      propertyImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      buyer: "Emma Wilson",
      buyerImage: "https://ui-avatars.com/api/?name=Emma+Wilson",
      email: "emma.w@email.com",
      phone: "+1 (555) 321-6547",
      message: "Do you offer any financing options or payment plans?",
      date: "2024-03-12",
      time: "11:20 AM",
      status: "archived",
      priority: "low",
      type: "finance",
      propertyPrice: "$450,000",
    },
  ];

  const stats = [
    {
      label: "Total Inquiries",
      value: "24",
      color: "bg-blue-500",
      icon: <FiMessageSquare />,
    },
    { label: "New Today", value: "5", color: "bg-green-500", icon: <FiMail /> },
    {
      label: "Pending Response",
      value: "8",
      color: "bg-yellow-500",
      icon: <FiClock />,
    },
    {
      label: "Scheduled Viewings",
      value: "3",
      color: "bg-purple-500",
      icon: <FiCalendar />,
    },
  ];

  const handleRespond = (id) => {
    console.log("Respond to inquiry:", id);
    alert("Opening response form...");
  };

  const handleArchive = (id) => {
    console.log("Archive inquiry:", id);
    alert("Inquiry archived!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Property Inquiries</h1>
        <p className="text-gray-600 mt-1">
          Manage all inquiries and messages about your properties
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <div className="text-white text-xl">{stat.icon}</div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search inquiries by property, buyer, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="responded">Responded</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiDownload className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Property Image */}
                  <div className="lg:w-1/4">
                    <div className="relative">
                      <img
                        src={inquiry.propertyImage}
                        alt={inquiry.property}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded-full ${
                            inquiry.priority === "high"
                              ? "bg-red-500 text-white"
                              : inquiry.priority === "medium"
                              ? "bg-yellow-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {inquiry.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                          {inquiry.propertyPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div className="lg:flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {inquiry.property}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${
                              inquiry.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : inquiry.status === "responded"
                                ? "bg-green-100 text-green-800"
                                : inquiry.status === "scheduled"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {inquiry.status.charAt(0).toUpperCase() +
                              inquiry.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <FiCalendar className="h-4 w-4" />
                            {inquiry.date} at {inquiry.time}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <FiMessageSquare className="h-4 w-4" />
                            {inquiry.type.charAt(0).toUpperCase() +
                              inquiry.type.slice(1)}{" "}
                            Inquiry
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4 lg:mt-0">
                        <button
                          onClick={() => handleRespond(inquiry.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <FiMail className="h-4 w-4" />
                          Respond
                        </button>
                        <button
                          onClick={() => handleArchive(inquiry.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <FiArchive className="h-4 w-4" />
                          Archive
                        </button>
                      </div>
                    </div>

                    {/* Buyer Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={inquiry.buyerImage}
                          alt={inquiry.buyer}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">
                            {inquiry.buyer}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <FiMail className="h-4 w-4" />
                              {inquiry.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiPhone className="h-4 w-4" />
                              {inquiry.phone}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiStar className="h-5 w-5 text-yellow-500" />
                          <span className="font-bold">4.8</span>
                          <span className="text-gray-500 text-sm">Rating</span>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <FiEye className="h-4 w-4" />
                          View Full Conversation
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <FiMapPin className="h-4 w-4" />
                          View Property Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {inquiries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Inquiries Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiStar className="h-5 w-5 text-yellow-500" />
          Tips for Better Responses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <FiClock className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Respond Quickly</h4>
            <p className="text-sm text-gray-600">
              Reply within 24 hours for best results
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <FiCheck className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Be Professional</h4>
            <p className="text-sm text-gray-600">
              Use clear, professional language
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <FiCalendar className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Schedule Promptly</h4>
            <p className="text-sm text-gray-600">
              Offer specific viewing times
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <FiUser className="h-5 w-5 text-yellow-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Follow Up</h4>
            <p className="text-sm text-gray-600">
              Check back with interested buyers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerInquiries;

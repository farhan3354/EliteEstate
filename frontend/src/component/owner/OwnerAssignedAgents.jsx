import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiUsers,
  FiStar,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPlus,
  FiDownload,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiChevronRight,
} from "react-icons/fi";
import { MdVerified, MdOutlineHandshake } from "react-icons/md";

const OwnerAssignedAgents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const assignedAgents = [
    {
      id: 1,
      agent: {
        name: "Michael Johnson",
        avatar: "https://ui-avatars.com/api/?name=Michael+Johnson",
        email: "michael.j@email.com",
        phone: "+1 (555) 123-4567",
        rating: 4.9,
        reviews: 128,
        experience: "8 years",
        specialization: "Luxury Properties",
      },
      property: {
        name: "Modern Downtown Apartment",
        address: "123 Luxury Street, NY",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
        price: "$2,500/month",
      },
      assignmentDate: "2024-02-15",
      agreement: {
        commission: "5%",
        duration: "6 months",
        status: "active",
        type: "exclusive",
      },
      performance: {
        inquiries: 24,
        viewings: 8,
        offers: 2,
        successRate: "85%",
      },
      lastContact: "2 days ago",
    },
    {
      id: 2,
      agent: {
        name: "Sarah Williams",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Williams",
        email: "sarah.w@email.com",
        phone: "+1 (555) 987-6543",
        rating: 4.7,
        reviews: 89,
        experience: "5 years",
        specialization: "Commercial",
      },
      property: {
        name: "Luxury Beach Villa",
        address: "456 Ocean Drive, Miami",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        price: "$1.2M",
      },
      assignmentDate: "2024-03-01",
      agreement: {
        commission: "6%",
        duration: "12 months",
        status: "active",
        type: "shared",
      },
      performance: {
        inquiries: 15,
        viewings: 5,
        offers: 1,
        successRate: "72%",
      },
      lastContact: "1 week ago",
    },
    {
      id: 3,
      agent: {
        name: "Robert Chen",
        avatar: "https://ui-avatars.com/api/?name=Robert+Chen",
        email: "robert.c@email.com",
        phone: "+1 (555) 456-7890",
        rating: 4.8,
        reviews: 156,
        experience: "10 years",
        specialization: "Residential",
      },
      property: {
        name: "Family Suburban Home",
        address: "789 Maple Street, Austin",
        image:
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
        price: "$750,000",
      },
      assignmentDate: "2024-01-20",
      agreement: {
        commission: "4.5%",
        duration: "3 months",
        status: "expired",
        type: "exclusive",
      },
      performance: {
        inquiries: 32,
        viewings: 12,
        offers: 3,
        successRate: "91%",
      },
      lastContact: "1 month ago",
    },
  ];

  const stats = [
    {
      label: "Active Agents",
      value: "8",
      color: "bg-green-500",
      icon: <FiUsers />,
    },
    {
      label: "Total Commissions",
      value: "$25,400",
      color: "bg-blue-500",
      icon: <FiDollarSign />,
    },
    {
      label: "Avg Success Rate",
      value: "82%",
      color: "bg-purple-500",
      icon: <FiTrendingUp />,
    },
    {
      label: "Properties with Agents",
      value: "12",
      color: "bg-yellow-500",
      icon: <MdOutlineHandshake />,
    },
  ];

  const handleContactAgent = (agent) => {
    console.log("Contacting agent:", agent.name);
    alert(`Opening contact form for ${agent.name}`);
  };

  const handleTerminateAssignment = (id) => {
    if (window.confirm("Are you sure you want to terminate this assignment?")) {
      console.log("Terminating assignment:", id);
      alert("Assignment terminated!");
    }
  };

  const handleViewPerformance = (agent) => {
    console.log("Viewing performance for:", agent.name);
    alert(`Opening performance dashboard for ${agent.name}`);
  };

  const handleExtendAgreement = (id) => {
    console.log("Extending agreement for:", id);
    alert("Agreement extension form opened!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Assigned Agents
            </h1>
            <p className="text-gray-600 mt-1">
              Manage agents assigned to your properties
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiPlus className="h-5 w-5" />
            Assign New Agent
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
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
                placeholder="Search agents or properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiDownload className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Agents List */}
        <div className="space-y-6">
          {assignedAgents.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Agent Details */}
                  <div className="lg:w-2/5">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={assignment.agent.avatar}
                          alt={assignment.agent.name}
                          className="w-20 h-20 rounded-full border-4 border-white shadow"
                        />
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <MdVerified className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {assignment.agent.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {assignment.agent.specialization} Specialist
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiStar className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-bold">
                              {assignment.agent.rating}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({assignment.agent.reviews})
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <FiMail className="h-4 w-4 text-gray-400" />
                            <span>{assignment.agent.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FiPhone className="h-4 w-4 text-gray-400" />
                            <span>{assignment.agent.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FiCalendar className="h-4 w-4 text-gray-400" />
                            <span>
                              {assignment.agent.experience} experience
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleContactAgent(assignment.agent)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <FiMessageSquare className="h-4 w-4" />
                            Message
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <FiPhone className="h-4 w-4" />
                            Call
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="lg:w-1/3 border-l lg:border-l-0 lg:border-r border-gray-200 lg:px-6">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        ASSIGNED PROPERTY
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img
                            src={assignment.property.image}
                            alt={assignment.property.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">
                            {assignment.property.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {assignment.property.address}
                          </p>
                          <p className="font-bold text-blue-600 mt-1">
                            {assignment.property.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Assigned Date:</span>
                        <span className="font-medium">
                          {assignment.assignmentDate}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Contact:</span>
                        <span className="font-medium">
                          {assignment.lastContact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Agreement & Actions */}
                  <div className="lg:w-2/5 lg:pl-6">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        AGREEMENT DETAILS
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-xs text-blue-600">
                            COMMISSION
                          </div>
                          <div className="font-bold text-gray-900">
                            {assignment.agreement.commission}
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-xs text-green-600">DURATION</div>
                          <div className="font-bold text-gray-900">
                            {assignment.agreement.duration}
                          </div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-xs text-purple-600">TYPE</div>
                          <div className="font-bold text-gray-900">
                            {assignment.agreement.type}
                          </div>
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            assignment.agreement.status === "active"
                              ? "bg-green-50"
                              : "bg-red-50"
                          }`}
                        >
                          <div
                            className={`text-xs ${
                              assignment.agreement.status === "active"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            STATUS
                          </div>
                          <div
                            className={`font-bold ${
                              assignment.agreement.status === "active"
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {assignment.agreement.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        PERFORMANCE
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {assignment.performance.inquiries}
                          </div>
                          <div className="text-xs text-gray-600">Inquiries</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {assignment.performance.viewings}
                          </div>
                          <div className="text-xs text-gray-600">Viewings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {assignment.performance.offers}
                          </div>
                          <div className="text-xs text-gray-600">Offers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">
                            {assignment.performance.successRate}
                          </div>
                          <div className="text-xs text-gray-600">
                            Success Rate
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewPerformance(assignment.agent)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        <FiTrendingUp className="h-4 w-4" />
                        Performance
                      </button>
                      {assignment.agreement.status === "active" ? (
                        <button
                          onClick={() =>
                            handleTerminateAssignment(assignment.id)
                          }
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm"
                        >
                          <FiXCircle className="h-4 w-4" />
                          Terminate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleExtendAgreement(assignment.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                          Extend
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {assignedAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Agents Assigned
            </h3>
            <p className="text-gray-500 mb-4">
              You haven't assigned any agents to your properties yet.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto">
              <FiPlus className="h-5 w-5" />
              Assign Your First Agent
            </button>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiStar className="h-5 w-5 text-yellow-500" />
          Working with Agents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <FiDollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              Commission Structure
            </h4>
            <p className="text-sm text-gray-600">
              Commission is typically 3-6% of the sale price, paid upon
              successful transaction.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <FiMessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Regular Updates</h4>
            <p className="text-sm text-gray-600">
              Expect regular updates on viewings, inquiries, and market feedback
              from your agent.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <FiCheckCircle className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              Performance Monitoring
            </h4>
            <p className="text-sm text-gray-600">
              Track agent performance through metrics like inquiries generated
              and viewing conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAssignedAgents;

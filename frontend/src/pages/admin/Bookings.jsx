import React, { useState, useEffect } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        property: {
          title: "Luxury 3BR Apartment",
          images: [
            {
              url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
            },
          ],
        },
        user: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+971501234567",
        },
        agent: { name: "Sarah Wilson" },
        type: "viewing",
        scheduledDate: "2024-01-20T14:00:00",
        status: "pending",
        duration: 30,
        message: "I would like to view the apartment this weekend.",
        createdAt: "2024-01-15",
      },
      {
        id: 2,
        property: {
          title: "Modern Villa with Pool",
          images: [
            {
              url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
            },
          ],
        },
        user: {
          name: "Emily Brown",
          email: "emily@example.com",
          phone: "+971502345678",
        },
        agent: { name: "Mike Johnson" },
        type: "consultation",
        scheduledDate: "2024-01-18T10:00:00",
        status: "confirmed",
        duration: 60,
        message: "Interested in discussing the purchase process.",
        createdAt: "2024-01-14",
      },
      {
        id: 3,
        property: {
          title: "Studio Apartment",
          images: [
            {
              url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
            },
          ],
        },
        user: {
          name: "David Wilson",
          email: "david@example.com",
          phone: "+971503456789",
        },
        agent: { name: "Emily Brown" },
        type: "viewing",
        scheduledDate: "2024-01-19T16:00:00",
        status: "completed",
        duration: 30,
        message: "",
        createdAt: "2024-01-13",
      },
      {
        id: 4,
        property: {
          title: "Commercial Space",
          images: [
            {
              url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
            },
          ],
        },
        user: {
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+971504567890",
        },
        agent: { name: "David Smith" },
        type: "meeting",
        scheduledDate: "2024-01-17T11:00:00",
        status: "cancelled",
        duration: 45,
        message: "Need to discuss commercial lease terms.",
        createdAt: "2024-01-12",
      },
    ];

    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const filteredBookings = bookings.filter(
    (booking) => filterStatus === "all" || booking.status === filterStatus
  );

  const updateBookingStatus = (bookingId, status) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getTypeIcon = (type) => {
    const icons = {
      viewing: "👀",
      consultation: "💼",
      meeting: "🤝",
    };
    return icons[type] || "📅";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bookings Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all property viewing bookings
          </p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Property Image */}
              <img
                src={booking.property.images[0]?.url || "/placeholder.jpg"}
                alt={booking.property.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Booking Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.property.title}
                    </h3>
                    <p className="text-gray-600">
                      {getTypeIcon(booking.type)}{" "}
                      {booking.type.charAt(0).toUpperCase() +
                        booking.type.slice(1)}{" "}
                      • Scheduled:{" "}
                      {new Date(booking.scheduledDate).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">
                      User Information
                    </p>
                    <p className="text-gray-600">{booking.user.name}</p>
                    <p className="text-gray-600">{booking.user.email}</p>
                    <p className="text-gray-600">{booking.user.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Agent</p>
                    <p className="text-gray-600">{booking.agent.name}</p>
                    <p className="text-gray-600">
                      Duration: {booking.duration} minutes
                    </p>
                    <p className="text-gray-600">
                      Created:{" "}
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {booking.message && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Message:</span>{" "}
                      {booking.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "confirmed")
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "cancelled")
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "completed")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Mark Complete
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No bookings found matching your criteria.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {bookings.length}
            </p>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
            <p className="text-gray-600">Pending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
            <p className="text-gray-600">Confirmed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {bookings.filter((b) => b.status === "completed").length}
            </p>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;

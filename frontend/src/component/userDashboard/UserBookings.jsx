import React, { useState, useEffect } from "react";
import api from "../../utils/routeapi";
import { FiCalendar, FiClock, FiHome, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/my-bookings");
      setBookings(response.data.data.bookings);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching my bookings:", err);
      setError("Failed to load your viewing requests.");
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this viewing request?")) return;
    
    try {
      await api.put(`/bookings/${id}/status`, { status: 'cancelled' });
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      alert("Viewing request cancelled.");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel viewing request.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
          My Viewing Requests
        </h1>
        <p className="text-gray-600 mt-2">Track and manage your property appointments</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-300 text-7xl mb-6 bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <FiCalendar />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Appointments Yet</h3>
          <p className="text-gray-500 text-lg">You haven't requested any property viewings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {/* Property Image/Thumbnail */}
              <div className="h-40 bg-gray-100 relative">
                {booking.property?.images?.[0] ? (
                  <img 
                    src={booking.property.images[0]} 
                    alt={booking.property.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <FiHome size={40} />
                  </div>
                )}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  booking.status === 'confirmed' ? 'bg-green-500 text-white' :
                  booking.status === 'pending' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {booking.status}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 truncate mb-4">
                    {booking.property?.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FiCalendar />
                      </div>
                      <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FiClock />
                      </div>
                      <span className="font-medium">{booking.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="w-full flex items-center justify-center gap-2 text-red-600 border border-red-200 py-2.5 rounded-xl font-bold hover:bg-red-50 transition-colors"
                    >
                      <FiXCircle /> Cancel Request
                    </button>
                  )}
                  {booking.status === 'confirmed' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl justify-center font-bold">
                      <FiCheckCircle /> Appointment Confirmed
                    </div>
                  )}
                  {booking.status === 'cancelled' && (
                    <div className="flex items-center gap-2 text-gray-400 bg-gray-50 p-3 rounded-xl justify-center font-bold">
                      <FiInfo /> Request Cancelled
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;

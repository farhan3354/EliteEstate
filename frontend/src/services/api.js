import api from "../utils/routeapi";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Auth APIs
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
  updatePassword: (data) =>
    api.patch("/auth/update-password", data),
};

// Property APIs
export const propertyAPI = {
  getAll: (params) => api.get("/properties", { params }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) =>
    api.post("/properties", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    api.patch(`/properties/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/properties/${id}`),
  getFeatured: () => api.get("/properties"),
  getUserProperties: () =>
    api.get("/properties/user/my-properties"),
  search: (params) =>
    api.get("/properties/search", { params }),
  getSimilar: (id) => api.get(`/properties/similar/${id}`),
};

// Favorite APIs
export const favoriteAPI = {
  getFavorites: () => api.get("/favorites"),
  addFavorite: (propertyId) =>
    api.post(`/favorites/${propertyId}`),
  removeFavorite: (propertyId) =>
    api.delete(`/favorites/${propertyId}`),
  checkFavorite: (propertyId) =>
    api.get(`/favorites/check/${propertyId}`),
};

// Review APIs
export const reviewAPI = {
  getPropertyReviews: (propertyId) =>
    api.get(`/reviews/property/${propertyId}`),
  getAgentReviews: (agentId) =>
    api.get(`/reviews/agent/${agentId}`),
  createReview: (data) => api.post("/reviews", data),
  updateReview: (id, data) =>
    api.patch(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  getMyReviews: () => api.get("/reviews/my-reviews"),
  addResponse: (id, response) =>
    api.patch(`/reviews/${id}/response`, { response }),
};

// Inquiry APIs
export const inquiryAPI = {
  create: (data) => api.post("/inquiries", data),
  getMyInquiries: (status) => api.get(`/inquiries/my-inquiries${status ? `?status=${status}` : ""}`),
  getSellerInquiries: (status) => api.get(`/inquiries/seller/inquiries${status ? `?status=${status}` : ""}`),
  getPropertyInquiries: (propertyId) => api.get(`/inquiries/property/${propertyId}`),
  getDetails: (id) => api.get(`/inquiries/${id}`),
  respond: (id, message) => api.post(`/inquiries/${id}/respond`, { message }),
  updateStatus: (id, status, notes) => api.patch(`/inquiries/${id}/status`, { status, notes }),
  markAsRead: (id) => api.patch(`/inquiries/${id}/read`),
};

// Booking APIs
export const bookingAPI = {
  create: (data) => api.post("/bookings", data),
  getMyBookings: () => api.get("/bookings/my-bookings"),
  getLandlordBookings: () => api.get("/bookings/landlord-bookings"),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
};



// Agent APIs
export const agentAPI = {
  getAll: (params) => api.get("/agents", { params }),
  getDetails: (id) => api.get(`/agents/${id}`),
  getMyProfile: () => api.get("/agent-dashboard/profile"),
  updateMyProfile: (data) => api.patch("/agent-dashboard/profile", data),
  getClients: () => api.get("/agent-dashboard/clients"),
  getAssignedProperties: () => api.get("/agent-assignment/agent/assigned-properties"),
  updateAssignmentStatus: (id, status) => api.put(`/agent-assignment/assignment/${id}/status`, { status }),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) =>
    api.patch("/users/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getUserStats: () => api.get("/users/stats"),
  becomeAgent: (data) => api.post("/users/become-agent", data),
  getAgentListings: () => api.get("/users/agent/listings"),
};

export const locationAPI = {
  getAll: () => api.get("/locations"),
  getPopular: () => api.get("/locations/popular"),
  create: (formData) =>
    api.post("/locations", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/locations/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/locations/${id}`),
};

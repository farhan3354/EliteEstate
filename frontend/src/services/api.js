import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

// Auth APIs
export const authAPI = {
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
  register: (data) => axios.post(`${API_BASE_URL}/auth/register`, data),
  getMe: () => axios.get(`${API_BASE_URL}/auth/me`),
  updatePassword: (data) =>
    axios.patch(`${API_BASE_URL}/auth/update-password`, data),
};

// Property APIs
export const propertyAPI = {
  getAll: (params) => axios.get(`${API_BASE_URL}/properties`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/properties/${id}`),
  create: (data) =>
    axios.post(`${API_BASE_URL}/properties`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    axios.patch(`${API_BASE_URL}/properties/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => axios.delete(`${API_BASE_URL}/properties/${id}`),
  getFeatured: () => axios.get(`${API_BASE_URL}/properties/featured`),
  getUserProperties: () =>
    axios.get(`${API_BASE_URL}/properties/user/my-properties`),
  search: (params) =>
    axios.get(`${API_BASE_URL}/properties/search`, { params }),
  getSimilar: (id) => axios.get(`${API_BASE_URL}/properties/similar/${id}`),
  incrementViews: (id) => axios.patch(`${API_BASE_URL}/properties/${id}/views`),
};

// Favorite APIs
export const favoriteAPI = {
  getFavorites: () => axios.get(`${API_BASE_URL}/favorites`),
  addFavorite: (propertyId) =>
    axios.post(`${API_BASE_URL}/favorites/${propertyId}`),
  removeFavorite: (propertyId) =>
    axios.delete(`${API_BASE_URL}/favorites/${propertyId}`),
  checkFavorite: (propertyId) =>
    axios.get(`${API_BASE_URL}/favorites/check/${propertyId}`),
};

// Review APIs
export const reviewAPI = {
  getPropertyReviews: (propertyId) =>
    axios.get(`${API_BASE_URL}/reviews/property/${propertyId}`),
  getAgentReviews: (agentId) =>
    axios.get(`${API_BASE_URL}/reviews/agent/${agentId}`),
  createReview: (data) => axios.post(`${API_BASE_URL}/reviews`, data),
  updateReview: (id, data) =>
    axios.patch(`${API_BASE_URL}/reviews/${id}`, data),
  deleteReview: (id) => axios.delete(`${API_BASE_URL}/reviews/${id}`),
  getMyReviews: () => axios.get(`${API_BASE_URL}/reviews/my-reviews`),
  addResponse: (id, response) =>
    axios.patch(`${API_BASE_URL}/reviews/${id}/response`, { response }),
};

// Booking APIs
export const bookingAPI = {
  createBooking: (data) => axios.post(`${API_BASE_URL}/bookings`, data),
  getMyBookings: () => axios.get(`${API_BASE_URL}/bookings/my-bookings`),
  getPropertyBookings: (propertyId) =>
    axios.get(`${API_BASE_URL}/bookings/property/${propertyId}`),
  updateStatus: (id, status) =>
    axios.patch(`${API_BASE_URL}/bookings/${id}/status`, { status }),
  cancelBooking: (id, reason) =>
    axios.patch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      cancellationReason: reason,
    }),
  getAgentBookings: () =>
    axios.get(`${API_BASE_URL}/bookings/agent/my-bookings`),
  confirmBooking: (id) => axios.patch(`${API_BASE_URL}/bookings/${id}/confirm`),
};

// User APIs
export const userAPI = {
  getProfile: () => axios.get(`${API_BASE_URL}/users/profile`),
  updateProfile: (data) =>
    axios.patch(`${API_BASE_URL}/users/profile`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getUserStats: () => axios.get(`${API_BASE_URL}/users/stats`),
  becomeAgent: (data) => axios.post(`${API_BASE_URL}/users/become-agent`, data),
  getAgentListings: () => axios.get(`${API_BASE_URL}/users/agent/listings`),
};

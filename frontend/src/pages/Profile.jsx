import React, { useState, useEffect } from "react";
import { userAPI, authAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [stats, setStats] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.data.profile);
    } catch (error) {
      setMessage("Error fetching profile");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userAPI.getUserStats();
      setStats(response.data.data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await userAPI.updateProfile(formData);
      setMessage("Profile updated successfully");
      fetchProfile();
    } catch (error) {
      setMessage("Error updating profile");
      console.error("Error:", error);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      newPasswordConfirm: formData.get("newPasswordConfirm"),
    };

    try {
      await authAPI.updatePassword(data);
      setMessage("Password updated successfully");
      e.target.reset();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating password");
    }
  };

  const becomeAgent = async () => {
    try {
      await userAPI.becomeAgent({
        company: "My Real Estate Company",
        licenseNumber: "LIC123456",
        experience: 2,
      });
      setMessage("Congratulations! You are now registered as an agent.");
      fetchProfile();
    } catch (error) {
      setMessage("Error becoming agent");
      console.error("Error:", error);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please login to view profile
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${
            message.includes("success")
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.propertiesListed}
            </div>
            <div className="text-gray-600">Properties Listed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.favoritesCount}
            </div>
            <div className="text-gray-600">Favorites</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.rating}
            </div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalReviews}
            </div>
            <div className="text-gray-600">Reviews</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "password"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Password
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Profile Information</h3>
            {user.role === "user" && (
              <button
                onClick={becomeAgent}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Become an Agent
              </button>
            )}
          </div>

          <form onSubmit={updateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={user.phone}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              {profile?.company && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    defaultValue={profile.company}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {profile?.bio && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={profile.bio}
                    rows="4"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-6">Change Password</h3>

          <form onSubmit={updatePassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="newPasswordConfirm"
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
  FiCalendar,
  FiEdit,
  FiSave,
  FiX,
  FiLoader,
} from "react-icons/fi";
import { agentAPI } from "../../services/api";

const OwnAgentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    title: "Real Estate Agent",
    email: "",
    phone: "",
    location: "",
    license: "",
    experience: 0,
    specialties: [],
    languages: [],
    bio: "",
    achievements: [],
    workingHours: {},
    socialMedia: {},
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await agentAPI.getMyProfile();
      const agent = response.data.data;
      
      setProfileData({
        name: agent.user?.name || "",
        email: agent.user?.email || "",
        phone: agent.user?.phone || agent.officePhone || "",
        location: agent.officeAddress || "",
        license: agent.licenseNumber || "",
        experience: agent.yearsOfExperience || 0,
        specialties: agent.specialization || [],
        languages: agent.languages || [],
        bio: agent.bio || "",
        achievements: [], // Backend doesn't have achievements field yet
        officePhone: agent.officePhone || "",
        workingHours: agent.workingHours || {},
        socialMedia: agent.socialMedia || {},
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updateData = {
        bio: profileData.bio,
        specialization: profileData.specialties,
        languages: profileData.languages,
        officeAddress: profileData.location,
        officePhone: profileData.phone,
        yearsOfExperience: profileData.experience,
        // licenseNumber: profileData.license, // Usually not editable
        socialMedia: profileData.socialMedia,
      };

      await agentAPI.updateMyProfile(updateData);
      setIsEditing(false);
      // alert("Profile updated successfully!"); 
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile(); // Revert changes
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your professional profile</p>
        </div>
        <div className="flex space-x-3 mt-4 lg:mt-0">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <FiEdit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                {saving ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : (
                  <FiSave className="w-5 h-5" />
                )}
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <FiX className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center space-x-3 text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent">
                  <FiUser className="w-5 h-5 text-gray-400" />
                  <span>{profileData.name}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <div className="flex items-center space-x-3 text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent">
                  <FiAward className="w-5 h-5 text-gray-400" />
                   <span>{profileData.license || "N/A"}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center space-x-3 text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent">
                   <FiMail className="w-5 h-5 text-gray-400" />
                   <span>{profileData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-3 text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <span>{profileData.phone || "Not set"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-3 text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent">
                    <FiMapPin className="w-5 h-5 text-gray-400" />
                    <span>{profileData.location || "Not set"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.experience}
                    onChange={(e) =>
                       setProfileData({ ...profileData, experience: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-3 text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <span>{profileData.experience} Years</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Professional Bio
            </h2>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Tell clients about yourself..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {profileData.bio || "No bio information provided yet."}
              </p>
            )}
          </div>

          {/* Specialties & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Specialties
              </h2>
              {isEditing ? (
                 <div className="space-y-2">
                    <p className="text-xs text-gray-500">Comma separated values (e.g. Villas, Luxury, Rent)</p>
                    <input
                      type="text"
                      value={profileData.specialties.join(", ")}
                      onChange={(e) => setProfileData({...profileData, specialties: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                 </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.length > 0 ? profileData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  )) : <span className="text-gray-500 italic">No specialties listed</span>}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Languages
              </h2>
              {isEditing ? (
                 <div className="space-y-2">
                    <p className="text-xs text-gray-500">Comma separated values (e.g. English, Arabic)</p>
                    <input
                      type="text"
                      value={profileData.languages.join(", ")}
                      onChange={(e) => setProfileData({...profileData, languages: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                 </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                   {profileData.languages.length > 0 ? profileData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  )) : <span className="text-gray-500 italic">No languages listed</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Profile Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completeness</span>
                <span className="font-semibold text-gray-900">
                  {/* Calculate rough completeness */}
                  {Math.round(
                    (Object.values(profileData).filter(Boolean).length / Object.keys(profileData).length) * 100
                  )}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(Object.values(profileData).filter(Boolean).length / Object.keys(profileData).length) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                Complete your profile to get more visibility
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnAgentProfile;

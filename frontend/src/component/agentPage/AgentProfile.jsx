import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiShare2,
  FiHeart,
  FiCheck,
  FiAward,
  FiHome,
  FiLoader,
} from "react-icons/fi";
import { agentAPI, propertyAPI } from "../../services/api";

const AgentProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("properties");
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentData();
  }, [id]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      
      // Fetch Agent Details
      const agentRes = await agentAPI.getDetails(id);
      const agentData = agentRes.data.data;
      setAgent(agentData);

      // Fetch Agent Properties
      if (agentData.user?._id) {
        const propRes = await propertyAPI.getAll({ listedBy: agentData.user._id });
        setProperties(propRes.data.data.properties);
      }
      
    } catch (error) {
      console.error("Error fetching agent data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return (
       <div className="min-h-screen flex justify-center items-center">
         <FiLoader className="w-12 h-12 animate-spin text-blue-600" />
       </div>
     );
  }

  if (!agent) {
    return <div className="text-center py-20">Agent not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex-shrink-0">
              <img
                src={agent.user?.profileImage || "/default-avatar.png"}
                alt={agent.user?.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=Agent";
                  }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {agent.user?.name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-3">{agent.companyName || "Real Estate Agent"}</p>
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="w-5 h-5" />
                      <span>{agent.officeAddress || "Abu Dhabi"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="w-5 h-5" />
                      <span>{agent.yearsOfExperience} years exp.</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                  <div className="text-center">
                    <div className="flex items-center space-x-2 text-yellow-500">
                      <FiStar className="w-6 h-6 fill-current" />
                      <span className="text-2xl font-bold">{agent.rating?.average || 0}</span>
                    </div>
                    <div className="text-gray-500">
                      ({agent.rating?.totalReviews || 0} reviews)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {agent.specialization?.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {agent.officePhone && (
                  <a href={`tel:${agent.officePhone}`} className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                    <FiPhone className="w-5 h-5" />
                    <span>Call Agent</span>
                  </a>
                )}
                 <a href={`mailto:${agent.user?.email}`} className="flex items-center justify-center space-x-3 border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium">
                   <FiMail className="w-5 h-5" />
                   <span>Email Agent</span>
                 </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "properties", label: "Properties" },
                    { id: "about", label: "About" },
                    // { id: "reviews", label: "Reviews" },
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
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "about" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        About Me
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {agent.bio || "No bio available."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Languages
                        </h4>
                        <div className="space-y-3">
                          {agent.languages?.map((language, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <FiCheck className="w-5 h-5 text-green-500" />
                              <span className="text-gray-600">{language}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                       {/* Achievements are not yet in backend model, hiding for now or showing placeholders if wanted */}
                    </div>
                  </div>
                )}

                {activeTab === "properties" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.length > 0 ? properties.map((property) => (
                      <Link
                        key={property._id}
                        to={`/property/${property._id}`}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <img
                          src={property.images?.[0] || "/placeholder-property.jpg"}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x300?text=Property";
                          }}
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 truncate">
                            {property.title}
                          </h4>
                          <div className="text-lg font-bold text-blue-600 mb-2">
                            {property.price?.toLocaleString()} AED
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>{property.bedrooms} beds</span>
                            <span>{property.bathrooms} baths</span>
                            <span>{property.area} sqft</span>
                          </div>
                          <div>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )) : (
                        <div className="col-span-2 text-center py-10 text-gray-500">
                           No properties listed yet.
                        </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Info
              </h3>
              <div className="space-y-4">
                 {agent.officePhone && (
                <div className="flex items-center space-x-4">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.officePhone}</span>
                </div>
                 )}
                <div className="flex items-center space-x-4">
                  <FiMail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.user?.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiMapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.officeAddress}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiAward className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{agent.licenseNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;

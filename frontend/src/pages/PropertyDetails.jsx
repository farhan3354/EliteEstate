import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiMapPin,
  FiHome,
  FiStar,
  FiPhone,
  FiMessageCircle,
  FiCalendar,
  FiShare2,
  FiFlag,
  FiChevronLeft,
  FiChevronRight,
  FiCamera,
  FiMail,
} from "react-icons/fi";
import api from "../utils/routeapi";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/properties/${id}`);
      const propertyData = response.data.data.property;
      
      setProperty(propertyData);
      setSimilarProperties(response.data.data.similarProperties || []);
      
      if (propertyData.listedBy) {
        setAgent(propertyData.listedBy);
      }
      
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (property?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const handleContactAgent = (type) => {
    if (!agent?.phone) return;
    
    if (type === "call") {
      window.open(`tel:${agent.phone}`);
    } else if (type === "whatsapp") {
      window.open(`https://wa.me/${agent.phone.replace("+", "")}`);
    } else if (type === "email") {
      window.open(`mailto:${agent.email}`);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || "Property",
        text: property?.description || "Check out this property",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const formatPrice = (price) => {
    return price?.toLocaleString() || "0";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      apartments: "Apartment",
      villas: "Villa",
      townhouses: "Townhouse",
      commercial: "Commercial",
      land: "Land",
      rooms: "Room",
      warehouses: "Warehouse",
      buildings: "Building",
    };
    return labels[category] || category;
  };

 

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Property not found
          </h3>
          <p className="text-gray-600 mb-4">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const propertyImages = property.images?.length > 0 
    ? property.images 
    : ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"];

 

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition duration-200"
              >
                Home
              </button>
              <span>›</span>
              <button
                onClick={() => navigate("/properties")}
                className="hover:text-blue-500 transition duration-200"
              >
                Properties for Sale
              </button>
              <span>›</span>
              <button
                onClick={() =>
                  navigate(`/properties?category=${property.category}`)
                }
                className="hover:text-blue-500 transition duration-200"
              >
                {getCategoryLabel(property.category)}s for Sale
              </button>
              <span>›</span>
              <span className="text-gray-900 font-medium">
                Property Details
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-10 h-96">
                    <img
                      src={propertyImages[currentImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {propertyImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition duration-200"
                      >
                        <FiChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition duration-200"
                      >
                        <FiChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.isUrgent && (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        Urgent
                      </span>
                    )}
                    {property.isVerified && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={toggleFavorite}
                      className={`p-2 rounded-full shadow-lg transition duration-200 ${
                        isFavorite
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-red-500"
                      }`}
                    >
                      <FiHeart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={shareProperty}
                      className="bg-white text-gray-600 hover:bg-gray-50 p-2 rounded-full shadow-lg transition duration-200"
                    >
                      <FiShare2 className="w-5 h-5" />
                    </button>
                    <button className="bg-white text-gray-600 hover:bg-gray-50 p-2 rounded-full shadow-lg transition duration-200">
                      <FiFlag className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    <FiCamera className="w-4 h-4 inline mr-1" />
                    {currentImageIndex + 1} / {propertyImages.length}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2 overflow-x-auto">
                    {propertyImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition duration-200 ${
                          currentImageIndex === index
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 break-words">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FiMapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {property.location?.address || property.location?.area || property.location?.city || "Abu Dhabi"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold text-blue-600 mb-1 break-words">
                      AED {formatPrice(property.price)}
                    </div>
                    <div className="text-gray-600 text-sm">
                      For {property.purpose === "rent" ? "Rent" : "Sale"}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <FiHome className="w-4 h-4 text-gray-600" />
                      <div className="text-lg font-bold text-gray-900">
                        {property.bedrooms || 0}
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {property.bathrooms || 0}
                    </div>
                    <div className="text-gray-600 text-sm">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {property.area?.toLocaleString() || 0}
                    </div>
                    <div className="text-gray-600 text-sm">{property.areaUnit || "Sq. Ft."}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {property.yearBuilt || "-"}
                    </div>
                    <div className="text-gray-600 text-sm">Year Built</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleContactAgent("call")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiPhone className="w-5 h-5" />
                    <span>Call</span>
                  </button>
                  <button
                    onClick={() => handleContactAgent("whatsapp")}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiMessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleContactAgent("email")}
                    className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiMail className="w-5 h-5" />
                    <span>Email</span>
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2">
                    <FiCalendar className="w-5 h-5" />
                    <span>Schedule Viewing</span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex overflow-x-auto">
                    {[
                      "overview",
                      "description",
                      "location",
                    ].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition duration-200 ${
                          activeTab === tab
                            ? "border-blue-500 text-blue-500"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Property Overview
                        </h3>
                        <p className="text-gray-700 leading-relaxed break-words">
                          {property.description || "No description available."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Key Details
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">
                                Property Type
                              </span>
                              <span className="text-gray-900 font-medium">
                                {getCategoryLabel(property.category)}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Purpose</span>
                              <span className="text-gray-900 font-medium capitalize">
                                {property.purpose}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Status</span>
                              <span className="text-gray-900 font-medium capitalize">
                                {property.status || "Available"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Property Features
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Furnishing</span>
                              <span className="text-gray-900 font-medium capitalize">
                                {property.furnishing || "Not specified"}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Area Unit</span>
                              <span className="text-gray-900 font-medium uppercase">
                                {property.areaUnit || "Sq. Ft."}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Price Type</span>
                              <span className="text-gray-900 font-medium capitalize">
                                {property.priceType || "Total"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "description" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Detailed Description
                      </h3>
                      <div className="text-gray-700 leading-relaxed break-words whitespace-pre-line">
                        {property.description || "No detailed description available."}
                      </div>
                    </div>
                  )}

                  {/* {activeTab === "features" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Features & Amenities
                      </h3>
                      {allFeatures.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {allFeatures.slice(0, 15).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <FiCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              <span className="text-gray-700 text-sm break-words capitalize">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No features listed</p>
                      )}
                    </div>
                  )} */}

                  {activeTab === "location" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Location Details
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 break-words">
                            {property.location?.address || 
                             property.location?.area || 
                             property.location?.city || 
                             "Location information not available"}
                          </p>
                        </div>
                      </div>
                      
                      {property.location?.city && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            City
                          </h4>
                          <p className="text-gray-700 break-words">{property.location.city}</p>
                        </div>
                      )}
                      
                      {property.location?.area && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Area
                          </h4>
                          <p className="text-gray-700 break-words">{property.location.area}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {similarProperties.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Similar Properties
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {similarProperties.map((similarProperty) => (
                      <div
                        key={similarProperty._id}
                        onClick={() =>
                          navigate(`/property/${similarProperty._id}`)
                        }
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-200 cursor-pointer"
                      >
                        <div className="aspect-w-16 aspect-h-12 h-40">
                          <img
                            src={similarProperty.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"}
                            alt={similarProperty.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 break-words">
                            {similarProperty.title}
                          </h3>
                          <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                            {similarProperty.location?.area || similarProperty.location?.city || "Abu Dhabi"}
                          </p>
                          <div className="text-lg font-bold text-blue-600 break-words">
                            AED {formatPrice(similarProperty.price)}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                            <span>{similarProperty.bedrooms || 0} bed</span>
                            <span>{similarProperty.bathrooms || 0} bath</span>
                            <span>{similarProperty.area?.toLocaleString() || 0} sq.ft</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {agent && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="text-center mb-4">
                      {agent.profileImage ? (
                        <img
                          src={agent.profileImage}
                          alt={agent.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-blue-100 flex items-center justify-center border-2 border-blue-500">
                          <span className="text-blue-600 text-xl font-semibold">
                            {agent.name?.charAt(0) || "A"}
                          </span>
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900 break-words">
                        {agent.name || "Property Owner"}
                      </h3>
                      <p className="text-gray-600 text-sm break-words">
                        {agent.company || "Real Estate Agent"}
                      </p>
                      {agent.rating && (
                        <div className="flex items-center justify-center space-x-1 mt-1">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">
                            {agent.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => handleContactAgent("call")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                      >
                        <FiPhone className="w-5 h-5" />
                        <span>Call Agent</span>
                      </button>
                      <button
                        onClick={() => handleContactAgent("whatsapp")}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
                      >
                        <FiMessageCircle className="w-5 h-5" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleContactAgent("email")}
                        className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-3 rounded-lg font-semibold transition duration-200"
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Property Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Reference No:</span>
                      <span className="text-gray-900 font-medium break-words">
                        {property._id?.slice(-8) || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Posted:</span>
                      <span className="text-gray-900 font-medium">
                        {formatDate(property.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-blue-600 font-medium capitalize">
                        {property.status || "Active"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Urgent:</span>
                      <span className={`font-medium ${property.isUrgent ? 'text-red-600' : 'text-gray-600'}`}>
                        {property.isUrgent ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Safety Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="break-words">Meet in a public place</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="break-words">Inspect the property before paying</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="break-words">Never wire money in advance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="break-words">Check all documents carefully</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;


// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   FiHeart,
//   FiMapPin,
//   FiHome,
//   FiCheck,
//   FiStar,
//   FiPhone,
//   FiMessageCircle,
//   FiCalendar,
//   FiShare2,
//   FiFlag,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCamera,
// } from "react-icons/fi";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const property = {
//     id: 1,
//     title: "2BR Luxury Apartment with Sea View - Al Reem Island",
//     price: 120000,
//     type: "apartments-for-sale",
//     beds: 2,
//     baths: 2,
//     area: 1200,
//     yearBuilt: 2022,
//     location: "Al Reem Island, Abu Dhabi",
//     address: "Al Reem Island, Abu Dhabi, UAE",
//     description:
//       "This stunning 2-bedroom apartment offers breathtaking sea views and luxurious modern living in the heart of Al Reem Island. The property features high-quality finishes, spacious living areas, and access to world-class amenities.",
//     detailedDescription: `This exquisite 2-bedroom apartment is located in one of Abu Dhabi's most prestigious developments on Al Reem Island. The property boasts:

// • Floor-to-ceiling windows with panoramic sea views
// • Modern open-plan living and dining area
// • High-quality European kitchen appliances
// • Master bedroom with walk-in closet and en-suite bathroom
// • Guest bedroom with built-in wardrobes
// • Two modern bathrooms with premium fixtures
// • Balcony with stunning views
// • Central air conditioning
// • Smart home features

// Building Amenities:
// • Infinity swimming pool
// • State-of-the-art gymnasium
// • Children's play area
// • 24/7 security and concierge
// • Underground parking
// • Landscaped gardens`,

//     features: [
//       "Balcony",
//       "Built-in Wardrobes",
//       "Central Air Conditioning",
//       "Concierge",
//       "Covered Parking",
//       "Swimming Pool",
//       "Gym",
//       "Sea View",
//       "Modern Kitchen",
//       "Walk-in Closet",
//       "Smart Home",
//       "Pet Friendly",
//       "Security",
//       "Maintenance",
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
//       "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
//       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
//       "https://images.unsplash.com/photo-1628133287836-40bd5453bed1?w=800",
//     ],
//     agent: {
//       name: "Ahmed Al Mansouri",
//       company: "Better Homes",
//       phone: "+971 50 123 4567",
//       email: "ahmed@betterhomes.ae",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
//       experience: "8 years",
//       rating: 4.8,
//       reviews: 127,
//       verified: true,
//       memberSince: "2018",
//       responseRate: "98%",
//       responseTime: "within 1 hour",
//     },
//     amenities: {
//       "Building Features": [
//         "Swimming Pool",
//         "Gym",
//         "Security",
//         "Concierge",
//         "Children's Play Area",
//       ],
//       "Apartment Features": [
//         "Balcony",
//         "Built-in Wardrobes",
//         "Central AC",
//         "Modern Kitchen",
//         "Walk-in Closet",
//       ],
//       "Additional Features": [
//         "Sea View",
//         "Covered Parking",
//         "Pet Friendly",
//         "Smart Home",
//       ],
//     },
//     locationDetails: {
//       landmarks: [
//         { name: "Reem Mall", distance: "5 min drive" },
//         { name: "Abu Dhabi Global Market", distance: "8 min drive" },
//         { name: "Corniche Beach", distance: "12 min drive" },
//         { name: "Abu Dhabi International Airport", distance: "25 min drive" },
//       ],
//       schools: [
//         "Repton School Abu Dhabi - 5 min drive",
//         "Brighton College Abu Dhabi - 8 min drive",
//       ],
//     },
//     datePosted: "2 hours ago",
//     views: 247,
//     reference: "PRP001234",
//     status: "Available",
//   };

//   const similarProperties = [
//     {
//       id: 4,
//       title: "1BR Apartment with Marina View",
//       price: 85000,
//       type: "apartments-for-sale",
//       beds: 1,
//       baths: 1,
//       area: 900,
//       location: "Al Reem Island",
//       image:
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
//       date: "1 day ago",
//     },
//     {
//       id: 5,
//       title: "3BR Luxury Apartment",
//       price: 180000,
//       type: "apartments-for-sale",
//       beds: 3,
//       baths: 2,
//       area: 1600,
//       location: "Al Raha Beach",
//       image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
//       date: "3 hours ago",
//     },
//     {
//       id: 6,
//       title: "2BR Apartment for Rent",
//       price: 65000,
//       type: "apartments-for-rent",
//       beds: 2,
//       baths: 2,
//       area: 1100,
//       location: "Khalifa City",
//       image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//       date: "5 hours ago",
//     },
//   ];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === property.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? property.images.length - 1 : prev - 1
//     );
//   };

//   const handleContactAgent = (type) => {
//     if (type === "call") {
//       window.open(`tel:${property.agent.phone}`);
//     } else if (type === "whatsapp") {
//       window.open(`https://wa.me/${property.agent.phone.replace("+", "")}`);
//     }
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const shareProperty = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: property.title,
//         text: property.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert("Link copied to clipboard!");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <div className="bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 py-3">
//             <nav className="flex items-center space-x-2 text-sm text-gray-600">
//               <button
//                 onClick={() => navigate("/")}
//                 className="hover:text-blue-500 transition duration-200"
//               >
//                 Home
//               </button>
//               <span>›</span>
//               <button
//                 onClick={() => navigate("/properties")}
//                 className="hover:text-blue-500 transition duration-200"
//               >
//                 Properties for Sale
//               </button>
//               <span>›</span>
//               <button
//                 onClick={() =>
//                   navigate(`/properties?category=${property.type}`)
//                 }
//                 className="hover:text-blue-500 transition duration-200"
//               >
//                 Apartments for Sale
//               </button>
//               <span>›</span>
//               <span className="text-gray-900 font-medium">
//                 Property Details
//               </span>
//             </nav>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
//                 <div className="relative">
//                   <div className="aspect-w-16 aspect-h-10 h-96">
//                     <img
//                       src={property.images[currentImageIndex]}
//                       alt={property.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   {property.images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition duration-200"
//                       >
//                         <FiChevronLeft className="w-5 h-5 text-gray-700" />
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition duration-200"
//                       >
//                         <FiChevronRight className="w-5 h-5 text-gray-700" />
//                       </button>
//                     </>
//                   )}
//                   <div className="absolute top-4 left-4 flex flex-col gap-2">
//                     <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
//                       Featured
//                     </span>
//                     <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       Verified
//                     </span>
//                   </div>
//                   <div className="absolute top-4 right-4 flex gap-2">
//                     <button
//                       onClick={toggleFavorite}
//                       className={`p-2 rounded-full shadow-lg transition duration-200 ${
//                         isFavorite
//                           ? "bg-red-500 text-white hover:bg-red-600"
//                           : "bg-white text-gray-600 hover:bg-gray-50 hover:text-red-500"
//                       }`}
//                     >
//                       <FiHeart
//                         className={`w-5 h-5 ${
//                           isFavorite ? "fill-current" : ""
//                         }`}
//                       />
//                     </button>
//                     <button
//                       onClick={shareProperty}
//                       className="bg-white text-gray-600 hover:bg-gray-50 p-2 rounded-full shadow-lg transition duration-200"
//                     >
//                       <FiShare2 className="w-5 h-5" />
//                     </button>
//                     <button className="bg-white text-gray-600 hover:bg-gray-50 p-2 rounded-full shadow-lg transition duration-200">
//                       <FiFlag className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
//                     <FiCamera className="w-4 h-4 inline mr-1" />
//                     {currentImageIndex + 1} / {property.images.length}
//                   </div>
//                 </div>
//                 <div className="p-4 border-t border-gray-200">
//                   <div className="flex space-x-2 overflow-x-auto">
//                     {property.images.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentImageIndex(index)}
//                         className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition duration-200 ${
//                           currentImageIndex === index
//                             ? "border-blue-500"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         <img
//                           src={image}
//                           alt={`${property.title} ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
//                   <div className="flex-1">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-2">
//                       {property.title}
//                     </h1>
//                     <div className="flex items-center text-gray-600 mb-4">
//                       <FiMapPin className="w-4 h-4 mr-1" />
//                       <span>{property.location}</span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-3xl font-bold text-blue-600 mb-1">
//                       AED {property.price.toLocaleString()}
//                     </div>
//                     <div className="text-gray-600 text-sm">For Sale</div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
//                   <div className="text-center">
//                     <div className="flex items-center justify-center space-x-1 mb-1">
//                       <FiHome className="w-4 h-4 text-gray-600" />
//                       <div className="text-lg font-bold text-gray-900">
//                         {property.beds}
//                       </div>
//                     </div>
//                     <div className="text-gray-600 text-sm">Bedrooms</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-gray-900">
//                       {property.baths}
//                     </div>
//                     <div className="text-gray-600 text-sm">Bathrooms</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-gray-900">
//                       {property.area.toLocaleString()}
//                     </div>
//                     <div className="text-gray-600 text-sm">Sq. Ft.</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-gray-900">
//                       {property.yearBuilt}
//                     </div>
//                     <div className="text-gray-600 text-sm">Year Built</div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     onClick={() => handleContactAgent("call")}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <FiPhone className="w-5 h-5" />
//                     <span>Call</span>
//                   </button>
//                   <button
//                     onClick={() => handleContactAgent("whatsapp")}
//                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <FiMessageCircle className="w-5 h-5" />
//                     <span>WhatsApp</span>
//                   </button>
//                   <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2">
//                     <FiMessageCircle className="w-5 h-5" />
//                     <span>Send Message</span>
//                   </button>
//                   <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2">
//                     <FiCalendar className="w-5 h-5" />
//                     <span>Schedule Viewing</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg border border-gray-200 mb-6">
//                 <div className="border-b border-gray-200">
//                   <nav className="flex overflow-x-auto">
//                     {[
//                       "overview",
//                       "description",
//                       "features",
//                       "location",
//                       "contact",
//                     ].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition duration-200 ${
//                           activeTab === tab
//                             ? "border-blue-500 text-blue-500"
//                             : "border-transparent text-gray-600 hover:text-gray-800"
//                         }`}
//                       >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//                 <div className="p-6">
//                   {activeTab === "overview" && (
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                           Property Overview
//                         </h3>
//                         <p className="text-gray-700 leading-relaxed">
//                           {property.description}
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div>
//                           <h4 className="font-semibold text-gray-900 mb-4">
//                             Key Details
//                           </h4>
//                           <div className="space-y-3">
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">
//                                 Property Type
//                               </span>
//                               <span className="text-gray-900 font-medium">
//                                 Apartment
//                               </span>
//                             </div>
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">Furnishing</span>
//                               <span className="text-gray-900 font-medium">
//                                 Furnished
//                               </span>
//                             </div>
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">Parking</span>
//                               <span className="text-gray-900 font-medium">
//                                 2 Covered
//                               </span>
//                             </div>
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">
//                                 Maintenance Fee
//                               </span>
//                               <span className="text-gray-900 font-medium">
//                                 AED 1,200/year
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div>
//                           <h4 className="font-semibold text-gray-900 mb-4">
//                             Building Information
//                           </h4>
//                           <div className="space-y-3">
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">
//                                 Building Name
//                               </span>
//                               <span className="text-gray-900 font-medium">
//                                 Marina Heights
//                               </span>
//                             </div>
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">Floor</span>
//                               <span className="text-gray-900 font-medium">
//                                 15th Floor
//                               </span>
//                             </div>
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">View</span>
//                               <span className="text-gray-900 font-medium">
//                                 Sea View
//                               </span>
//                             </div>
//                             <div className="flex justify-between py-2 border-b border-gray-100">
//                               <span className="text-gray-600">Status</span>
//                               <span className="text-blue-600 font-medium">
//                                 Ready to Move In
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === "description" && (
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                         Detailed Description
//                       </h3>
//                       <div className="text-gray-700 leading-relaxed whitespace-pre-line">
//                         {property.detailedDescription}
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === "features" && (
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-6">
//                         Features & Amenities
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {Object.entries(property.amenities).map(
//                           ([category, features]) => (
//                             <div key={category}>
//                               <h4 className="font-semibold text-gray-900 mb-3">
//                                 {category}
//                               </h4>
//                               <div className="space-y-2">
//                                 {features.map((feature, index) => (
//                                   <div
//                                     key={index}
//                                     className="flex items-center space-x-2"
//                                   >
//                                     <FiCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
//                                     <span className="text-gray-700 text-sm">
//                                       {feature}
//                                     </span>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === "location" && (
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                           Location & Neighborhood
//                         </h3>
//                         <div className="bg-gray-50 rounded-lg p-4">
//                           <p className="text-gray-700">{property.address}</p>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <h4 className="font-semibold text-gray-900 mb-3">
//                             Nearby Landmarks
//                           </h4>
//                           <div className="space-y-3">
//                             {property.locationDetails.landmarks.map(
//                               (landmark, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex justify-between items-center py-2 border-b border-gray-100"
//                                 >
//                                   <span className="text-gray-700">
//                                     {landmark.name}
//                                   </span>
//                                   <span className="text-gray-900 font-medium text-sm bg-gray-100 px-2 py-1 rounded">
//                                     {landmark.distance}
//                                   </span>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>

//                         <div>
//                           <h4 className="font-semibold text-gray-900 mb-3">
//                             Nearby Schools
//                           </h4>
//                           <div className="space-y-2">
//                             {property.locationDetails.schools.map(
//                               (school, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex items-center space-x-2 py-2 border-b border-gray-100"
//                                 >
//                                   <FiCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
//                                   <span className="text-gray-700 text-sm">
//                                     {school}
//                                   </span>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === "contact" && (
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                         Contact Information
//                       </h3>
//                       <div className="bg-gray-50 rounded-lg p-6">
//                         <div className="flex items-start space-x-4 mb-6">
//                           <img
//                             src={property.agent.image}
//                             alt={property.agent.name}
//                             className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
//                           />
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-gray-900 text-lg">
//                               {property.agent.name}
//                             </h4>
//                             <p className="text-gray-600">
//                               {property.agent.company}
//                             </p>
//                             <div className="flex items-center space-x-4 mt-2">
//                               <div className="flex items-center space-x-1">
//                                 <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
//                                 <span className="text-sm font-medium text-gray-700">
//                                   {property.agent.rating}
//                                 </span>
//                               </div>
//                               <span className="text-gray-400">•</span>
//                               <span className="text-sm text-gray-600">
//                                 {property.agent.reviews} reviews
//                               </span>
//                               {property.agent.verified && (
//                                 <>
//                                   <span className="text-gray-400">•</span>
//                                   <span className="text-blue-600 text-sm font-medium flex items-center space-x-1">
//                                     <FiCheck className="w-3 h-3" />
//                                     <span>Verified</span>
//                                   </span>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="space-y-3">
//                             <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
//                               <FiPhone className="w-5 h-5 text-blue-600" />
//                               <span className="text-gray-900 font-medium">
//                                 {property.agent.phone}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
//                               <FiMessageCircle className="w-5 h-5 text-gray-600" />
//                               <span className="text-gray-900">
//                                 {property.agent.email}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="space-y-2 text-sm text-gray-600">
//                             <div className="flex justify-between">
//                               <span>Member Since:</span>
//                               <span className="text-gray-900">
//                                 {property.agent.memberSince}
//                               </span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span>Response Rate:</span>
//                               <span className="text-gray-900">
//                                 {property.agent.responseRate}
//                               </span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span>Response Time:</span>
//                               <span className="text-gray-900">
//                                 {property.agent.responseTime}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                   Similar Properties
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {similarProperties.map((similarProperty) => (
//                     <div
//                       key={similarProperty.id}
//                       onClick={() =>
//                         navigate(`/property/${similarProperty.id}`)
//                       }
//                       className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-200 cursor-pointer"
//                     >
//                       <div className="aspect-w-16 aspect-h-12 h-40">
//                         <img
//                           src={similarProperty.image}
//                           alt={similarProperty.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
//                           {similarProperty.title}
//                         </h3>
//                         <p className="text-gray-600 text-xs mb-2">
//                           {similarProperty.location}
//                         </p>
//                         <div className="text-lg font-bold text-blue-600">
//                           AED {similarProperty.price.toLocaleString()}
//                         </div>
//                         <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
//                           <span>{similarProperty.beds} bed</span>
//                           <span>{similarProperty.baths} bath</span>
//                           <span>{similarProperty.area} sq.ft</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="lg:col-span-1">
//               <div className="sticky top-6 space-y-6">
//                 <div className="bg-white rounded-lg border border-gray-200 p-6">
//                   <div className="text-center mb-4">
//                     <img
//                       src={property.agent.image}
//                       alt={property.agent.name}
//                       className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-blue-500"
//                     />
//                     <h3 className="font-semibold text-gray-900">
//                       {property.agent.name}
//                     </h3>
//                     <p className="text-gray-600 text-sm">
//                       {property.agent.company}
//                     </p>
//                     <div className="flex items-center justify-center space-x-1 mt-1">
//                       <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-medium text-gray-700">
//                         {property.agent.rating}
//                       </span>
//                       <span className="text-gray-400">•</span>
//                       <span className="text-sm text-gray-600">
//                         {property.agent.reviews} reviews
//                       </span>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <button
//                       onClick={() => handleContactAgent("call")}
//                       className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
//                     >
//                       <FiPhone className="w-5 h-5" />
//                       <span>Call Agent</span>
//                     </button>
//                     <button
//                       onClick={() => handleContactAgent("whatsapp")}
//                       className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center space-x-2"
//                     >
//                       <FiMessageCircle className="w-5 h-5" />
//                       <span>WhatsApp</span>
//                     </button>
//                     <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-3 rounded-lg font-semibold transition duration-200">
//                       Send Message
//                     </button>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg border border-gray-200 p-6">
//                   <h3 className="font-semibold text-gray-900 mb-4">
//                     Property Information
//                   </h3>
//                   <div className="space-y-3 text-sm">
//                     <div className="flex justify-between py-2 border-b border-gray-100">
//                       <span className="text-gray-600">Reference No:</span>
//                       <span className="text-gray-900 font-medium">
//                         {property.reference}
//                       </span>
//                     </div>
//                     <div className="flex justify-between py-2 border-b border-gray-100">
//                       <span className="text-gray-600">Posted:</span>
//                       <span className="text-gray-900 font-medium">
//                         {property.datePosted}
//                       </span>
//                     </div>
//                     <div className="flex justify-between py-2 border-b border-gray-100">
//                       <span className="text-gray-600">Views:</span>
//                       <span className="text-gray-900 font-medium">
//                         {property.views}
//                       </span>
//                     </div>
//                     <div className="flex justify-between py-2">
//                       <span className="text-gray-600">Status:</span>
//                       <span className="text-blue-600 font-medium">
//                         {property.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//                   <h3 className="font-semibold text-blue-900 mb-3">
//                     Safety Tips
//                   </h3>
//                   <ul className="space-y-2 text-sm text-blue-800">
//                     <li className="flex items-start space-x-2">
//                       <span className="text-blue-600 mt-0.5">•</span>
//                       <span>Meet in a public place</span>
//                     </li>
//                     <li className="flex items-start space-x-2">
//                       <span className="text-blue-600 mt-0.5">•</span>
//                       <span>Inspect the property before paying</span>
//                     </li>
//                     <li className="flex items-start space-x-2">
//                       <span className="text-blue-600 mt-0.5">•</span>
//                       <span>Never wire money in advance</span>
//                     </li>
//                     <li className="flex items-start space-x-2">
//                       <span className="text-blue-600 mt-0.5">•</span>
//                       <span>Check all documents carefully</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PropertyDetails;

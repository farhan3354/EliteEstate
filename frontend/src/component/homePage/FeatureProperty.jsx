import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiMapPin,
  FiHome,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState({});

  const featuredProperties = [
    {
      id: 1,
      title:
        "Prime Location Multiple Studio Available Near Mall of the Emirates",
      location: "Al Barsha",
      price: "AED 50,000",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Studio",
      beds: 0,
      baths: 1,
      area: "360 SqFt",
      photos: 14,
      timeAgo: "23 minutes",
      agent: {
        name: "City Tower Real Estate L.L.C",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/City-Tower_New-Thumb_2017.06.png?impolicy=agency",
      },
    },
    {
      id: 2,
      title: "3BR+MAID+STUDY | SPACIOUS | SINGLE ROW",
      location: "Reem",
      price: "AED 175,000",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Villa",
      beds: 3,
      baths: 4,
      area: "2,882 SqFt",
      photos: 19,
      timeAgo: "26 minutes",
      agent: {
        name: "Savvy Homes Real Estate",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/2025/07/11/e7b4130c48de4b2e90e32372bbb39fd0-.jpg?impolicy=agency",
      },
    },
    {
      id: 3,
      title: "Fully furnished 1 Bedroom Apartment | Burj views | High Floor",
      location: "Sobha Hartland",
      price: "AED 90,000",
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Apartment",
      beds: 1,
      baths: 1,
      area: "515 SqFt",
      photos: 10,
      timeAgo: "28 minutes",
      agent: {
        name: "La Vida Nova Real Estate",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/1680154254_LAVIDANOVAREALESTATEL.L.C.png?impolicy=agency",
      },
    },
    {
      id: 4,
      title: "Spacious | Open View | Peaceful | Ready to Move In",
      location: "Jumeirah Village Circle (JVC)",
      price: "AED 60,000",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Studio",
      beds: 0,
      baths: 1,
      area: "490 SqFt",
      photos: 11,
      timeAgo: "35 minutes",
      agent: {
        name: "Provident Real Estate",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/2025/08/11/0255228425fc4deeb1e2eeeaac97af6a-.jpg?impolicy=agency",
      },
    },
    {
      id: 5,
      title: "4BR + Guest Room + Maid Room Villa with Garden",
      location: "Dubai South",
      price: "AED 200,000",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Villa",
      beds: 4,
      baths: 6,
      area: "2,711 SqFt",
      photos: 53,
      timeAgo: "36 minutes",
      agent: {
        name: "The Legends Real Estate",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/the_legends_logo.jpg?impolicy=agency",
      },
    },
    {
      id: 6,
      title: "Prime Location | 3BR+Maid | Ready to move",
      location: "Dubai South",
      price: "AED 120,000",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "Villa",
      beds: 3,
      baths: 4,
      area: "1,577 SqFt",
      photos: 30,
      timeAgo: "42 minutes",
      agent: {
        name: "The Legends Real Estate",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/the_legends_logo.jpg?impolicy=agency",
      },
    },
  ];

  const toggleFavorite = (e, propertyId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const scrollLeft = index * 320; 
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex =
      (currentIndex + 1) % Math.ceil(featuredProperties.length / 2);
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentIndex === 0
        ? Math.ceil(featuredProperties.length / 2) - 1
        : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const HeartIcon = ({ filled, onClick }) => (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className="cursor-pointer"
      style={{ width: "24px", height: "24px" }}
    >
      <rect
        x="6"
        y="6"
        width="28"
        height="28"
        rx="6"
        fill="white"
        fillOpacity="0.6"
      ></rect>
      <path
        opacity="1"
        d="M28.172 12.8791C27.112 11.8163 25.7068 11.1676 24.2103 11.0502C22.7139 10.9329 21.2248 11.3545 20.012 12.2391C18.7397 11.2927 17.156 10.8636 15.5799 11.0381C14.0038 11.2126 12.5524 11.9778 11.518 13.1797C10.4835 14.3815 9.94282 15.9306 10.0048 17.5151C10.0668 19.0996 10.7268 20.6017 11.852 21.7191L18.062 27.9391C18.582 28.4509 19.2824 28.7377 20.012 28.7377C20.7416 28.7377 21.442 28.4509 21.962 27.9391L28.172 21.7191C29.3396 20.5443 29.9949 18.9553 29.9949 17.2991C29.9949 15.6428 29.3396 14.0538 28.172 12.8791Z"
        fill={filled ? "#ff3b30" : "transparent"}
        stroke={filled ? "#ff3b30" : "#6b7280"}
        strokeWidth="1.5"
      ></path>
    </svg>
  );

  const PropertyCard = ({ property }) => {
    return (
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden flex-shrink-0 w-80"
        onClick={() => handlePropertyClick(property.id)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <div
              className="favorite-container bg-white bg-opacity-80 rounded-full p-1"
              onClick={(e) => toggleFavorite(e, property.id)}
            >
              <HeartIcon filled={isFavorite[property.id]} />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {property.photos} Photos
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-lg font-bold text-gray-800">
                {property.price}
              </span>
              <h3 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">
                {property.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {property.type} •{" "}
                {property.beds > 0
                  ? `${property.beds} Bed${property.beds > 1 ? "s" : ""} • `
                  : ""}
                {property.baths} Bath{property.baths > 1 ? "s" : ""} •{" "}
                {property.area}
              </p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <img
                src={property.agent.logo}
                alt={property.agent.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center text-gray-600 text-sm">
              <FiMapPin className="w-3 h-3 mr-1" />
              <span>{property.location}</span>
            </div>
            <span className="text-gray-500 text-xs">{property.timeAgo}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            See more Property for Rent listings
            <FiArrowRight className="ml-1 w-5 h-5" />
          </Link>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 12"
              fill="#212223"
              height="14"
              width="14"
            >
              <path d="M7.41008 1.41008L2.82008 6.00008L7.41008 10.5901L6.00008 12.0001L0.00008 6.00008L6.00008 0.00008L7.41008 1.41008Z"></path>
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 12"
              fill="#212223"
              height="14"
              width="14"
            >
              <path d="M0.419922 10.5899L4.999922 5.99992L0.419922 1.40992L1.829922 -7.62939e-05L7.829922 5.99992L1.829922 11.9999L0.419922 10.5899Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

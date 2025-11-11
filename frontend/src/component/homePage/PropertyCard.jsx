import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#E53E3E"
              />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
         1 
        </div>
        {property.premium && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              PREMIUM
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold">
              <span>AED </span>
              <span>{property.price}</span>
              <span className="text-sm font-normal ml-1">
                {property.period}
              </span>
            </h3>
            <p className="text-gray-600 text-sm">{property.type}</p>
          </div>
          {property.verified && (
            <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
              <img
                src="https://static.dubizzle.com/frontend-web/static-resources/assets/property-icons/verified_icon.svg"
                alt="Verified"
                className="w-3 h-3 mr-1"
              />
              Verified
            </div>
          )}
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <div className="flex items-center mr-4">
            <img
              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/bed_space.svg"
              alt="Beds"
              className="w-4 h-4 mr-1"
            />
            <span>{property.beds} bed</span>
          </div>
          <div className="flex items-center mr-4">
            <img
              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/bath.svg"
              alt="Baths"
              className="w-4 h-4 mr-1"
            />
            <span>{property.baths} bath</span>
          </div>
          <div className="flex items-center">
            <img
              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/size.svg"
              alt="Size"
              className="w-4 h-4 mr-1"
            />
            <span>{property.size} sqft</span>
          </div>
        </div>

        <h2 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h2>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <img
            src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/location_outlined.svg"
            alt="Location"
            className="w-3 h-4 mr-1"
          />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex justify-between">
          <button className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium flex-1 mr-2 hover:bg-blue-700">
            <img
              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/mailOutline.svg"
              alt="Email"
              className="w-4 h-4 mr-1"
            />
            Email
          </button>
          <button className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium flex-1 mr-2 hover:bg-blue-700">
            <img
              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/phoneOutline.svg"
              alt="Call"
              className="w-4 h-4 mr-1"
            />
            Call
          </button>
          <button className="flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium flex-1 hover:bg-green-700">
            <img
              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/whatsapp2.svg"
              alt="WhatsApp"
              className="w-4 h-4 mr-1"
            />
            WhatsApp
          </button>
        </div>
      </div>
      <div className="px-4 pb-4">
        <a href="#" className="flex items-center">
          <img
            src={property.agency.logo}
            alt={property.agency.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;

import React from "react";
import FilterBar from './../../component/homePage/FilterBar';
import Breadcrumbs from './../../component/homePage/Breadcrumbs';
import PopularLocations from './../../component/homePage/PopularLocations';
import FurnishingFilter from './../../component/homePage/FurnishingFilter';
import PropertyCard from "../../component/homePage/PropertyCard";

const PropertyListings = () => {
  const properties = [
    {
      id: 1,
      title: "Elegant 1-Bedroom in JVT | Rooftop Pool | AED 75K Annually",
      price: "75,000",
      period: "Yearly",
      type: "Apartment",
      beds: 1,
      baths: 1,
      size: 600,
      location:
        "La Residence, JVT District 1, Jumeirah Village Triangle (JVT), Dubai",
      images: [
        "https://dbz-images.dubizzle.com/images/2025/09/07/ee967c8b-5f2b-4c6b-b255-a159e7284dc2/52443d4b72f84f0b8e8ef659c7fe25fa-.jpg?impolicy=lpv",
      ],
      verified: true,
      premium: true,
      agency: {
        name: "Capital Masters Real Estate",
        logo: "https://dbz-images.dubizzle.com/profiles/property_agency/2025/08/12/cf23f99d495c4556b106a3d4d0253101-.jpg?impolicy=agency",
      },
    },
    {
      id: 2,
      title: "Luxury 2-Bedroom Apartment with Sea View",
      price: "120,000",
      period: "Yearly",
      type: "Apartment",
      beds: 2,
      baths: 2,
      size: 1100,
      location: "Dubai Marina, Dubai",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      ],
      verified: true,
      premium: false,
      agency: {
        name: "Luxury Properties",
        logo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100",
      },
    },
    // Add more properties as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar />
      <Breadcrumbs />
      <PageHeader />
      <PopularLocations />
      <FurnishingFilter />

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;

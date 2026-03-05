import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertyAPI } from "../services/api";
import { FiArrowRight } from "react-icons/fi";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await propertyAPI.getCategories();
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Explore by Category</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect property type that suits your needs. From luxury villas to modern apartments, browse our curated collections.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-white rounded-3xl animate-pulse shadow-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => navigate(`/properties?category=${category.value}`)}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
              >
                <img
                  src={category.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {category.count || 0} Listings
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                    <span>View properties</span>
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

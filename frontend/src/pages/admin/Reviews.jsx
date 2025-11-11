import React, { useState, useEffect } from "react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        property: { title: "Luxury 3BR Apartment" },
        user: { name: "John Doe" },
        agent: { name: "Sarah Wilson" },
        rating: 5,
        title: "Excellent Service!",
        comment:
          "Sarah was very professional and helped us find the perfect apartment. Highly recommended!",
        status: "active",
        createdAt: "2024-01-15",
        response: null,
      },
      {
        id: 2,
        property: { title: "Modern Villa" },
        user: { name: "Emily Brown" },
        agent: { name: "Mike Johnson" },
        rating: 4,
        title: "Good Experience",
        comment: "Mike was helpful but the process took longer than expected.",
        status: "active",
        createdAt: "2024-01-14",
        response: {
          comment:
            "Thank you for your feedback. We are working on improving our process times.",
          respondedAt: "2024-01-14",
        },
      },
      {
        id: 3,
        property: { title: "Studio Apartment" },
        user: { name: "David Wilson" },
        agent: { name: "Emily Brown" },
        rating: 2,
        title: "Disappointing",
        comment: "The apartment was not as described in the listing.",
        status: "flagged",
        createdAt: "2024-01-13",
        response: null,
      },
      {
        id: 4,
        property: { title: "Commercial Space" },
        user: { name: "Sarah Johnson" },
        agent: { name: "David Smith" },
        rating: 5,
        title: "Outstanding!",
        comment:
          "David went above and beyond to help us secure the perfect commercial space.",
        status: "active",
        createdAt: "2024-01-12",
        response: {
          comment:
            "Thank you for the kind words! It was a pleasure working with you.",
          respondedAt: "2024-01-12",
        },
      },
    ];

    setReviews(mockReviews);
    setLoading(false);
  }, []);

  const filteredReviews = reviews.filter(
    (review) => filterStatus === "all" || review.status === filterStatus
  );

  const updateReviewStatus = (reviewId, status) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, status } : review
      )
    );
  };

  const deleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reviews Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage property and agent reviews
          </p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Reviews</option>
          <option value="active">Active</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.property.title}
                </h3>
                <p className="text-gray-600">
                  Review by {review.user.name} for agent {review.agent.name}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    review.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {review.status}
                </span>
                <span className="text-yellow-500 text-lg">
                  {renderStars(review.rating)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {review.title}
              </h4>
              <p className="text-gray-700">{review.comment}</p>
            </div>

            {review.response && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Agent Response:
                </p>
                <p className="text-blue-800">{review.response.comment}</p>
                <p className="text-xs text-blue-600 mt-1">
                  Responded on{" "}
                  {new Date(review.response.respondedAt).toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Posted on {new Date(review.createdAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                {review.status === "flagged" && (
                  <button
                    onClick={() => updateReviewStatus(review.id, "active")}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                  >
                    Approve
                  </button>
                )}
                {review.status === "active" && (
                  <button
                    onClick={() => updateReviewStatus(review.id, "flagged")}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                  >
                    Flag
                  </button>
                )}
                <button
                  onClick={() => deleteReview(review.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No reviews found matching your criteria.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{reviews.length}</p>
            <p className="text-gray-600">Total Reviews</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {reviews.filter((r) => r.status === "active").length}
            </p>
            <p className="text-gray-600">Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {reviews.filter((r) => r.status === "flagged").length}
            </p>
            <p className="text-gray-600">Flagged</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {(
                reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length
              ).toFixed(1)}
            </p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;

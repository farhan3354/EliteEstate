import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "Please provide a review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
      maxlength: 1000,
    },
    categories: {
      communication: {
        type: Number,
        min: 1,
        max: 5,
      },
      professionalism: {
        type: Number,
        min: 1,
        max: 5,
      },
      knowledge: {
        type: Number,
        min: 1,
        max: 5,
      },
      service: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    response: {
      comment: String,
      respondedAt: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "flagged", "removed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ property: 1, user: 1 }, { unique: true });

reviewSchema.post("save", async function () {
  const Review = this.constructor;

  const stats = await Review.aggregate([
    {
      $match: { agent: this.agent },
    },
    {
      $group: {
        _id: "$agent",
        averageRating: { $avg: "$rating" },
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    const Profile = mongoose.model("Profile");
    await Profile.findOneAndUpdate(
      { user: this.agent },
      {
        rating: Math.round(stats[0].averageRating * 10) / 10,
        totalReviews: stats[0].numberOfReviews,
      }
    );
  }
});

export default mongoose.model("Review", reviewSchema);

import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    cookingTime: {
      hour: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
    },
    skill: { type: String },
    additionalTips: { type: String },
    attachment: [{ type: String }],
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        username: { type: String },
        userImage: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
      },
    ],
    avgRating: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    username: { type: String },
  },
  { timestamps: true }
);

RecipeSchema.pre("save", function (next) {
  const totalRatings = this.ratings.length;
  if (totalRatings > 0) {
    const ratingsNum = this.ratings.map((obj) => obj.rating);
    const sumRating = ratingsNum.reduce((sum, curr) => sum + curr);
    this.avgRating = sumRating / totalRatings;
  } else {
    this.avgRating = 0;
  }
  next();
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

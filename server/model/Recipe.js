import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    cookingTime: {
      cookingHr: { type: Number },
      cookingMin: { type: Number },
    },
    skill: { type: String },
    serving: { type: Number },
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

RecipeSchema.pre("findOneAndUpdate", function (next) {
  console.log(this.getUpdate());
  next();
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

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
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [
      {
        commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        commentDescription: { type: String },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    username: { type: String },
  },
  { timestamps: true }
);

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

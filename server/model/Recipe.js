import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  attachment: [{ type: String }],
  rating: { type: Number },
  ratings: [{ type: Number }],
  comments: { type: Array, default: [] },
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

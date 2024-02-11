import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  attachment: [{ type: String }],
  likes: { type: Number },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: { type: Array, default: [] },
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

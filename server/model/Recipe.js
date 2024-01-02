import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  attachment: [{ type: String }],
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  savedRecipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
  picturePath: { type: String, default: "default.jpg" },
});

export const UserModel = mongoose.model("user", UserSchema);

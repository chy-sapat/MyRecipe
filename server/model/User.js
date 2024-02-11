import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  picturePath: { type: String, default: "default.jpg" },
  savedRecipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
});

export const UserModel = mongoose.model("user", UserSchema);

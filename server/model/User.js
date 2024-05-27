import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String },
    username: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    description: { type: String },
    picturePath: { type: String, default: "default.jpg" },
    savedRecipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    notification: [{ type: notificationSchema }],
    accountStatus: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);

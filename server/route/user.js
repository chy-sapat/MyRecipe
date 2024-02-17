import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, username, description, email, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(403).json({ message: "Username already taken" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    name,
    username,
    email,
    password: hashedPassword,
    description,
  });

  await newUser.save();
  res.status(200).json({ message: "Registered Successfully" });
});

router.get("/verify-email", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(403).json({ message: "Email already registered" });
  }
  res.status(200);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "No User Found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  res.status(200).json({ token, userId: user._id });
});

router.get("/fetch-user-data/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserModel.findById(userId);
  if (user) {
    return res.status(200).json({
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.picturePath,
    });
  }
  res.status(404).json({ message: "User not found" });
});

export { router as UserRouter };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserModel } from "../model/User.js";

const Register = async (req, res) => {
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
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
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
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const VerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(403).json({ message: "Email already registered" });
  }
  res.status(200);
};

const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return res.status(403);
      next();
    });
  } else {
    res.status(401);
  }
};
export { Register, Login, VerifyEmail, VerifyToken };

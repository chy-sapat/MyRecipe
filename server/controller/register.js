import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(403).json({ message: "User Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(200).json({ message: "Registered Successfully" });
};

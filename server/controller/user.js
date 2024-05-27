import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";

const FetchUserData = async (req, res) => {
  const userId = req.params.userId;
  const user = await UserModel.findById(userId, {
    password: 0,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

const UpdateUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const update = req.body.update;
    const user = await UserModel.findByIdAndUpdate(userId, update);
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ChangeUserPassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await UserModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findByIdAndDelete(userId);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

export { FetchUserData, UpdateUserData, ChangeUserPassword, DeleteUser };

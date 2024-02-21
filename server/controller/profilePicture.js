import { UserModel } from "../model/User.js";

export const ProfileImageUpload = async (req, res) => {
  const { userId } = req.body;
  const image = req.file.filename;

  await UserModel.findByIdAndUpdate(userId, { picturePath: image });
  res.status(200).json({ message: "Updated Profile Picture" });
};

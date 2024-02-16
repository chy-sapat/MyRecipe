import { UserModel } from "../model/User.js";

export const ProfileImageUpload = async (req, res) => {
  const { userId } = req.body;
  const picturePath = req.file.filename;

  const user = await UserModel.findByIdAndUpdate({ userId }, { picturePath });
  res.status(200).json({ message: "Updated Profile Picture" });
};

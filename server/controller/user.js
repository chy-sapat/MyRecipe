import { UserModel } from "../model/User.js";

const FetchUserData = async (req, res) => {
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
};

export { FetchUserData };

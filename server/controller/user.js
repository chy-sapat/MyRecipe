import { UserModel } from "../model/User.js";

const FetchUserData = async (req, res) => {
  const userId = req.params.userId;
  const user = await UserModel.findById(userId, {
    password: 0,
  });
  if (user) {
    return res.status(200).json(user);
  }
  res.status(404).json({ message: "User not found" });
};

export { FetchUserData };

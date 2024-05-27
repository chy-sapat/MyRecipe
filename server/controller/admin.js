import { UserModel } from "../model/User.js";
import { RecipeModel } from "../model/Recipe.js";

const FetchAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      {},
      {
        password: 0,
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const FetchAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500);
  }
};

export { FetchAllUsers, FetchAllRecipes };

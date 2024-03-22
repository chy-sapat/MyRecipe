import express from "express";
import { RecipeModel } from "../model/Recipe.js";
import { UserModel } from "../model/User.js";
import { FetchAllRecipe, FetchRecipeData } from "../controller/posts.js";

const router = express.Router();

router.get("/fetch-all", FetchAllRecipe);
router.get("/fetch-recipe/:id", FetchRecipeData);

router.put("/save-recipe", async (req, res) => {
  const { userId, recipeId } = req.body;
  const user = await UserModel.findById(userId);
  user.savedRecipe.push(recipeId);
  res.status(200).json({ message: "Recipe Saved Successfully" });
});

router.get("/fetch-save-recipe:id", async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  const savedRecipe = await RecipeModel.find({
    _id: { $in: user.savedRecipe },
  });
  res.status(200).json(savedRecipe);
});

router.put("/like/:id", async (req, res) => {
  const { userId, recipeId } = req.body;
  const recipe = await RecipeModel.findById(recipeId);
  recipe.likes += 1;
  recipe.likedBy.push(userId);
  res.status(200);
});

export { router as RecipeRouter };

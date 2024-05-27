import express from "express";
import {
  DeleteRating,
  DeleteRecipe,
  FetchAllRecipe,
  FetchRecipeData,
  FetchSavedRecipe,
  FetchTopRecipes,
  FetchUserRecipes,
  Rating,
  RemoveSavedRecipe,
  SaveRecipe,
  Search,
} from "../controller/posts.js";

const router = express.Router();

router.get("/fetch-all", FetchAllRecipe);
router.get("/fetch-top", FetchTopRecipes);
router.get("/fetch-recipe/:id", FetchRecipeData);
router.get("/fetch-user-recipe/:id", FetchUserRecipes);
router.patch("/save-recipe", SaveRecipe);
router.get("/fetch-save-recipe/:id", FetchSavedRecipe);
router.delete("/delete-recipe/:id", DeleteRecipe);
router.patch("/remove-saved-recipe", RemoveSavedRecipe);
router.patch("/rating/:recipeId", Rating);
router.patch("/delete-rating/:recipeId", DeleteRating);
router.get("/search/:keyword", Search);
router.patch("/report");

export { router as RecipeRouter };

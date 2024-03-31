import express from "express";
import {
  DeleteRecipe,
  FetchAllRecipe,
  FetchRecipeData,
  FetchSavedRecipe,
  FetchUserRecipes,
  Rating,
  RemoveSavedRecipe,
  SaveRecipe,
  Search,
} from "../controller/posts.js";

const router = express.Router();

router.get("/fetch-all", FetchAllRecipe);
router.get("/fetch-recipe/:id", FetchRecipeData);
router.get("/fetch-user-recipe/:id", FetchUserRecipes);
router.patch("/save-recipe", SaveRecipe);
router.get("/fetch-save-recipe/:id", FetchSavedRecipe);
router.delete("/delete-recipe/:id", DeleteRecipe);
router.patch("/remove-saved-recipe", RemoveSavedRecipe);
router.patch("/rating/:recipeId", Rating);
router.get("/search/:keyword", Search);

export { router as RecipeRouter };

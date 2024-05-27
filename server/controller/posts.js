import { RecipeModel } from "../model/Recipe.js";
import { UserModel } from "../model/User.js";
import fs from "fs";
import path from "path";

const PostUpload = async (req, res) => {
  const {
    userId,
    username,
    title,
    tags,
    description,
    ingredients,
    instructions,
    cookingTime,
    skill,
    additionalTips,
  } = req.body;
  let image = req.file ? req.file.filename : "defaultPostImage.jpg";
  const attachment = image;
  const recipe = new RecipeModel({
    title,
    tags: JSON.parse(tags),
    description,
    ingredients: JSON.parse(ingredients),
    instructions: JSON.parse(instructions),
    cookingTime: JSON.parse(cookingTime),
    skill,
    additionalTips,
    attachment,
    userId,
    username,
  });
  await recipe.save();
  res.status(200).json({ message: "Recipie Posted" });
};

const EditRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  const {
    title,
    tags,
    description,
    ingredients,
    steps,
    cookingTime,
    skill,
    additionalTips,
  } = req.body;
  try {
    const recipe = await recipe.findByIdAndUpdate(recipeId, {
      title: title,
      tags: JSON.parse(tags),
      description: description,
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps),
      cookingTime: JSON.parse(cookingTime),
      skill: skill,
      additionalTips: additionalTips,
    });
    res.status(200).json({ message: "Recipe Updated" });
  } catch (error) {
    res.status(500);
  }
};

const FetchAllRecipe = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500);
  }
};
const FetchTopRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({}).sort({ avgRating: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500);
  }
};

const FetchRecipeData = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500);
  }
};

const FetchUserRecipes = async (req, res) => {
  try {
    const userId = req.params.id;
    const recipes = await RecipeModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500);
  }
};

const SaveRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          savedRecipe: recipeId,
        },
      },
      { new: true }
    );
    res.status(200).json({ updatedSavedRecipe: user.savedRecipe });
  } catch (error) {
    res.status(500);
  }
};

const DeleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findByIdAndDelete(recipeId);
    res.status(200).json({ message: "Recipe Deleted Successfully" });
  } catch (error) {
    res.status(500);
  }
};

const RemoveSavedRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { savedRecipe: recipeId },
      },
      { new: true }
    );
    res.status(200).json({ updatedSavedRecipe: user.savedRecipe });
  } catch (error) {
    res.status(500);
  }
};

const FetchSavedRecipe = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    const savedRecipe = await RecipeModel.find({
      _id: { $in: user.savedRecipe },
    });
    res.status(200).json(savedRecipe);
  } catch (error) {
    res.status(500);
  }
};

const Rating = async (req, res) => {
  const recipeId = req.params.recipeId;
  const { userId, username, userImage, rating, comment } = req.body;
  try {
    const recipe = await RecipeModel.findOne({ _id: recipeId });
    const newRatings = recipe.ratings.filter(
      (ratings) => ratings.userId != userId
    );
    newRatings.push({
      userId: userId,
      username: username,
      userImage: userImage,
      rating: rating,
      comment: comment,
    });
    recipe.ratings = newRatings;
    await recipe.save();
    const user = await UserModel.findById(recipe.userId);
    user.notification.push = {
      message: `rated ${recipe.title} with ${rating}`,
      username: username,
    };
    await user.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteRating = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const ratingId = req.body.ratingId;
    const recipe = await RecipeModel.findById(recipeId);
    const newRatings = recipe.ratings.filter(
      (rating) => rating._id != ratingId
    );
    recipe.ratings = newRatings;
    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Search = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const recipes = await RecipeModel.find({ tags: keyword });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const ReportRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId);
  } catch (error) {}
};

export {
  PostUpload,
  FetchAllRecipe,
  FetchRecipeData,
  FetchUserRecipes,
  SaveRecipe,
  FetchSavedRecipe,
  Rating,
  DeleteRecipe,
  RemoveSavedRecipe,
  Search,
  DeleteRating,
  EditRecipe,
  FetchTopRecipes,
};

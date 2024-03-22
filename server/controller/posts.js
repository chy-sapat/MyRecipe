import { RecipeModel } from "../model/Recipe.js";

const PostUpload = async (req, res) => {
  const {
    userId,
    username,
    title,
    tags,
    description,
    ingredients,
    steps,
    cookingTime,
    skill,
    serving,
  } = req.body;
  const time = cookingTime.split(",");
  let image = req.file ? req.file.filename : "defaultPostImage.jpg";
  const attachment = image;
  console.log(userId);
  const recipe = new RecipeModel({
    title,
    tags: tags?.split(","),
    description,
    ingredients: ingredients.split(","),
    steps: steps.split(","),
    cookingTime: {
      cookingHr: time[0],
      cookingMin: time[1],
    },
    skill,
    serving,
    attachment,
    userId,
    username,
  });
  await recipe.save();
  res.status(200).json({ message: "Recipie Posted" });
};

const FetchAllRecipe = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (err) {
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

export { PostUpload, FetchAllRecipe, FetchRecipeData };

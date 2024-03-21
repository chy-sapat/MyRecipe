import { RecipeModel } from "../model/Recipe.js";

export const PostUpload = async (req, res) => {
  const {
    userId,
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
    userId,
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
  });
  await recipe.save();
  res.status(200).json({ message: "Recipie Posted" });
};

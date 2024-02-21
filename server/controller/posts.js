import { RecipeModel } from "../model/Recipe.js";

export const PostUpload = async (req, res) => {
  const { userId, title, description, ingredients, steps } = req.body;
  let image = req.file ? req.file.filename : "defaultPostImage.jpg";
  const attachment = image;
  const recipe = new RecipeModel({
    userId,
    title,
    description,
    ingredients,
    steps,
    attachment,
  });
  await recipe.save();
  res.status(200).json({ message: "Recipie Uploaded Successfully" });
};

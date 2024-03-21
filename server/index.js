import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import { UserRouter } from "./routes/user.js";
import { ProfileImageUpload } from "./controller/profilePicture.js";
import { PostUpload } from "./controller/posts.js";
import { RecipeRouter } from "./routes/post.js";

//Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

//Route with file
app.post("/uploads/profile-image", upload.single("image"), ProfileImageUpload);
app.post("/recipe/post", upload.single("attachment"), PostUpload);
//Routes without files
app.use("/auth", UserRouter);
app.use("/recipe", RecipeRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to database"));

app.listen(port, () => {
  console.log(`Server Started at port: ${port}`);
});

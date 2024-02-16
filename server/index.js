import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import { UserRouter } from "./route/user.js";
import { ProfileImageUpload } from "./controller/profilePicture.js";

//Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename;
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cd(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

//Route with file
app.use("/uploads/profile-image", upload.single("image"), ProfileImageUpload);
//Routes without files
app.use("/auth", UserRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to database"));

app.listen(port, () => {
  console.log(`Server Started at port: ${port}`);
});

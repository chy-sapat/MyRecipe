import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import { UserRouter } from "./route/user.js";
import { register } from "./controller/register.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI);
//Route with file
app.use("/auth/register", register);
//Routes withour files
app.use("/auth", UserRouter);

app.listen(port, () => {
  console.log(`Server Started at port: ${port}`);
});

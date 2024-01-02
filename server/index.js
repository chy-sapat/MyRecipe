import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI);

app.listen(port, () => {
  console.log(`Server Started at port: ${port}`);
});

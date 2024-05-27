import express from "express";
import { FetchAllRecipes, FetchAllUsers } from "../controller/admin.js";

const router = express.Router();

router.get("/fetch-all-users", FetchAllUsers);
router.get("/recipes", FetchAllRecipes);

export { router as AdminRouter };

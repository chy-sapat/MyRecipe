import express from "express";

import { Login, Register, VerifyEmail } from "../controller/auth.js";

import {
  ChangeUserPassword,
  DeleteUser,
  FetchUserData,
  UpdateUserData,
} from "../controller/user.js";

const router = express.Router();

router.get("/verify-email", VerifyEmail);
router.post("/register", Register);
router.post("/login", Login);
router.get("/fetch-user-data/:userId", FetchUserData);
router.patch("/password/:userId", ChangeUserPassword);
router.patch("/user-info/:id", UpdateUserData);
router.delete("/user/:userId", DeleteUser);

export { router as UserRouter };

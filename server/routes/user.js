import express from "express";

import { Login, Register, VerifyEmail } from "../controller/auth.js";

import { FetchUserData } from "../controller/user.js";

const router = express.Router();

router.get("/verify-email", VerifyEmail);
router.post("/register", Register);
router.post("/login", Login);
router.get("/fetch-user-data/:userId", FetchUserData);

export { router as UserRouter };

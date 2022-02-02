import express from "express";
import { registerUser } from "../controllers/userControllers";

const router = express.Router();

router.get("/register", registerUser);

export default router;

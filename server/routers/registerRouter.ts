import express from "express";
import { registerUser } from "../controllers/userControllers";

const router = express.Router();

router.post("/user", registerUser);

export default router;

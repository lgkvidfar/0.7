import express from "express";
import { registerUser } from "../controllers/userControllers";

const router = express.Router();

router.post("/", registerUser);

export default router;

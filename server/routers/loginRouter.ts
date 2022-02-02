import express from "express";
import { loginUser } from "server/controllers/userControllers";

const router = express.Router();

router.post("/user", loginUser);

export default router;

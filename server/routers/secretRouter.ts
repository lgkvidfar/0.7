import { Cookies } from "@interfaces";
import express from "express";
import { revealSecret } from "server/controllers/secretController";

const router = express.Router();

router.get("/", (req, res) => {
    const access = req.cookies[Cookies.AccessToken];

    if (access) {
        return res.json({ message: "my secret" });
    } else {
        return res.status(401).json({ message: "not authorized" });
    }
});

export default router;

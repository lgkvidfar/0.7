import { Cookies } from "@interfaces";
import express, { NextFunction, Request, Response } from "express";
import { verifyRefreshToken } from "server/auth/token-utils";
import UserModel from "server/models/UserModel";

const router = express.Router();

export const verifyStoredUser = async (req: Request, res: Response, next: NextFunction) => {
    const refresh = req.cookies[Cookies.RefreshToken];

    const verified = verifyRefreshToken(refresh);

    const worthy = await UserModel.find({ id: verified?.userId });

    if (worthy) {
        return res.status(200).json({
            message: "you have been authorized",
        });
    } else {
        return res.status(401).json({ message: "unauthorized in verifyStoredUser" });
    }
    next();
};

export default router;

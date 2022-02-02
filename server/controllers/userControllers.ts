import { IBasicUser } from "@interfaces";
import { Request, Response } from "express";
import { buildTokens, setTokens } from "server/auth/token-utils";
import UserModel from "server/models/UserModel";
import { createUser } from "server/services/user-service";

export const registerUser = async (req: Request, res: Response) => {
    const body = req.body;
    console.log("body", body);

    const user = await createUser({ ...body });
    if (!user) return res.status(400).send("unauth");
    const { accessToken, refreshToken } = buildTokens(user);
    if (accessToken) setTokens(res, accessToken, refreshToken);

    res.redirect(`${process.env.CLIENT_URL}/me`);
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log("body", { username, password });

    const users: IBasicUser[] = await UserModel.find({ username, password });
    console.log(users);

    if (users.length > 1) {
        console.log("too many users found");
        return res.status(446).json({
            message: "too many users",
        });
    } else if (users.length === 0) {
        return res.status(400).send("unauth");
    } else {
        const user = users[0];
        const { accessToken, refreshToken } = buildTokens(user);
        if (accessToken) setTokens(res, accessToken, refreshToken);

        res.redirect(`${process.env.CLIENT_URL}/me`);
    }
};

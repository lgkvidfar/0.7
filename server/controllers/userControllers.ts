import { Cookies, IBasicUser } from "@interfaces";
import { NextFunction, Request, Response } from "express";
import { endianness } from "os";
import { nextTick } from "process";
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

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log("body", { username, password });

    const users: IBasicUser[] = await UserModel.find({ username, password });
    console.log(users);

    if (users.length > 1) {
        console.log("too many users found");
        return res.status(446).json({
            message: "too many users found",
        });
    } else if (users.length === 0) {
        console.log("no users found");
        return res.status(400).send("unauth, no users found");
    } else {
        const user = users[0];
        console.log("successfully found this user:", user);

        const { accessToken, refreshToken } = buildTokens(user);
        console.log("succesfully built these tokens:", { accessToken, refreshToken });

        if (accessToken) {
            setTokens(res, accessToken, refreshToken);
            console.log("this is req.cookies", req.cookies[Cookies.AccessToken]);
        }
        return res.status(200).json({ message: "succesful login" });
    }
};

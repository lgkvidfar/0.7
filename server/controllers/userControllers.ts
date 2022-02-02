import { Request, Response } from "express";
import { buildTokens, setTokens } from "server/auth/token-utils";
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

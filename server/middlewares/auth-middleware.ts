import { NextFunction, Response, Request } from "express";
import { Cookies } from "@interfaces";

import { verifyAccessToken } from "../auth/token-utils";

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    console.log("in authmiddleware");
    console.log("accesstoken in authmw", req.cookies[Cookies.AccessToken]);

    const verifiedAccessToken = verifyAccessToken(req.cookies[Cookies.AccessToken]);

    if (!verifiedAccessToken) {
        res.status(401);
        return next(new Error("not signed in"));
    }
    res.locals.token = verifiedAccessToken;
    next();
};

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    console.log("second: aut admin");
    console.log("auth admin", req.cookies[Cookies.RefreshToken]);

    next();
};

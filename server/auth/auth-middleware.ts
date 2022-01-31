import { NextFunction, Response, Request } from 'express';
import { Cookies } from '@interfaces';

import { verifyAccessToken } from './token-utils';

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = verifyAccessToken(req.cookies[Cookies.AccessToken]);

    if (!accessToken) {
        res.status(401);
        return next(new Error('not signed in'));
    }
    res.locals.token = accessToken;
    next();
};

import { NextFunction, Response, Request } from 'express';
import { Cookies } from '@interfaces';

import { verifyAccessToken } from './token-utils';

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    console.log('first: authmiddleware');

    const accessToken = verifyAccessToken(req.cookies[Cookies.AccessToken]);

    if (!accessToken) {
        res.status(401);
        return next(new Error('not signed in'));
    }
    res.locals.token = accessToken;
    next();
};

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    console.log('second: aut admin');
    console.log('auth admin', req.cookies[Cookies.RefreshToken]);

    next();
};

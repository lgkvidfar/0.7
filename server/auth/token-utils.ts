import jwt from 'jsonwebtoken';

import {
    IBasicUser,
    IAccessTokenPayload,
    IRefreshTokenPayload,
    Cookies,
    IRefreshToken,
    IAccessToken,
} from '@interfaces';
import { cookie, tokens } from 'server/config';
import { CookieOptions, Response } from 'express';

const accessTokenSecret = tokens.secret.access;
const refreshTokenSecret = tokens.secret.refresh;

const signAccessToken = (payload: IAccessTokenPayload) => {
    const signedAccessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: tokens.expiration.access,
    });

    return signedAccessToken;
};

const signRefreshToken = (payload: IRefreshTokenPayload) => {
    const signedRefreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: tokens.expiration.refresh,
    });

    return signedRefreshToken;
};

export const buildTokens = (user: IBasicUser) => {
    const accessPayload: IAccessTokenPayload = { userId: user.id };
    const refreshPayload: IRefreshTokenPayload = { userId: user.id, version: user.tokenVersion };

    const accessToken = signAccessToken(accessPayload);
    const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

    return { accessToken, refreshToken };
};

const isProduction = process.env.NODE_ENV === 'production';

const defaultCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    domain: cookie.base_domain,
    path: '/',
};

const accessTokenCookieOptions: CookieOptions = {
    ...defaultCookieOptions,
    maxAge: tokens.expiration.access * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
    ...defaultCookieOptions,
    maxAge: tokens.expiration.refresh * 1000,
};

export const setTokens = (res: Response, access: string, refresh?: string) => {
    res.cookie(Cookies.AccessToken, access, accessTokenCookieOptions);
    if (refresh) {
        res.cookie(Cookies.RefreshToken, refresh, refreshTokenCookieOptions);
    }
};

export const verifyAccessToken = (token: string) => {
    console.log('made it here');

    const verifiedAccess = jwt.verify(token, accessTokenSecret);

    console.log('this is verified normal', verifiedAccess);
    console.log('this is verified as IAscessToken', verifiedAccess as IAccessToken);

    return verifiedAccess as IRefreshToken;
};

export const verifyRefreshToken = (token: string) => {
    const verifiedRefresh = jwt.verify(token, refreshTokenSecret);
    console.log('this is verifiedRefresh normal', verifiedRefresh);
    console.log('this is verifiedRefresh as RefreshToken', verifiedRefresh as IRefreshToken);

    return verifiedRefresh as IRefreshToken;
};

export const refreshTokens = (current: IRefreshToken, tokenVersion: number) => {
    if (tokenVersion !== current.version) {
        console.log('token revoked, version did not match');
        throw 'token revoked, version did not match';
    }
    const accessPayload: IAccessTokenPayload = { userId: current.userId };
    const refreshedAccessToken = signAccessToken(accessPayload);

    let refreshPayload: IRefreshTokenPayload | undefined;
    const expiration = new Date(current.exp * 1000);
    const now = new Date();
    const expirationLessNow = expiration.getTime() - now.getTime();
    const secondsUntilExpiration = expirationLessNow / 1000;
    if (secondsUntilExpiration < tokens.expiration.refreshIfLessThan) {
        refreshPayload = { userId: current.userId, version: tokenVersion };
    }
    const refreshedRefreshToken = refreshPayload && signRefreshToken(refreshPayload);

    return { refreshedAccessToken, refreshedRefreshToken };
};

export const clearTokens = (res: Response) => {
    res.cookie(Cookies.AccessToken, '', { ...defaultCookieOptions, maxAge: 0 });
    res.cookie(Cookies.RefreshToken, '', { ...defaultCookieOptions, maxAge: 0 });
};

export interface IBasicUser {
    name: string;
    tokenVersion: number;
    alive: Boolean;

    email: string | null;

    username: string;
    password: string | null;

    id: string;
    sellerID: string | null;
    adminID: string | null;

    gitHubId: string | null;
    gitHubLogin: string | null;

    cart: ICart | null;
}

export interface ICart {
    id: string;
    alive: Boolean;
    cart: IProductsInCart[];
    total: number;
}

export interface IProductsInCart {
    amount: number;
    product: IProduct;
}

export interface IProduct {
    name: string;
    amount: number;
    productId: string;
    categories: ICategory[];
}

export interface ICategory {
    category: string;
}
export interface IAccessTokenPayload {
    userId: string;
}

export interface IAccessToken extends IAccessTokenPayload {
    exp: number;
}

export interface IRefreshTokenPayload {
    userId: string;
    version: number;
}
export interface IRefreshToken extends IRefreshTokenPayload {
    exp: number;
}

export enum Cookies {
    AccessToken = "access",
    RefreshToken = "refresh",
}

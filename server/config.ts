import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT!;

export const server = {
    port: SERVER_PORT!,
};

export const github = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
};

export const mongo = {
    full_url: process.env.MONGODB_FULL_URL!,
    url: process.env.MONGODB_URL!,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
};

export const tokens = {
    secret: {
        access: process.env.ACCESS_TOKEN_SECRET!,
        refresh: process.env.REFRESH_TOKEN_SECRET!,
    },
    expiration: {
        access: 5 * 60,
        refresh: 7 * 24 * 60 * 60,
        refreshIfLessThan: 4 * 24 * 60 * 60,
    },
};

export const cookie = {
    base_domain: process.env.BASE_DOMAIN!,
};

import axios from 'axios';
import { github } from 'server/config';

interface IGitHubUser {
    login: string;
    id: number;
    profile_url: string;
    name: string | null;
    company: string | null;
    email: string | null;
    twitter_username: string | null;
}

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    login: string;
    id: number;
    profile_url: string;
    name: string | null;
    company: string | null;
    email: string | null;
    twitter_username: string | null;
}

const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const USER_URL = 'https://api.github.com/user';

export const getGitHubUser = async (code: string) => {
    const token = await getAccessToken(code);
    const user = getUser(token);
    return user;
};

const getAccessToken = async (code: string) => {
    const response = await axios.post<IAccessTokenResponse>(
        TOKEN_URL,
        {
            client_id: github.client_id,
            client_secret: github.client_secret,
            code,
        },
        {
            headers: { Accept: 'application/json' },
        }
    );
    const access_token = response.data.access_token;
    return access_token;
};

const getUser = async (token: string) => {
    const response = await axios.get<IUserResponse>(USER_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const user: IGitHubUser = response.data;
    return user;
};

import axios from "axios";
import { server } from "../config";
import { IBasicUser, ILoginCredentials } from "../interfaces";
const baseUrl = server.baseUrl;

export const registerUser = async (user: IBasicUser) => {
    console.log("this will be sent to backend, user:", user);

    const response = await axios
        .post(`${baseUrl}/register/user`, user)
        .then(res => {
            console.log("this is the response", res);

            return res.data;
        })
        .catch(error => {
            console.log(error);
        });
    return response;
};

export const loginUser = async (loginCreds: ILoginCredentials) => {
    try {
        console.log("this will be sent to backend, loginCreds:", loginCreds);

        const response = await axios.post(`/login/user`, loginCreds);
        return response;
    } catch (e) {
        console.log("this is the catch", e);
    }
};

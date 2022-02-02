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
    console.log("this will be sent to backend, loginCreds:", loginCreds);

    const response = await axios
        .post(`${baseUrl}/login/user`, loginCreds)
        .then(res => {
            console.log("this is the response", res);

            return res;
        })
        .catch(error => {
            console.log("this is the catch", error);
            return error.status(400).JSON({
                message: "didnt go well",
            });
        });
    return response;
};

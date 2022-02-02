import axios from "axios";
import { server } from "../config";
import { IBasicUser } from "../interfaces";
const baseUrl = server.baseUrl;

export const registerUser = async (user: IBasicUser) => {
    console.log(user);

    const response = await axios
        .post(`${baseUrl}/register`, user)
        .then(response => {
            console.log("this is the response", response);

            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return response;
};

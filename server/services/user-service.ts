import { v4 as uuid } from "uuid";
import { IBasicUser } from "@interfaces";
import UserModel from "server/models/UserModel";

interface ICreateUser {
    name: string | null;
    tokenVersion: number | null;
    alive: Boolean | null;

    email: string | null;

    username: string | null;
    password: string | null;

    id: string | null;
    sellerID: string | null;
    adminID: string | null;

    gitHubId: number | null;
    gitHubLogin: string | null;

    cart: Object | null;
}

export const createUser = async (props: ICreateUser) => {
    console.log("creating user from props:", props);

    const user: IBasicUser = {
        name: props.name || "j.d",
        tokenVersion: 0,
        alive: true,
        email: props.email || null,
        username: props.username || "anon",
        password: props.password || null,

        id: uuid(),
        sellerID: props.sellerID || null,
        adminID: props.adminID || null,

        gitHubId: props.gitHubId?.toString() || null,
        gitHubLogin: props.gitHubLogin || null,

        cart: {
            id: uuid(),
            cart: [],
            total: 0,
            alive: false,
        },
    };

    console.log("created user: ", user, "done");

    const savedUser = new UserModel(user);
    await savedUser.save();
    console.log("savedUser: ", savedUser);

    return savedUser;
};

export const getUserByGitHubId = async (gitHubId: number) => {
    const id = gitHubId.toString();
    const result = UserModel.findOne({ gitHubId: id });
    return result;
};

export const getUserById = async (id: string) => {
    try {
        const user = UserModel.findOne({ id });
        return user;
    } catch (e) {
        throw new Error("no user found");
    }
};

export const increaseTokenVersion = async (id: string) => {
    const result = await UserModel.findByIdAndUpdate({ id }, { $inc: { tokenVersion: 1 } });
    console.log("this is the result of tokenversion update", result);
    return result;
};

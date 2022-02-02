import { Cookies } from "@interfaces";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Response } from "express";
import { authAdmin, authMiddleWare } from "./middlewares/auth-middleware";
import { getGitHubUser } from "./auth/github-auth";
import {
    buildTokens,
    clearTokens,
    refreshTokens,
    setTokens,
    verifyRefreshToken,
} from "./auth/token-utils";
import { server } from "./config";
import connectToMongoDB from "./database/connect";
import {
    createUser,
    getUserByGitHubId,
    getUserById,
    increaseTokenVersion,
} from "./services/user-service";
import registerRouter from "./routers/registerRouter";
import loginRouter from "./routers/loginRouter";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("/github", async (req, res) => {
    console.log("im in github");

    const { code } = req.query;

    const gitHubUser = await getGitHubUser(code as string);
    if (!gitHubUser) return res.status(400).send("unauth");
    let user = await getUserByGitHubId(gitHubUser.id);
    if (!user) {
        console.log("creating user from github user:", gitHubUser);

        user = await createUser({
            name: gitHubUser.name,
            gitHubLogin: gitHubUser.login,
            gitHubId: gitHubUser.id,
            tokenVersion: null,
            alive: null,
            email: gitHubUser.email,
            username: gitHubUser.login,
            password: null,
            id: null,
            sellerID: null,
            adminID: null,
            cart: null,
        });
    } else {
        console.log("this time a user was found!", user);
    }

    const { accessToken, refreshToken } = buildTokens(user);
    if (!accessToken) throw "no access";
    setTokens(res, accessToken, refreshToken);

    res.redirect(`${process.env.CLIENT_URL}/me`);
});

app.use("/refresh", async (req, res) => {
    try {
        const current = verifyRefreshToken(req.cookies[Cookies.RefreshToken]);
        if (!current) throw "current refresh token not found";
        console.log("this is current in server/index @ post(refresh): ", current);
        const user = await getUserById(current.userId);
        if (!user) throw "user not found";
        console.log("this is user in server/index @ post(refresh): ", user);
        const { refreshedAccessToken, refreshedRefreshToken } = refreshTokens(
            current,
            user.tokenVersion
        );
        if (refreshedAccessToken) {
            setTokens(res, refreshedAccessToken, refreshedRefreshToken);
        }
    } catch (e) {
        console.log("error in server/index @ post(refresh)", e);
        clearTokens(res);
    }
});

app.use("/logout", (req, res) => {
    clearTokens(res);
});

app.use("/logout-all", async (req, res: Response) => {
    await increaseTokenVersion(res.locals.token.userId);
    clearTokens(res);
});

// app.get("/me", async (req, res) => {
//     console.log("this is res.locals", res.locals);
//     if (res.locals.token) {
//         // const user = await getUserById(res.locals.token.userId);

//         console.log("this is res.locals again", res.locals);
//         // console.log("this is the currently authenticated user", user);

//         // res.json(user);
//     } else {
//         return res.status(400).send("unauth");
//     }
// });

// app.use("/", (req, res, next) => {
//     console.log("api is healthy, you've reached home");

//     res.json({ message: "api is healthy,  you've reached home" });
// });

app.use("/:anythingelse", (req, res, next) => {
    console.log("404: no page here");

    res.json({ message: "no page here" });
});

connectToMongoDB()
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));

export default app;

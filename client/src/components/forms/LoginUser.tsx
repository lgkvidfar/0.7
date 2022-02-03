import React, { useState } from "react";
import { loginUser } from "../../services/userServices";

const LoginUser = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(`sending payload to backend:
            username: ${username}
            password: ${password}
            `);
            const response = await loginUser({
                username: username,
                password: password,
            });
            console.log(response && response.data.message);
            setUsername("");
            setPassword("");
            //navigate heree to profile
        } catch (err) {
            console.log("something went wrong with logging in", err);
        }
    };

    return (
        <div>
            <h2>login form for users</h2>
            <form onSubmit={handleLogin}>
                <input
                    placeholder="username"
                    name="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required={true}
                />
                <br />
                <input
                    placeholder="password"
                    name="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required={true}
                />
                <br />
                <button type="submit">log in</button>
            </form>
        </div>
    );
};

export default LoginUser;

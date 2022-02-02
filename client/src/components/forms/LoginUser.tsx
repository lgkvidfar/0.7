import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userServices";

const LoginUser = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleLogin = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(`sending payload to backend:
            username: ${username}
            password: ${password}
            `);
            loginUser({
                username: username,
                password: password,
            })
                .then(response => {
                    console.log(`response from backend:`, response);
                    navigate("/errrrrrroror");
                })
                .catch(err => {
                    console.log("something went wrong with registering", err);
                });
            setUsername("");
            setPassword("");
        } catch (err) {
            console.log(err);
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { registerUser } from "../../services/userServices";

const RegisterForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    const handleRegister = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(`sending payload to backend:
            username: ${username}
            password: ${password}
            `);
            registerUser({
                name: name,
                gitHubLogin: null,
                gitHubId: null,
                tokenVersion: 0,
                alive: null,
                email: email,
                username: username,
                password: password,
                id: uuid(),
                sellerID: null,
                adminID: null,
                cart: null,
            })
                .then((response: { message: any }) => {
                    console.log(`response from backend:`, response);
                    navigate("/login/user");
                })
                .catch(err => {
                    console.log("something went wrong with registering", err);
                });
            setUsername("");
            setPassword("");
            setEmail("");
            setName("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>register form for users</h2>
            <form onSubmit={handleRegister}>
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
                <input
                    placeholder="name"
                    name="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required={true}
                />
                <br />
                <input
                    placeholder="email"
                    name="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required={true}
                />
                <br />
                <button type="submit">register</button>
            </form>
        </div>
    );
};

export default RegisterForm;

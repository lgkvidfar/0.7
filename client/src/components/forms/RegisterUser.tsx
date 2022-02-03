import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { registerUser } from "../../services/userServices";
import { uniqueNamesGenerator, adjectives, colors, animals, Config } from "unique-names-generator";

const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    length: 3,
};

const RegisterForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    const handleRegister = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(`sending payload to backend:
            username: ${username}
            password: ${password}
            `);
            const response = await registerUser({
                name: name || "anon",
                gitHubLogin: null,
                gitHubId: null,
                tokenVersion: 0,
                alive: null,
                email: email,
                username: username || uniqueNamesGenerator(customConfig),
                password: password,
                id: uuid(),
                sellerID: null,
                adminID: null,
                cart: null,
            });

            console.log(`response from backend:`, response);

            if (response && response.status === 200) navigate("/login/user");
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

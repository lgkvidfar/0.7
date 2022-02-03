import axios from "axios";
import React, { useState } from "react";

const Secret = () => {
    const [serverSecret, setServerSecret] = useState("");
    const showSecret = async () => {
        const secret = await axios.get("/secret");
        setServerSecret(secret.data.message);
    };
    return (
        <div>
            {serverSecret && <h1>this is a secret for users</h1>}
            <button onClick={showSecret}>show secret</button> <br />
            {serverSecret}
        </div>
    );
};

export default Secret;

import axios from "axios";
import React from "react";

import { server } from "./config";

const App = () => {
    const handleLogin = () => {
        console.log("sending here");

        axios.get(`${server.baseUrl}/register`).then(response => {
            console.log(response);
        });
    };
    return (
        <div className="App">
            <button onClick={handleLogin}>log in</button>
        </div>
    );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterUser";

const App = () => {
    return (
        <div>
            <h3>this is app</h3>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </div>
    );
};

export default App;

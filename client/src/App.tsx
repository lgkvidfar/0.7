import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterUser";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    return (
        <div>
            <h3>this is app</h3>

            <Link to="/register">register</Link>

            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="register/user" element={<RegisterForm />} />
            </Routes>
        </div>
    );
};

export default App;

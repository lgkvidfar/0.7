import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterUser";
import RegisterPage from "./pages/RegisterPage";
import LoginForm from "./components/forms/LoginUser";
import LoginPage from "./pages/LoginPage";
import Secret from "./pages/Secret";

const App = () => {
    return (
        <div>
            <h3>this is app</h3>
            <Link to="/register">register</Link> {` | `}
            <Link to="/login">login</Link> {` | `}
            <Link to="/secret">secret</Link>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register/user" element={<RegisterForm />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/user" element={<LoginForm />} />
                <Route path="/Secret" element={<Secret />} />
            </Routes>
        </div>
    );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <div>
            <Link to="/register/user">new user</Link> {` | `}
            <Link to="/register/seller">new seller</Link> {` | `}
            <Link to="/register/admin">new admin</Link> {` | `}
        </div>
    );
};

export default RegisterPage;

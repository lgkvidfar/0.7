import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <Link to="/login/user">login user</Link> {` | `}
            <Link to="/login/seller">login seller</Link> {` | `}
            <Link to="/login/admin">login admin</Link> {` | `}
        </div>
    );
};

export default LoginPage;

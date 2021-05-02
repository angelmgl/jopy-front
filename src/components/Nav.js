import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Nav = () => {
    const { user } = useContext(UserContext);

    return (
        <nav>
            <div className="container nav">
                <Link to="/">
                    <img className="logo" src="/jopy.png" alt="logo" />
                </Link>
                {
                    user 
                    ? "logged"
                    : ""
                }
            </div>
        </nav>
    );
};

export default Nav;

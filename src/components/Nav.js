import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/userContext";

const Nav = () => {
    const { user, setUser, setToken } = useContext(UserContext);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    }

    return (
        <nav>
            <div className="container nav">
                <Link to="/">
                    <img className="logo" src="/jopy.png" alt="logo" />
                </Link>
                
                {
                    user 
                    ? <FaSignOutAlt className="logout" onClick={logout} />
                    : ""
                }
            </div>
        </nav>
    );
};

export default Nav;

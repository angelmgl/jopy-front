import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import logo from "../img/jopy.png";

const Nav = () => {
    const { user, setUser, setToken } = useContext(UserContext);
    const [ nav, setNav ] = useState(false);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>

                {user ? (
                    <nav>
                        <div className="nav-btn" onClick={() => setNav(!nav)}>
                            {nav ? (
                                <FaTimes className="nav-icon" />
                            ) : (
                                <FaBars className="nav-icon" />
                            )}
                        </div>
                        <ul className={`nav-links ${nav ? "active" : ""}`}>
                            <li
                                className={`${nav ? "open" : ""}`}
                                onClick={() => setNav(!nav)}
                            >
                                <Link to="/spends">Spends</Link>
                            </li>
                            <li
                                className={`${nav ? "open" : ""}`}
                                onClick={() => setNav(!nav)}
                            >
                                <Link to="/income">
                                    Incomes
                                </Link>
                            </li>
                            <li
                                className={`${nav ? "open" : ""}`}
                                onClick={() => setNav(!nav)}
                            >
                                <Link to="/all">History</Link>
                            </li>
                            <li className={`${nav ? "open" : ""}`}>
                                <FaSignOutAlt  className="logout" onClick={logout} />
                            </li>
                        </ul>
                    </nav>
                ) : (
                    ""
                )}
            </div>
        </header>
    );
};

export default Nav;

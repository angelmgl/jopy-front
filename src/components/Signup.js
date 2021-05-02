import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import "../css/styles.css";

const Signup = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [match, setMatch] = useState(true);

    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const postData = async () => {};

    if (user) return <Redirect to="/" />;
    return (
        <section className="container grid">
            <div className="svg">
                <h2>Sign Up for free!</h2>
                <img src="/img/signup.svg" alt="Signup" />
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register form</h2>
                <div className="field">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        placeholder="John Doe..."
                        minLength="5"
                        required
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="johndoe3..."
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        minLength="5"
                        placeholder="Write your password..."
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="confirm">Confirm password</label>
                    <input
                        type="text"
                        id="confirm"
                        placeholder="Write it again..."
                        onInput={(e) => setMatch(e.target.value === password)}
                        required
                    />
                </div>

                {match ? "" : <p className="error">Passwords does'nt match!</p>}

                {match ? (
                    <button type="submit" className="btn btn-primary">
                        Sign up!
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary" disabled>
                        Sign up!
                    </button>
                )}
                <p>If you already have an account you can <Link to="/login">login here.</Link></p>
            </form>
        </section>
    );
};

export default Signup;

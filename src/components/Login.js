import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { user, token, setUser, setToken } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }

    const login = async () => {
        try {
            const res = await axios.post("/auth/login", {username, password});
            setUser(res.data.fullname);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    if (user) return <Redirect to="/" />;
    return (
        <section className="container grid">
            <div className="svg">
                <h2>Login into your account!</h2>
                <img src="/img/login.svg" alt="Login" />
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login Form</h2>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="johndoe3..."
                        autoFocus
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
                {
                    message 
                    ? <p className="error">{message}</p>
                    : ""
                }
                <button type="submit" className="btn btn-primary">
                    Login!
                </button>
                <p>If you don't have an account yet you can <Link to="/signup">sign up here.</Link></p>
            </form>
        </section>
    );
};

export default Login;

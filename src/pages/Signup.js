import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import img from "../img/signup.svg";

const Signup = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [match, setMatch] = useState(true);
    const [message, setMessage] = useState("");

    const { user, setUser, setToken } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    const postData = async () => {
        try {
            const res = await axios.post("/auth/signup", {fullname, username, password});
            setUser(res.data.fullname);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            axios.defaults.headers.common["x-access-token"] = res.data.token;
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    if (user) return <Redirect to="/" />;
    return (
        <section className="container grid">
            <div className="svg">
                <h2>Sign Up for free!</h2>
                <img src={img} alt="Signup" />
            </div>
            <form onSubmit={handleSubmit} className="form">
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
                {message ? <p className="error">{message}</p> : ""}

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

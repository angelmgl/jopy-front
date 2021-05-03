import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "./css/styles.css";

const token = localStorage.getItem("token") || null;
axios.defaults.baseURL = "https://jopy.herokuapp.com/apin";
if(token) axios.defaults.headers.common["x-access-token"] = token;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

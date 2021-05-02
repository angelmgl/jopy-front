import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "./css/styles.css";

localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjE5OTExNjQ0LCJleHAiOjE2MjA1MTY0NDR9.XzyoATO4LD8E2i9jqKCNWf2JA6J2b3OrBytZDRr3HCo");
const token = localStorage.getItem("token") || null;
axios.defaults.baseURL = "http://localhost:5000/api";
if(token) axios.defaults.headers.common["x-access-token"] = token;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { UserProvider } from "./context/userContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Nav />
                <Home />
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

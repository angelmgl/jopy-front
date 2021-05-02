import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { UserProvider } from "./context/userContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

import React from "react";
import Home from "./components/Home";
import { UserProvider } from "./context/userContext";

function App() {
    return (
        <UserProvider>
            <Home />
        </UserProvider>
    );
}

export default App;

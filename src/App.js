import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./context/userContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

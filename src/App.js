import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserProvider } from "./context/userContext";
import Transaction from "./pages/Transaction";
import Income from "./pages/Income";
import History from "./pages/History";
import Spends from "./pages/Spends";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/transaction/:id" component={Transaction} />
                    <Route exact path="/income" component={Income}/>
                    <Route exact path="/spends" component={Spends}/>
                    <Route exact path="/all" component={History}/>
                </Switch>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

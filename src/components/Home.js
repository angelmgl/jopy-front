import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const Home = () => {
    const { user } = useContext(UserContext);

    return(
        <h1>hola {user}</h1>
    )
}

export default Home;
import React, { useContext } from "react";
import { Link} from "react-router-dom";
import { UserContext } from "../context/userContext";
import "../css/styles.css";

const Home = () => {
    const { user } = useContext(UserContext);

    if(!user) return(
        <main className="container grid">
            <div className="svg">
                <h2>Manage your budget in an easier way!</h2>
                <img src="/img/savings.svg" alt="Savings" />
            </div>
            <div className="buttons">
                <p>Login if you already have an account! If not, you can signup for free.</p>
                <Link className="btn btn-primary" to="/login">
                    Login
                </Link>
                <Link className="btn btn-secondary" to="/signup">
                    Signup
                </Link>
            </div>
        </main>
    );

    return(
        <h1>welcome {user}</h1>
    )
}

export default Home;
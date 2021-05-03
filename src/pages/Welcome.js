import { Link } from "react-router-dom";
import img from "../img/savings.svg";

const Welcome = () => (
    <>
        <div className="svg">
            <h2>Manage your budget in an easier way!</h2>
            <img src={img} alt="Savings" />
        </div>
        <div className="buttons">
            <p>
                Login if you already have an account! If not, you can signup for
                free.
            </p>
            <Link className="btn btn-primary" to="/login">
                Login
            </Link>
            <Link className="btn btn-secondary" to="/signup">
                Signup
            </Link>
        </div>
    </>
);

export default Welcome;
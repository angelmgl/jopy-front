import { Redirect, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Loader from "../components/Loader";

const Transaction = () => {
    const { id } = useParams();

    const [ammount, setAmmount] = useState(0);
    const [type, setType] = useState("income");
    const [income_category, setIncome_category] = useState("");
    const [spends_category, setSpends_category] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`/transactions/${id}`);
                setAmmount(res.data[0].ammount);
                setType(res.data[0].type);
                setSpends_category(res.data[0].spends_category);
                setIncome_category(res.data[0].income_category);
                setCreated_at(res.data[0].created_at.slice(0, 16));
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
                setIsLoading(false);
            }
        }

        fetchTransactions()
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ammount: parseFloat(ammount),
            type,
            income_category: type === "income" ? income_category : null,
            spends_category: type === "spends" ? spends_category : null,
            created_at,
        };

        editTransaction(data);
    };

    const deleteTransaction = async () => {
        try {
            const res = await axios.delete(`/transactions/${id}`);
            setMessage(res.data.message);
            setTimeout(() => setShouldRedirect(true), 1500);
        } catch (error) {
            console.log(error.response);
        }
    }

    const editTransaction = async (data) => {
        try {
            const res = await axios.put(`/transactions/${id}`, data);
            setMessage(res.data.message);
            setTimeout(() => setShouldRedirect(true), 1500);
        } catch (error) {
            console.log(error.response);
        }
    }

    if(shouldRedirect) return <Redirect to="/" />
    if(isLoading) return <Loader />
    return (
        <main className="container">
            <h1>Edit your transaction:</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="field">
                    <label htmlFor="ammount">Ammount:</label>
                    <input
                        id="ammount"
                        type="number"
                        value={ammount}
                        onChange={(e) => setAmmount(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="type">Type:</label>
                    <select
                        onChange={(e) => setType(e.target.value)}
                        value={type} disabled
                    >
                        <option value="income">Income</option>
                        <option value="spends">Spends</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="category">Category:</label>
                    {type === "spends" ? (
                        <select
                            onChange={(e) => setSpends_category(e.target.value)}
                            value={spends_category}
                        >
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="fun">Fun</option>
                            <option value="clothes">Clothes</option>
                            <option value="taxes">Taxes</option>
                            <option value="health">Health</option>
                            <option value="home">Home</option>
                            <option value="shopping">Shopping</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <select
                            onChange={(e) => setIncome_category(e.target.value)}
                            value={income_category}
                        >
                            <option value="job">Job</option>
                            <option value="extra">Extra</option>
                            <option value="gift">Gift</option>
                        </select>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="datetime-local"
                        value={created_at}
                        onChange={(e) => setCreated_at(e.target.value)}
                    />
                </div>
                {ammount > 0 ? (
                    <button type="submit" className="btn btn-primary">
                        Update!
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary" disabled>
                        Update!
                    </button>
                )}
                <button className="btn spends" onClick={deleteTransaction}>
                    <FaTrashAlt className="delete" />
                </button>
                {
                    message 
                    ? <p className="success">{message}</p>
                    : ""
                }
            </form>
        </main>
    );
};

export default Transaction;

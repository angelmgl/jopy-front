import React, { useState } from "react";
import axios from "axios";

const AddTransaction = () => {
    const date = new Date();
    const [ammount, setAmmount] = useState(0);
    const [type, setType] = useState("spends");
    const [income_category, setIncome_category] = useState(
        type === "spends" ? "" : "job"
    );
    const [spends_category, setSpends_category] = useState(
        type === "spends" ? "food" : ""
    );
    const [created_at, setCreated_at] = useState(formatDate(date));
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ammount: parseFloat(ammount),
            type,
            income_category: type === "income" ? income_category : null,
            spends_category: type === "spends" ? spends_category : null,
            created_at,
        };

        addTransaction(data);
    };

    const addTransaction = async (data) => {
        try {
            const res = await axios.post("/transactions", data);
            setMessage(res.data.message);
            setAmmount(0);
        } catch (error) {
            console.log(error.response);
        }
    };

    function formatDate(date) {
        return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
            date.getDate()
        )}T${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
            date.getSeconds()
        )}`;
    }

    function addZero(n) {
        if (n < 10) return `0${n}`;
        return n;
    }

    return (
        <section className="add-transaction">
            <h2>Add a new transaction</h2>
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
                        value={type}
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
                        Add!
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary" disabled>
                        Add!
                    </button>
                )}
                {
                    message 
                    ? <p className="success">{message}</p>
                    : ""
                }
            </form>
        </section>
    );
};

export default AddTransaction;

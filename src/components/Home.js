import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import "../css/styles.css";
import axios from "axios";
import Loader from "./Loader";
import Transaction from "./Transaction";
import Welcome from "./Welcome";

const Home = () => {
    const { user, loading } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("/transactions/latest");
                await setTransactions(res.data);
            } catch (error) {
                console.log(error.response);
            }
        };

        if (user) fetchTransactions();
    }, [user]);

    useEffect(() => {
        const getTotal = () => {
            let preTotal = 0;
            transactions.forEach((transaction) => {
                const { ammount, type } = transaction;
                if (type === "income") return (preTotal += ammount);
                preTotal -= ammount;
            });
            setTotal(preTotal);
        };

        if(transactions.length > 0) getTotal();
    }, [transactions]);

    if (loading) return <Loader />;
    if (!user)
        return (
            <main className="container grid">
                <Welcome />
            </main>
        );

    return (
        <main className="container">
            <section className="balance">
                <h2>
                    Your latest balance: <span>{total} $</span>
                </h2>
            </section>

            <h2>Your latest movements:</h2>
            {transactions.length > 0 ? (
                <section className="transaction-container">
                    {transactions.map((transaction) => {
                        return (
                            <Transaction
                                key={transaction.id}
                                id={transaction.id}
                                ammount={transaction.ammount}
                                type={transaction.type}
                                spends_category={transaction.spends_category}
                                income_category={transaction.income_category}
                                created_at={transaction.created_at}
                            />
                        );
                    })}
                </section>
            ) : (
                <p>You don't have any movement yet...</p>
            )}
        </main>
    );
};

export default Home;

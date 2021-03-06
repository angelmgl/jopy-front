import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { FaRedoAlt } from "react-icons/fa";
import Loader from "../components/Loader";
import Transaction from "../components/Transaction";
import Welcome from "./Welcome";
import AddTransaction from "../components/AddTransaction";

const Home = () => {
    const { user, loading } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [total, setTotal] = useState(0);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("/transactions/latest");
                await setTransactions(res.data);
                await setShouldUpdate(false);
                setLoadingTransactions(false);
            } catch (error) {
                console.log(error.response);
                setLoadingTransactions(false);
                setShouldUpdate(false);
            }
        };

        if (user || shouldUpdate) fetchTransactions();
    }, [user, shouldUpdate]);

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

        if (transactions.length > 0) getTotal();
    }, [transactions]);

    const reload = async () => {
        setLoadingTransactions(true);
        try {
            const res = await axios.get("/transactions/latest");
            await setTransactions(res.data);
            await setShouldUpdate(false);
            setLoadingTransactions(false);
        } catch (error) {
            console.log(error.response);
            setLoadingTransactions(false);
            setShouldUpdate(false);
        }
    }

    if (loading) return <Loader />;
    if (!user)
        return (
            <main className="container grid">
                <Welcome />
            </main>
        );

    return (
        <main className="container">
            <h1>Welcome {user}</h1>
            <section className="balance">
                <h2>
                    Your latest balance: <span>{total} $</span>
                </h2>
            </section>

            <div className="grid">
                <AddTransaction setShouldUpdate={setShouldUpdate} />
                <div>
                    <h2>Your latest movements:</h2>
                    <FaRedoAlt className="reload" onClick={reload} />
                    {loadingTransactions ? (
                        <Loader />
                    ) : (
                        <>
                            {transactions.length > 0 ? (
                                <section className="transaction-container">
                                    {transactions.map((transaction) => {
                                        return (
                                            <Transaction
                                                key={transaction.id}
                                                id={transaction.id}
                                                ammount={transaction.ammount}
                                                type={transaction.type}
                                                spends_category={
                                                    transaction.spends_category
                                                }
                                                income_category={
                                                    transaction.income_category
                                                }
                                                created_at={
                                                    transaction.created_at
                                                }
                                            />
                                        );
                                    })}
                                </section>
                            ) : (
                                <p>You don't have any movement yet...</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;

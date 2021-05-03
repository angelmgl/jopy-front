import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import Transaction from "../components/Transaction";
import { Redirect } from "react-router";

const Income = () => {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("/transactions/type/income");
                await setTransactions(res.data.reverse());
                setLoading(false);
            } catch (error) {
                console.log(error.response);
                setLoading(false);
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

        if (transactions.length > 0) getTotal();
    }, [transactions]);

    if (!user) return <Redirect to="/" />;
    return (
        <main className="container">
            <section className="balance">
                <h2>
                    Incomes total: <span>{total} $</span>
                </h2>
            </section>
            <h2>Your all times incomes:</h2>
            {loading ? (
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
                                        created_at={transaction.created_at}
                                    />
                                );
                            })}
                        </section>
                    ) : (
                        <p>You don't have any movement yet...</p>
                    )}
                </>
            )}
        </main>
    );
};

export default Income;

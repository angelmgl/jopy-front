import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/users");
                setUser(res.data.fullname);
                setLoading(false);
            } catch(error) {
                console.log(error.response);
                setLoading(false);
            }
        }

        if(token) {
            setLoading(true);
            fetchUser();
        }
    }, [token]);

    return(
        <UserContext.Provider value={{token, setToken, user, setUser, loading}}>
            { children }
        </UserContext.Provider>
    );
}
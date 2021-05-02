import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/users");
                setUser(res.data.fullname);
            } catch(error) {
                console.log(error.response);
            }
        }

        if(token) {
            fetchUser();
        }
    }, [])

    return(
        <UserContext.Provider value={{token, setToken, user, setUser}}>
            { children }
        </UserContext.Provider>
    );
}
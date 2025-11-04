import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const  [auth, setAuth] = useState({});

    useEffect(() => {
        const tryRefresh = async () => {
            const response = await fetch ("/refresh", {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            setAuth({accessToken: data.accessToken});
        };

        tryRefresh()
    }, []);

    return (
        <AuthContext.Provider value={ { auth, setAuth}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;
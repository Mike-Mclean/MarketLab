import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const  [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : {}
    });

    useEffect(() => {
    if (auth?.accessToken) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

    useEffect(() => {
        const tryRefresh = async () => {
            try{
                const response = await fetch ("/refresh", {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    setAuth({username: data.user, accessToken: data.accessToken});
                }
            } catch (err){
                console.error("Auto-refresh failed", err)
            }
        };

        tryRefresh()
    }, []);

    return (
        <AuthContext.Provider value={ { auth, setAuth}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;
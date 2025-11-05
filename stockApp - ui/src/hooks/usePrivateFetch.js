import useRefreshToken from "./useRefreshToken";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const usePrivateFetch = () => {
    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext);

    const privateFetch = async (url, options = {}) => {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${auth?.accessToken}`
            },
            credentials: "include"
        });

        if (response.status === 401) {
            const newToken = await refresh();
            if (!newToken) throw new Error("Session expired");
            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`
                },
                credentials:"include"
            });
        }

        return response;
    }

    return privateFetch;
};

export default usePrivateFetch;
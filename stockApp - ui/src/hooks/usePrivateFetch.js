import useRefreshToken from "./useRefreshToken";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const usePrivateFetch = () => {
    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext);

    const privateFetch = async (url, options = {}) => {
        const headers = {
            "Content-Type": "application/json",
            ...(options.header || {}),
            Authorization: `Bearer ${auth?.accessToken}`
        };

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: "include"
        });

        if (response.status === 401) {
            const newToken = await refresh();
            if (!newToken) throw new Error("Session expired");
            const retryHeaders = {
                ...headers,
                Authorization: `Bearer ${newToken}`
            }
            return fetch(url, {
                ...options,
                headers: retryHeaders,
                credentials:"include"
            });
        }

        return response;
    }

    return privateFetch;
};

export default usePrivateFetch;
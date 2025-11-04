import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        try{
            const response = await fetch('/refresh', {
                method: "GET",
                credentials: "include",
                headers: {"Content-Type": "application/json"}
            })
            const data = await response.json()

            if(!response.ok) throw new Error("failed to refresh token")

            setAuth(prev => ({
                ...prev, accessToken: data.accessToken
            }));
            return data.accessToken;
        } catch (err) {
            console.error("Token refresh failed:", err);
            setAuth({});
            return null;
        }
    };

    return refresh;
}

export default useRefreshToken;
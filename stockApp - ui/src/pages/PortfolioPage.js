import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PortfolioPage(){

    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const user = auth?.user;

    const privateFetch = usePrivateFetch();

    useEffect(() => {
        const fetchPortfolio = async () => {
            if (!auth?.accessToken || !user) return;

            try{
                const userData = await privateFetch(`/portfolio/user/${user}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`
                    },
                    credentials: "include"
                });
                if (!userData.ok){
                    console.error('Failed to fetch portfolio', userData.status);
                    return;
                }
                const portfolio = await userData.json();
                setUserPortfolio(portfolio);
            } catch (err) {
                console.error('Error fetching portfolio', err);
            }
        };

        fetchPortfolio();
    }, []);


    return(
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <h1 className='text-2xl font-bold tracking-wide'>
                    <a href='/'>MarketLab</a>
                </h1>
                <nav className="space-x-6">
                    <button
                        onClick={() => navigate(`/trade`)}
                    >
                        Trade
                    </button>
                    <button
                        onClick={() => navigate("/")}
                    >
                        Dashboard
                    </button>
                </nav>
                <h1 className='font-semibold'>Cash: {userPortfolio?.cash.toFixed(2) ?? "----"}</h1>
            </header>
        </div>
    );

}

export default PortfolioPage;
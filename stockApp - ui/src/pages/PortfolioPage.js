import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import usePrivateFetch from '../hooks/usePrivateFetch';

const FH_API_KEY = process.env.REACT_APP_FH_KEY;

function PortfolioPage(){
    const [userPortfolio, setUserPortfolio] = useState(null);
    const [stockPrices, setStockPrices] = useState([]);
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

    useEffect(() => {
        const fetchStockData = async () => {
            const stockData = [];
            const userStocks = userPortfolio?.stocks_owned
            for (let i = 0; i < userStocks?.length; i++) {
                let stockSymbol = userPortfolio.stocks_owned[i].stock_symbol

                let response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(stockSymbol)}&token=${encodeURIComponent(FH_API_KEY)}`);

                if(!response.ok) {
                console.error("Search failed:", response.status, response.statusText);
                return;
                }

                const data = await response.json();
                stockData.push({stockSymbol, currentPrice: data.c, percentChange: data.dp});
            }

            setStockPrices(stockData);
        }

        fetchStockData();

    }, [userPortfolio])


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
            </header>


            {/*Portfolio Value Card*/}
            <div className="mt-10 ml-10 mr-10 bg-white rounded-xl shadow p-8">
                <h1 className="block text-lg font-medium mb-1">
                    Portfolio Overview
                </h1>
                <p className='font-semibold'>Current Portfolio Value: </p>
                <p className='font-semibold'>Change: </p>
                <p className='font-semibold'>Available Cash: {userPortfolio?.cash.toFixed(2)} </p>
            </div>

            {/*Stock Cards / Table*/}
            <div className="mt-10 ml-10 mr-10 bg-white rounded-xl shadow p-8">
                <h1 className="block text-lg font-medium mb-1">
                    Current Portfolio Holdings
                </h1>
                <table className="w-full text-sm text-center">
                    <thead className="bg-neutral-secondary-soft border-b rounded-base">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium text-left">
                                Security Name (Symbol)
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Shares in Portfolio
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Current Share Price
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Total Amount in Portfolio
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                24 Hour Change
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPortfolio?.stocks_owned.map(({stock_desc, stock_symbol, quantity}, index) => (
                            <tr
                            key={index}
                            className="bg-neutral-primary border-b border-default">
                                <td className="px-6 py-4 text-left">
                                    {stock_desc} ({stock_symbol})
                                </td>
                                <td className="px-6 py-4">
                                    {quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {(stockPrices[index]?.currentPrice).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    {(quantity * stockPrices[index]?.currentPrice).toFixed(2)}
                                </td>
                                <td className= {stockPrices[index]?.percentChange >= 0 ? ("px-6 py-4 text-green-600 font-bold") : ("px-6 py-4 text-red-600 font-bold")}>
                                    {(stockPrices[index]?.percentChange).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/*Allocation*/}

            {/*Last 5 Trades*/}

        </div>
    );

}

export default PortfolioPage;
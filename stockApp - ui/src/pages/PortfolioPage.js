import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import usePrivateFetch from '../hooks/usePrivateFetch';

function PortfolioPage(){
    const [userPortfolio, setUserPortfolio] = useState(null);
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
                <table>
                    <tr>
                        <th>Security Name (Symbol)</th>
                        <th>Shares in Portfolio</th>
                        <th>Current Share Price</th>
                        <th>Total Amount in Portfolio</th>
                        <th>24 Hour Change</th>
                    </tr>

                    {userPortfolio?.stocks_owned.map(({stock_desc, stock_symbol, quantity}, index) => (
                        <tr
                        key={index}>
                            <td>{stock_desc} ({stock_symbol}) </td>
                            <td>{quantity}</td>
                            <td>*Get Share Price*</td>
                            <td>*Share Price * Quantity*</td>
                            <td>*Get 24 Hour Change*</td>
                        </tr>
                    ))}
                </table>
            </div>

            {/*Allocation*/}

            {/*Last 5 Trades*/}

        </div>
    );

}

export default PortfolioPage;
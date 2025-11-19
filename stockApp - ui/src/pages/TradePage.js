import { useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import debounce from 'lodash.debounce'
import AuthContext from "../context/AuthProvider";
import '../App.css';
import usePrivateFetch from '../hooks/usePrivateFetch';

const FH_KEY = process.env.FH_KEY

const TradePage = () => {
    const [symbol, setSymbol] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [price, setPrice] = useState();
    const [shares, setShares] = useState(0);
    const [tradeType, setTradeType]= useState("Buy");
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


    const debounceSearch = debounce(async (query) => {
        const response = await fetch(`https://finnhub.io/api/v1/search?q=${query}&exchange=US&token=${FH_KEY}`);
        const data = await response.json();
        const [{description, displaySymbol}] = data["results"];
    }, 500);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        debounceSearch(e.target.value);
    }

    const handleTrade = async () => {
        const cost = price * shares
        if (tradeType === "Sell" && cost > (userPortfolio?.cash ?? 0)) {
            alert ("Insufficent Funds");
            return;
        }

        try{
            const res = await privateFetch("/portfolio/trade", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({user, symbol, shares})
            });

            if (!res.ok){
                console.error('Trade request failed', res.status);
            }
        } catch (err) {
            console.error("Trade failed", err)
        }
    }

    return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
            <h1 className='text-2xl font-bold tracking-wide'>
                MarketLab
            </h1>
            <nav className="space-x-6">
                <button>Portfolio</button>
                <button>Dashboard</button>
            </nav>
            <h1 className='font-semibold'>Cash: {userPortfolio?.cash ?? "----"}</h1>
        </header>

        <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">

            <label className="text-2xl font-bold block mb-4 text-center">
                What kind of trade do you want to do?
            </label>

            <div className='flex justify-center'>
                <select
                onChange={(e) => setTradeType(e.target.value)}
                className='text-center border rounded-lg px-3 py-2 mb-4 w-full max-w-xs bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none'>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
            </div>


            {tradeType && (
                <section className="mt-10 bg-white rounded-xl shadow p-8 max-w-lg mx-auto">

                    <h1 className='text-2xl font-bold mb-4 text-center'>
                        {tradeType} Stock
                    </h1>

                    <label className="block text-sm font-medium mb-1">
                        Stock Symbol
                    </label>

                    <input
                    type = 'text'
                    placeholder="Company Name or Ticker Symbol"
                    value = {searchInput}
                    onChange = {handleSearchChange}
                    className='border rounded-lg px-3 py-2 mb-4 w-full shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none'/>
                    <ul className="search-result"></ul>

                    <label className="block text-sm font-medium mb-1">{tradeType} Quantity</label>
                    <input
                    min="1"
                    type="number"
                    placeholder="Enter the trade quantity"
                    value = {shares}
                    onChange = {(e) => setShares(e.target.value)}
                    className='border rounded-lg px-3 py-2 mb-4 w-full shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none'/>

                    {price && (
                        <p className='text-gray-700 mb-6 text-center'>
                            Current Price: ${price.toFixed(2)}
                        </p>
                    )}

                    <button
                        onClick={handleTrade}
                        className={`w-full py-2 rounded-lg font-semibold shadow-md
                            ${tradeType === 'Buy' ? "bg-green-400 hover:bg-green-500" : "bg-red-400 hover:bg-red-500"}`}
                    >
                        {tradeType}
                    </button>

                </section>
                )}

        </main>

    <footer className="text-center py-6 text-gray-500 border-t">
        © 2025 MarketLab
    </footer>
    </div>

);
}

export default TradePage;
import { useState, useEffect, useContext} from 'react';
import AuthContext, { AuthProvider } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AV_KEY = process.env.AV_KEY

function HomePage() {
    const navigate = useNavigate();
    const [ errMsg, setErrMsg] = useState('');
    const {auth ,setAuth} = useContext(AuthContext);
    const [snapshotStockData, setSnapshotStockData] = useState([
        { symbol: "AAPL", price: 0, change: 0 },
        { symbol: "TSLA", price: 0, change: 0 },
        { symbol: "MSFT", price: 0, change: 0 }]);


    const mockPortfolio = {
        value: 10250.75,
        cash: 750.25,
        dailyChange: 1.24
    };

    const updateStockPrice = (symbol, newPrice) => {
        setSnapshotStockData(prevData =>
            prevData.map(stock =>
            stock.symbol === symbol ? { ...stock, price: newPrice } : stock
            )
        );
    };

    const updateStockChange = (symbol, newChange) => {
        setSnapshotStockData(prevData =>
            prevData.map(stock =>
            stock.symbol === symbol ? { ...stock, change: newChange } : stock
            )
        );
    };

    const getStockData = async (stockSymbol) => {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${AV_KEY}`);
            const data = await response.json();
            const prices = data["Time Series (Daily)"];
            const lastTradingDay = Object.keys(prices)[0];
            const secondLastTradingDay = Object.keys(prices)[1];

            const stockPrice = Number(prices[lastTradingDay]["4. close"]);
            const prevStockPrice = Number(prices[secondLastTradingDay]["4. close"]);

            const percentChange = (stockPrice/prevStockPrice - 1) * 100;

            return {newPrice: stockPrice.toFixed(2), newChange: percentChange.toFixed(2)};

        } catch (error) {
            console.error("Error Fetching stock price:", error);
            return {newPrice: 100, newChange: 10};
        }
    }

    useEffect(() => {
        async function updateStocks() {
            for(let i = 0; i < snapshotStockData.length; i++) {
                let symbol = snapshotStockData[i].symbol;
                let newData =  await getStockData(symbol);
                console.log(newData);
                let price = newData.newPrice;
                let change = newData.newChange;
                console.log(price, change);
                updateStockPrice(symbol, price);
                updateStockChange(symbol, change);
            };
        }
        updateStocks();
    }, []);

    const logout_user = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch("/logout", {
                method: 'GET',
                credentials: 'include'
            });
            if(!response.ok) {
                throw new Error("Logout Failed");
            }
            setAuth({});

        } catch (err) {
            if (!err?.resposne) {
                setErrMsg('No server response')
            } else {
                setErrMsg('Logout Failed')
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Navbar */}
            <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-indigo-600">MarketLab</h1>

                {auth?.accessToken ? (
                    <nav className="space-x-6">
                        <button className="text-gray-700 hover:text-indigo-600">Portfolio</button>
                        <button
                            className="text-gray-700 hover:text-indigo-600"
                            onClick={() => navigate("/trade")}>
                                Trade
                        </button>
                    </nav>
                    ) : (<div></div>)}
                <div>
                    {auth?.accessToken ? (
                        <button
                        onClick={(e) => logout_user(e)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                        Logout
                        </button>
                    ) : (
                        <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                        Login
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
                {/*Portfolio */}
                {!auth?.accessToken ? (
                <section className="text-center mb-10">
                    <h2 className="text-3xl font-semibold mb-4">
                        Practice trading stocks in real time — risk free.
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Start with virtual cash, trade live market data, and improve your strategy.
                    </p>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                    onClick={() => navigate("/register")}>
                        Start Trading
                    </button>
                </section>
                ) : (
                <section className="bg-white rounded-2xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-gray-500">Portfolio Value</p>
                            <p className="text-2xl font-bold">${mockPortfolio.value.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Cash Balance</p>
                            <p className="text-2xl font-bold">${mockPortfolio.cash.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Today's Change</p>
                            <p
                            className={`text-2xl font-bold ${
                                mockPortfolio.dailyChange >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                            >
                            {mockPortfolio.dailyChange >= 0 ? "+" : ""}
                            {mockPortfolio.dailyChange}%
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                            Make a Trade
                        </button>
                    </div>
                </section>
                )}

                {/* Market Snapshot */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Market Snapshot</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {snapshotStockData.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">{stock.symbol}</p>
                                    <p className="text-gray-500">${stock.price}</p>
                                </div>
                                <span
                                    className={`font-semibold ${
                                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                                    >
                                    {stock.change >= 0 ? "+" : ""}
                                    {stock.change}%
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="text-center py-6 text-gray-500 border-t">
                © 2025 MarketLab
            </footer>


        </div>
    );
}

export default HomePage;
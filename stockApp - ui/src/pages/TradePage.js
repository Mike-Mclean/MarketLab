import { useNavigate} from 'react-router-dom';
import { useState} from 'react';
import '../App.css';

const TradePage = () => {
    const [symbol, setSymbol] = useState("")
    const [price, setPrice] = useState()
    const [shares, setShares] = useState(0)
    const [tradeType, setTradeType]= useState("Buy")

    const mockSymbols = {
        "Apple": "AAPL",
    }

    const mockPortfolio = {
        value: 10250.75,
        cash: 750.25,
        dailyChange: 1.24
    };

    const handleTrade = async () => {
        const cost = price * shares
        if (tradeType === "Sell" && cost > mockPortfolio.cash) {
            alert ("Insufficent Funds");
            return;
        }

        await fetch("/trade", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({symbol, shares})
        })
    }

    const navigate = useNavigate();

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
            <h1 className='font-semibold'>Cash: {mockPortfolio.cash}</h1>
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
                    value = {symbol}
                    onChange = {(e) => setSymbol(e.target.value)}
                    className='border rounded-lg px-3 py-2 mb-4 w-full shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none'/>
                    <ul class="search-result"></ul>

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
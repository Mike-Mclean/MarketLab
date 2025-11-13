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

    const handleTrade = (tradeType) => {
        if (tradeType === "Buy") {
            handleBuy();
        } else {
            handleSell();
        }
    }

    const handleSell = () => {

    }

    const handleBuy = () => {
        const cost = price * shares
        if (cost > mockPortfolio.cash) {
            alert ("Insufficent Funds");
            return;
        }
    }

    const navigate = useNavigate();

    return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
            <h1>MarketLab</h1>
            <nav className="space-x-6">
                <button>Portfolio</button>
                <button>Dashboard</button>
            </nav>
            <h1>Cash: {mockPortfolio.cash}</h1>
        </header>

        <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">

            <label className="text-2xl font-bold mb-4 text-center">What kind of trade do you want to do?</label>
            <br/>
            <select onChange={(e) => setTradeType(e.target.value)}>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </select>

            <div>
                {tradeType && (
                    <section className="text-center mb-10">
                        <h1>{tradeType} Stock</h1>

                        <label className="block text-sm font-medium mb-1">Stock Symbol</label>
                        <input
                        type = 'text'
                        placeholder="Company Name or Ticker Symbol"
                        value = {symbol}
                        onChange = {(e) => setSymbol(e.target.value)}/>
                        <ul class="search-result"></ul>

                        <label className="block text-sm font-medium mb-1">{tradeType} Quantity</label>
                        <input
                        min="1"
                        type="number"
                        placeholder="Enter the trade quantity"
                        value = {shares}
                        onChange = {(e) => setShares(e.target.value)}/>

                        {price? (<p>
                            Current Price: ${price.toFixed(2)}
                        </p>):
                        null}

                        <br/>

                        <button
                            onClick={handleTrade}
                        >
                            {tradeType}
                        </button>

                    </section>
                    )}
            </div>
        </main>

    <footer className="text-center py-6 text-gray-500 border-t">
        © 2025 MarketLab
    </footer>
    </div>


);
}

export default TradePage;
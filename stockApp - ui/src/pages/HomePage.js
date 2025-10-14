import { useState} from 'react';

function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const mockPortfolio = {
        value: 10250.75,
        cash: 750.25,
        dailyChange: 1.24
    };

    const mockMarketData = [
        { symbol: "AAPL", price: 189.22, change: +0.3 },
        { symbol: "TSLA", price: 251.4, change: -1.2 },
        { symbol: "MSFT", price: 410.88, change: +1.0 }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Navbar */}
            <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-indigo-600">MarketLab</h1>
                <nav className="space-x-6">
                    <button className="text-gray-700 hover:text-indigo-600">Home</button>
                    <button className="text-gray-700 hover:text-indigo-600">Dashboard</button>
                    <button className="text-gray-700 hover:text-indigo-600">Trade</button>
                </nav>
                <div>
                    {isLoggedIn ? (
                        <button
                        onClick={() => setIsLoggedIn(false)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                        Logout
                        </button>
                    ) : (
                        <button
                        onClick={() => setIsLoggedIn(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                        Login
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
                {/*Portfolio */}
                {!isLoggedIn ? (
                <section className="text-center mb-10">
                    <h2 className="text-3xl font-semibold mb-4">
                        Practice trading stocks in real time — risk free.
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Start with virtual cash, trade live market data, and improve your strategy.
                    </p>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
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
                        {mockMarketData.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">{stock.symbol}</p>
                                    <p className="text-gray-500">${stock.price.toFixed(2)}</p>
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
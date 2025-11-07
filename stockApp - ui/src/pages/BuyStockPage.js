import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState} from 'react';
import '../App.css';

const BuyStockPage = () => {
    const mockPortfolio = {
        value: 10250.75,
        cash: 750.25,
        dailyChange: 1.24
    };
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
            <h1 className="text-2xl font-bold mb-4 text-center">Buy stock</h1>
            <section className="text-center mb-10">
                <label className="block text-sm font-medium mb-1">Purchase Details:</label>
                <input placeholder="Company Name or Ticker Symbol"/>
            </section>

        </main>

    <footer className="text-center py-6 text-gray-500 border-t">
        © 2025 MarketLab
    </footer>
    </div>


);
}

export default BuyStockPage;
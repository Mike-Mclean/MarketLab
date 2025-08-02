import React from 'react';
import StockList from '../components/StockList';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'

function TradingHistoryPage(){
    
    const {username} = useParams();
    const navigate = useNavigate();
    const [userHistory, setUseHistory] = useState([]);
    const historyPageColumns = [
        {key: "stock_title", label: "Stock"},
        {key: "amount", label: "Amount Traded"},
        {key: "transactionType", label: "Buy/Sell"},
        {key: "price", label: "Price"},
        {key: "timestamp", label: "Date"}
    ];

    const loadHistory = async () => {
        const response = await fetch(`/user_api/history/${username}`);
        const data = await response.json();
        setUseHistory(data);
    }

    useEffect(() => {
        loadHistory();
    }, [])

    return(
        <div>
            <header>
                <button className='basic-buttons' onClick={() => navigate(`/user/${username}`)}>Back to Profile</button>
            </header>
            <h1 className="title1">Trading History</h1>
            <StockList
                stocks={userHistory}
                onBuy={null}
                onSell={null}
                columns={historyPageColumns}
                placeOrder={null}
            ></StockList>
        </div>
    );
}

export default TradingHistoryPage;
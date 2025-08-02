import React from 'react';
import StockList from '../components/StockList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function HomePage({ setTransactionStock}) {
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [userfunds, setUserFunds] = useState();
    const homepageColumns = [
        {key: "title", label: "Stock"},
        {key: "price", label: "Price"}
    ];

    const onBuy = stock => {
        setTransactionStock(stock);
        navigate('/buy-stock', {state: {userfunds, user}});
    }

    const placeOrder = stock =>{
        const fromProfile = false;
        setTransactionStock(stock);
        navigate('/buy-order', {state: {user, fromProfile}});
    }

    const loadStocks = async () => {
        const response = await fetch("/stock_api/stocks");
        const data = await response.json();
        setStocks(data);
    }

    const loadFunds = async () => {
        const fundsResponse = await fetch(`/funds_api/funds/${user}`);
        const userFundsData = await fundsResponse.json();
        setUserFunds(userFundsData.funds);
    }

    useEffect(() => {
        fetch("/response.txt")
        .then((res) => res.text())
        .then((text) => {
            try {
                const doc = JSON.parse(text);
                if (doc.success){
                    return fetch("/database.txt")
                } 
            }catch (error){
                console.error("Error parsing JSON:", error);
            }
        })
        .then((res) => res.text())
        .then((text) => {
            if (text) {
                const doc = JSON.parse(text);
                setUser(doc[0].username);
            }
        })
        .catch((err) => console.error("Error fetching user file: ", err));
        loadStocks();
    }, []);

    useEffect(() => {
        if (user) {
            loadFunds();
        }

    }, [user]);

    return (
        <div className='App'>
            <header className='homepage-header'>
                <p className="stock-data">Your funds: ${userfunds}</p>
                <button className='basic-buttons' onClick={() => navigate('/help')}>Help</button>
                <button className='basic-buttons' onClick={() => navigate('/add-funds', {userfunds, setUserFunds})}>Add Funds</button>
                <button className='basic-buttons' onClick={() => navigate(`/user/${user}`)}>Profile</button>
            </header>
            <StockList 
            stocks={stocks} 
            onBuy={onBuy} 
            onSell={null} 
            columns={homepageColumns}
            placeOrder={placeOrder}
            ></StockList>
            <footer>Get experience trading! Your trades are completely risk free, money on this platform isn't real!</footer>
        </div>
    );
}

export default HomePage;
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'

function ProfilePage({setTransactionStock}){

    const [userStocks, setUserStocks] = useState([]);
    const {username} = useParams();
    const navigate = useNavigate();
    const [userfunds, setUserFunds] = useState();
    const profilepageColumns = [
        {key: "stock_title", label: "Stock"},
        {key: "amountOwned", label: "Total Holdings"}
    ]

    const loadData = async (stock) => {
        const response = await fetch(`/stock_api/stocks/${stock.stock_title}`);
        const stock_data = await response.json();
        setTransactionStock(stock_data);
    }

    const loadFunds = async () => {
        const fundsResponse = await fetch(`/funds_api/funds/${username}`);
        const userFundsData = await fundsResponse.json();
        setUserFunds(userFundsData.funds);
    }

    const onBuy = async (stock) => {
        const user = username;
        await loadData(stock);
        navigate('/buy-stock', {state: {userfunds, user}});
    }

    const onSell = async (stock) => {
        const owned = stock.amountOwned;
        const user = username;
        await loadData(stock);
        navigate('/sell-stock', {state: {userfunds, owned, user}});
    }

    const placeOrder = async (stock) =>{
        const fromProfile = true;
        const user = username;
        await loadData(stock);
        navigate('/buy-order', {state: {user, fromProfile}});
    }

    const loadUserStocks = async () =>{
        const response = await fetch(`/user_api/user/${username}`);
        const data = await response.json();
        setUserStocks(data);
    }

    useEffect(() => {
        loadUserStocks();
        loadFunds();
    }, []);

    return(
        <div>
            <header className='homepage-header'>
                <p className="stock-data">Your funds: ${userfunds}</p>
                <button className='basic-buttons' onClick={() => navigate(`/history/${username}`)}>Trading History</button>
            </header>
            <StockList
            stocks={userStocks}
            onBuy={onBuy}
            onSell={onSell}
            columns={profilepageColumns}
            placeOrder={placeOrder}
            ></StockList>
        </div>
    );

}

export default ProfilePage;
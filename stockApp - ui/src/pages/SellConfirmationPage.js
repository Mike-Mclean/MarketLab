import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SellConfirmationPage() {
    const location = useLocation();
    const { title, total, userfunds, username, amountOwned, quantity} = location.state
    const navigate = useNavigate();

    const onConfirm = async () => {
        if(amountOwned >= quantity){
            const updatedFunds = Number(userfunds + total).toFixed(2);
            const updatedOwned = Number(amountOwned - quantity);
            const stockData = await fetch(`/stock_api/stocks/${title}`);
            const data = await stockData.json();
            const response = await fetch(`/funds_api/funds/${username}`, {
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({funds: updatedFunds})
            });
            const updateQuantity = await fetch(`/user_api/user/${username}/${title}`, {
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({amountOwned: updatedOwned})
            });
            const updateHistory = await fetch(`/user_api/history/${username}`, {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({userName: username,
                                    stock_title: title,
                                    stock_sym: data.sym,
                                    amount: quantity,
                                    transactionType: "Sell",
                                    price: data.price          
                                    })
            })
            navigate(`/user/${username}`);
    }};

    return(
        <div>
            <h1>Sell Confirmation</h1>
            <h2>Would you like to sell ${total.toFixed(2)} worth of {title} stock? This money will immediately added to your account</h2>
            <button onClick={() => onConfirm()}>Yes</button>
            <button onClick={() => navigate("/")}>No</button>
        </div>
    );
}

export default SellConfirmationPage;
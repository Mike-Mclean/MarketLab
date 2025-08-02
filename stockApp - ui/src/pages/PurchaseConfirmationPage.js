import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PurchaseConfirmationPage() {
    const location = useLocation();
    const { title, total, userfunds, user, owned, quantity} = location.state
    const navigate = useNavigate();

    const onConfirm = async () => {
        if(userfunds >= total){
            const updatedFunds = Number(userfunds - total).toFixed(2);
            const newOwned = Number(owned) + Number(quantity);
            const stockData = await fetch(`/stock_api/stocks/${title}`);
            const data = await stockData.json();
            const response = await fetch(`/funds_api/funds/${user}`, {
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({funds: updatedFunds})
            });
            const updateQuantity = await fetch(`/user_api/user/${user}/${title}`, {
                method: "PUT",
                headers:{"Content-Type": "application/json",},
                body: JSON.stringify({amountOwned: newOwned})
            });
            const updateHistory = await fetch(`/user_api/history/${user}`, {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({userName: user,
                                    stock_title: title,
                                    stock_sym: data.sym,
                                    amount: quantity,
                                    transactionType: "Buy",
                                    price: data.price        
                                    })
            })
            navigate(`/user/${user}`);
    }};

    return(
        <div>
            <h1>Purchase Confirmation</h1>
            <h2>Would you like to buy ${total.toFixed(2)} worth of {title} stock? If the stock price goes down, you will lose money. </h2>
            <button onClick={() => onConfirm()}>Yes</button>
            <button onClick={() => navigate("/")}>No</button>
        </div>
    );
}

export default PurchaseConfirmationPage;
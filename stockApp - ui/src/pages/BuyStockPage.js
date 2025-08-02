import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState} from 'react';
import '../App.css';

export const BuyStockPage = ({transactionStock}) => {

    const [title] = useState(transactionStock.title);
    const [sym] = useState(transactionStock.sym);
    const [price] = useState(transactionStock.price);
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();
    const total = price * (Number(quantity) || 0);
    const location = useLocation()
    const userfunds = location.state?.userfunds || 0;
    const user = location.state.user;
    
    const loadAmountOwned = async () => {
        const response = await fetch(`/user_api/user/${user}/${title}`);
        const userData = await response.json();
        return userData.amountOwned;
    }
    
    const onConfirm = async (total) => {
        const owned = await loadAmountOwned();
        if(userfunds >= total){
            
            navigate("/purchase-confirmation", {state: {title, total, userfunds, user, owned, quantity}});
    }};

    return(
        <div>
            <header>
                <p className="stock-data">Your funds: ${userfunds}</p>
            </header>
            <h1 className="title1">{title} Purchase</h1>
            <table className="purchase-table-size">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="stock-data">{sym}</td>
                        <td className="stock-data">${price}</td>
                        <td><input 
                                type="text" 
                                id="stockQuantity" 
                                value={quantity}
                                placeholder="Amount to Purchase"
                                className="stock-data"
                                onChange={e => {if(/^\d*$/.test(e.target.value)){
                                    setQuantity(e.target.value);
                                }}}/>
                            </td>
                    </tr>
                </tbody>
            </table>

            <h2 className="title2">{total === 0 ? "Total Purchase Amount": `$${total.toFixed(2)}`}</h2>
            <button onClick={ () => onConfirm(total)}>Confirm Purchase</button>
        </div>
    );
}

export default BuyStockPage;
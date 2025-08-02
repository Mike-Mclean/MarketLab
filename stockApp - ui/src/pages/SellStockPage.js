import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState} from 'react';
import '../App.css';

export const SellStockPage = ({transactionStock}) => {
    const [title] = useState(transactionStock.title);
    const [sym] = useState(transactionStock.sym);
    const [price] = useState(transactionStock.price);
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();
    const total = price * (Number(quantity) || 0);
    const location = useLocation()
    const userfunds = location.state?.userfunds || 0;
    const amountOwned = location.state?.owned || 0;
    const username = location.state.user

    const onConfirm = total => {
        if(amountOwned >= quantity){
            const new_amount = amountOwned - quantity
            navigate("/sell-confirmation", {state: {title, total, userfunds, username, amountOwned, quantity}});
    }};

    return(
        <div>
            <header>
                <p className="stock-data">Your funds: ${userfunds}</p>
            </header>
            <h1 className="title1">{title} Sale</h1>
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
                                placeholder="Amount to Sell"
                                className="stock-data"
                                onChange={e => {if(/^\d*$/.test(e.target.value)){
                                    setQuantity(e.target.value);
                                }}}/>
                            </td>
                    </tr>
                </tbody>
            </table>

            <h2 className="title2">{total === 0 ? "Total Sale Amount": `$${total.toFixed(2)}`}</h2>
            <button onClick={ () => onConfirm(total)}>Confirm Sale</button>
        </div>
    );

}

export default SellStockPage;
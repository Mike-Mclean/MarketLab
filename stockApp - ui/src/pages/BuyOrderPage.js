import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState} from 'react';
import '../App.css';

export const BuyOrderPage = ({transactionStock}) => { 

    const location = useLocation()
    const navigate = useNavigate();
    const [title] = useState(transactionStock.title);
    const [price] = useState(transactionStock.price);
    const [quantity, setQuantity] = useState("");
    const [strikePrice, setStrikePrice] = useState("");
    const [transactionType, setTransactionType] = useState("buy-limit");
    const user = location.state.user;
    const fromProfile =location.state.fromProfile;

    const onConfirm = async () =>{
        console.log(user, transactionType, title, strikePrice, quantity);
        
        const response = await fetch("/orders_api/new_order", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                userName: user,
                orderType: transactionType,
                stock_title: title,
                strike_price: strikePrice,
                quantity: quantity,
                executed: false
            })
        });

        navigate("/");
    }

    return(
        <div>
            <h1 className="title1">{title}Order</h1>
            <table className="purchase-table-size">
                <thead>
                    <tr>
                        <th>Current Price</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
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
                        <td><input 
                                type="text" 
                                id="strikePrice" 
                                value={strikePrice}
                                placeholder="Strike Price"
                                className="stock-data"
                                onChange={e => {if(/^\d*\.?\d{0,2}$/.test(e.target.value)){
                                    setStrikePrice(e.target.value);
                                }}}/>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2><select 
                    id="transactionType" 
                    value={transactionType} 
                    className="stock-data"
                    onChange={e => setTransactionType(e.target.value)}>
                        {fromProfile ? (
                            <>
                                <option value="buy-limit">Buy Limit</option>
                                <option value="buy-stop">Buy Stop</option>
                                <option value="sell-limit">Sell Limit</option>
                                <option value="sell-stop">Sell Stop</option>
                            </>
                        ) : (
                            <>
                                <option value="buy-limit">Buy Limit</option>
                                <option value="buy-stop">Buy Stop</option>
                            </>
                        )}
                </select>
                </h2>
            <button onClick={ () => onConfirm()}>Place Order</button>
        </div>
    );

}

export default BuyOrderPage;
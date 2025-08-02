import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import '../App.css';

export const AddFundsPage = ({funds, setFunds}) => {

    const [fundsToAdd, setFundsToAdd] = useState("");
    const navigate = useNavigate();

    const onAdd = fundsToAdd =>{
        setFunds(prevFunds => {
            const newFunds = (Number(prevFunds) + Number(fundsToAdd)).toFixed(2);
            return newFunds;
        });
        navigate("/")
    }

    return(
        <div>
            <h1 className="title1"> Add Funds</h1>
            <h3>Note: To encourage smart trading, we limit the amount you can add to your account to $500 USD per day.</h3>
            <table className="purchase-table-size">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="stock-data">Current Funds: ${funds}</td>
                        <td><input 
                                type="text" 
                                id="stockQuantity"  
                                value={fundsToAdd}
                                placeholder="Amount to add"
                                className="stock-data"
                                onChange={(e) => {if(/^\d*\.?\d{0,2}$/.test(e.target.value)){
                                    setFundsToAdd(e.target.value);
                                }}}/></td>
                    </tr>
                </tbody>
            </table>

            <h2 className="title2">{fundsToAdd === "" ? "Total after additional funds": `$${(Number(funds) + Number(fundsToAdd)).toFixed(2)}`}</h2>
            <button onClick={() => onAdd(fundsToAdd)}>Confirm Transfer</button>
            <button onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
}

export default AddFundsPage;
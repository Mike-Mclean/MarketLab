import React from "react";
import StockItem from "./StockItem";
import { useState} from 'react';

function StockList({stocks, onBuy, onSell, columns, placeOrder}){
    const [visibleStocks, setVisibleStocks] = useState(5);
    
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key ={col.key}>{col.label}</th>
                        ))}
                        {onBuy && (
                            <th key="buy"></th>
                        )}
                        {onSell && (
                            <th key="sell"></th>
                        )}
                        {placeOrder && (
                            <th key="placeOrder"></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {stocks.slice(0, visibleStocks).map((stock, i) => <StockItem stock={stock}
                        onBuy = {onBuy}
                        onSell={onSell}
                        columns={columns}
                        placeOrder={placeOrder}
                        key={i} />)}
                </tbody>
            </table>
            <button onClick={() => setVisibleStocks(visibleStocks + 5)}>Show More Stocks</button>
        </div>
    );
}

export default StockList;
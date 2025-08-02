import React from "react";
import '../App.css';

function StockItem({stock, onBuy, onSell, columns, placeOrder}){
    return(
        <tr>
            {columns.map((col) => (
                <td key={col.key} className="stock-data">{stock[col.key]}</td>
            ))}
            {onBuy && (
                <td className="buy-button" onClick={ () => onBuy(stock)}>Buy</td>
            )}
            {onSell && (
                <td className="buy-button" onClick={ () => onSell(stock)}>Sell</td>
            )}
            {placeOrder && (
                <td className="buy-button" onClick={ () => placeOrder(stock)}>Place Order</td>
            )}

        </tr>
    );
}

export default StockItem;

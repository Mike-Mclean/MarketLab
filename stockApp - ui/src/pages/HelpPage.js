import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function HelpPage(){
    const navigate = useNavigate();
    
    return(
        <div>
            <h1>Help</h1>
            <h2>
                <ul>
                    <li>To make a purchase click the Buy button next to the stock.</li>
                    <li>Enter the amount of the stock you’d like to buy in the "Amount to Purchase" field.</li>
                    <li>Click “Confirm Purchase” then on the Purchase Confirmation screen, click “Yes”</li>
                </ul>
            </h2>
            <button className='basic-buttons' onClick={() => navigate('/')}>Home</button>
        </div>
    );

}

export default HelpPage;
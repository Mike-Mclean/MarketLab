import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyStockPage from './pages/BuyStockPage';
import PurchaseConfirmationPage from './pages/PurchaseConfirmationPage';
import { useState} from 'react';
import HelpPage from './pages/HelpPage';
import AddFundsPage from './pages/AddFundsPage';
import ProfilePage from './pages/ProfilePage';
import { SellStockPage } from './pages/SellStockPage';
import SellConfirmationPage from './pages/SellConfirmationPage';
import BuyOrderPage from './pages/BuyOrderPage';
import TradingHistoryPage from './pages/TradingHistoryPage';
import LoginPage from './pages/LoginPage';

function App() {
  const[transactionStock, setTransactionStock] = useState();
  const[funds, setFunds] = useState(0);

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/homepage" element={<HomePage setTransactionStock={setTransactionStock}/>}/>
            <Route path="/buy-stock" element={<BuyStockPage transactionStock={transactionStock}/>}/>
            <Route path="/purchase-confirmation" element={< PurchaseConfirmationPage/>}/>
            <Route path="/help" element={<HelpPage />}/>
            <Route path="/add-funds" element={<AddFundsPage funds={funds} setFunds={setFunds}/>}/>
            <Route path='/user/:username' element={<ProfilePage setTransactionStock={setTransactionStock}/>}/>
            <Route path="/sell-stock" element={<SellStockPage transactionStock={transactionStock}/>}/>
            <Route path="/sell-confirmation" element={<SellConfirmationPage/>}/>
            <Route path="/buy-order" element={<BuyOrderPage transactionStock={transactionStock}/>}/>
            <Route path="/history/:username" element={<TradingHistoryPage/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

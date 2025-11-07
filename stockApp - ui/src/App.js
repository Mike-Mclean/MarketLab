import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyStockPage from './pages/BuyStockPage';
import PurchaseConfirmationPage from './pages/PurchaseConfirmationPage';
import { useState} from 'react';
import AddFundsPage from './pages/AddFundsPage';
import ProfilePage from './pages/ProfilePage';
import { SellStockPage } from './pages/SellStockPage';
import SellConfirmationPage from './pages/SellConfirmationPage';
import BuyOrderPage from './pages/BuyOrderPage';
import TradingHistoryPage from './pages/TradingHistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthProvider';

function App() {
  const[funds, setFunds] = useState(0);

  return (
    <AuthProvider>
      <div className="App">
        <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/buy" element={<BuyStockPage/>}/>
            </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TradePage from './pages/TradePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PortfolioPage from './pages/PortfolioPage';
import {AuthProvider} from './context/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/trade" element={<TradePage/>}/>
              <Route path="/userPortfolio/:user" element={<PortfolioPage/>}/>
            </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

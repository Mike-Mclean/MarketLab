# MarketLab

MarketLab is a full-stack stock trading simulation app. It allows users to register, log in, manage virtual funds, buy and sell stocks, and view trading history—all through a modern web interface.

## Features
- User registration and login
- View and manage virtual portfolio
- Buy and sell stocks with simulated funds
- Trading history and order management
- Responsive UI built with React
- RESTful backend APIs (Node.js/Express)

## Project Structure
```
MarketLab/
├── stockApp - stockRest/      # Stock REST API backend
├── stockApp - userRest/       # User REST API backend
└── stockApp - ui/             # React frontend
```

### stockApp - ui/
- React app for user interface
- Components for login, registration, trading, and portfolio
- API calls to backend services

### stockApp - stockRest/
- Node.js/Express REST API for stock data
- Controllers and models for stock operations

### stockApp - userRest/
- Node.js/Express REST API for user data
- Controllers and models for user funds, history, and portfolio

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/Mike-Mclean/MarketLab.git
   ```
2. Install dependencies for each folder:
   ```
   cd "stockApp - ui"
   npm install
   cd "../stockApp - stockRest"
   npm install
   cd "../stockApp - userRest"
   npm install
   ```

### Running the App
1. Start the backend servers:
   ```
   cd "stockApp - stockRest"
   npm start
   cd "../stockApp - userRest"
   npm start
   ```
2. Start the frontend:
   ```
   cd "stockApp - ui"
   npm start
   ```
3. Open your browser to `http://localhost:3000`

## API Endpoints
- `/api/stocks` — Stock data and trading
- `/api/user` — User registration, login, funds, history, portfolio

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Author
Mike-Mclean

import express from 'express';
import 'dotenv/config';
import ordersRouter from './controllers/orders_controller.mjs';
import userFundsRouter from './controllers/userFunds_controller.mjs';
import userHistoryRouter from './controllers/userHistory_controller.mjs';
import userPortfolioRouter from './controllers/userPortfolio_controller.mjs';
import userRegisterRouter from './controllers/registerLogin_controller.mjs';
import db from './db.js'
import verifyJWT from './services/verifyJWT.mjs';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3075;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/register', userRegisterRouter);

app.use(verifyJWT);
app.use('/orders', ordersRouter);
app.use('/funds', userFundsRouter);
app.use('/history', userHistoryRouter);
app.use('/portfolio', userPortfolioRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
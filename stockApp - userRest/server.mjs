import express from 'express';
import 'dotenv/config';
import ordersRouter from './orders_controller.mjs';
import userFundsRouter from './userFunds_controller.mjs';
import userHistoryRouter from './userHistory_controller.mjs';
import userPortfolioRouter from './userPortfolio_controller.mjs';

const PORT = process.env.PORT || 3075;
const app = express();

app.use(express.json());
app.use('/orders', ordersRouter);
app.use('/funds', userFundsRouter);
app.use('/history', userHistoryRouter);
app.use('/portfolio', userPortfolioRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
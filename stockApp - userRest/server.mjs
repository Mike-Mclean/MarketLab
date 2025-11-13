import express from 'express';
import 'dotenv/config';
import ordersRouter from './controllers/orders_controller.mjs';
import userFundsRouter from './controllers/userFunds_controller.mjs';
import userHistoryRouter from './controllers/userHistory_controller.mjs';
import userPortfolioRouter from './controllers/userPortfolio_controller.mjs';
import userRegisterRouter from './controllers/register_controller.mjs';
import loginRouter from './controllers/login_controller.mjs';
import refreshTokenRouter from './controllers/refreshToken_controller.mjs';
import logoutRouter from './controllers/logout_controller.mjs'
import verifyJWT from './services/verifyJWT.mjs';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const PORT = process.env.PORT || 3075;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  'http://localhost:3000'
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/register', userRegisterRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshTokenRouter);
app.use('/logout', logoutRouter);

app.use(verifyJWT);
app.use('/orders', ordersRouter);
app.use('/funds', userFundsRouter);
app.use('/history', userHistoryRouter);
app.use('/portfolio', userPortfolioRouter);

if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const clientBuildPath = path.join(__dirname, '..', 'stockApp - ui', 'build');
    app.use(express.static(clientBuildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
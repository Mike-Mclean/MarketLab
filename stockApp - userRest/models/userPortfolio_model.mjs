import mongoose from 'mongoose';
import { User } from './registerLogin_model.mjs';

const userPortfolioSchema = mongoose.Schema({
    userName: {type: String, requried: true},
    cash: {type: Number, required: true, default: 0},
    stocks_owned: [
        {
            stock_symbol: {type: String, required: true},
            quantity: {type: Number, required: true}
        }
    ]
});

const UserPortfolio = mongoose.model("User Portfolio", userPortfolioSchema);


const createUserPortfolio = (userName) => {
    const userPortfolio = new UserPortfolio({userName: userName});
    return userPortfolio.save();
}

const findUserPortfolio = async (userName) => {
    const user = await UserPortfolio.findOne({userName: userName});
    return user;
}

const updateUserStocks = async (userName, stock_symbol, tradeQuantity, price, tradeType) => {

    const portfolio = await UserPortfolio.findOne({userName: userName});

    const isBuy = tradeType === "Buy"

    const stock = portfolio.stocks_owned.find(
        (s) => s.stock_symbol === stock_symbol
    );

    if(!stock && isBuy) {
        await UserPortfolio.findOneAndUpdate(
        {userName},
        {$push:
            {stocks_owned:
                {
                    stock_symbol,
                    quantity: tradeQuantity
                }
            },
        $inc: { cash: -price}
        },
        {new: true});
    } else if (stock && isBuy){
        await UserPortfolio.findOneAndUpdate(
        {
            userName,
            'stocks_owned.stock_symbol': stock_symbol
        },
        {
            $inc: { "stocks_owned.$.quantity": tradeQuantity,
                cash: -price
            }
        },
        {new: true});

    }

    // Keep for sell flow
    // if (stock && stock.quantity === 0){
    //     update = await UserPortfolio.findOneAndUpdate(
    //     {
    //         userName
    //     },
    //     {
    //         $pull: { stocks_owned: {stock_symbol}}
    //     },
    //     {new: true}
    //     )
    // }
    //if user doesn't own any of this stock
}


export {createUserPortfolio, findUserPortfolio, updateUserStocks}
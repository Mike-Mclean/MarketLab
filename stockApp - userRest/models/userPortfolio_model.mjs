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

const findUserStocks = async (userName) => {
    const user = await UserPortfolio.findOne({userName: userName});
    return user.stocks_owned;
}

const updateUserStocks = async (refToken, stock_symbol, tradeQuantity) => {
    const foundUser = await User.findOne({refToken: refToken});
    const userName = foundUser.user;
    let update = await UserPortfolio.findOneAndUpdate(
        {
            userName,
            'stocks_owned.stock_symbol': stock_symbol
        },
        {
            $inc: { "stocks_owned.$.quantity": tradeQuantity}
        },
        {new: true}
    );

    const stock = update.stocks_owned.find(
        (s) => s.stock_symbol === stock_symbol
    );

    if (stock && stock.quantity === 0){
        update = await UserPortfolio.findOneAndUpdate(
        {
            userName
        },
        {
            $pull: { stocks_owned: {stock_symbol}}
        },
        {new: true}
        )
    }
    //if user doesn't own any of this stock
    if (!update) {
        update = await UserPortfolio.findOneAndUpdate(
        {refToken},
        {$push:
            {stocks_owned:
                {
                    stock_symbol,
                    quantity: tradeQuantity
                }
            }
        },
        {new: true}
    );
    }
    return update
}


export {createUserPortfolio, findUserStocks, updateUserStocks}
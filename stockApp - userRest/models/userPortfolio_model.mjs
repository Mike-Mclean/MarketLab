import mongoose from 'mongoose';

const userPortfolioSchema = mongoose.Schema({
    userName: {type: String, requried: true},
    cash: {type: Number, required: true, default: 0},
    stocks_owned: {type: Array},
});

const UserPortfolio = mongoose.model("User Portfolio", userPortfolioSchema);


const createUserPortfolio = async (userName, stock_title, stock_sym, amountOwned) => {
    const userPortfolio = new UserStock({userName: userName,
                                    stock_title: stock_title,
                                    stock_sym: stock_sym,
                                    amountOwned: amountOwned});
    return userStock.save();
}

const findAllUserStocks = async (userName) => {
    const query = UserStock.find({userName: userName});
    return query.exec();
}

const findUserStockByUserName = async (userName, stock_title) => {
    const query = UserStock.findOne({userName: userName, stock_title: stock_title});
    return query.exec();
}

const replaceUserStock = async (userName, stock_title, amountOwned) =>{
    const result = await UserStock.replaceOne(
        {userName: userName, stock_title: stock_title},
        {userName: userName, stock_title: stock_title, amountOwned: amountOwned}
    );
    return result.modifiedCount;
}

const deleteById = async (userName, stock) => {
    const result = await UserStock.deleteOne({userName: userName, stock: stock});
    return result.deletedCount;
}

export {createUserStock, findUserStockByUserName, replaceUserStock, deleteById, findAllUserStocks};
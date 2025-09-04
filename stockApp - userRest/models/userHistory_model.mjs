import mongoose from 'mongoose';

const userHistorySchema = mongoose.Schema({
    userName: {type: String, required: true},
    stock_title: {type: String, required: true},
    stock_sym: {type: String, required: true},
    amount: {type: Number, required: true},
    transactionType: {type: String, enum: ["Buy", "Sell"], required: true},
    price: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now}},
    {collection: "Trading History", versionKey: false

});

const UserHistory = mongoose.model("TradingHistory", userHistorySchema);

const addHistory = async (userName, stock_title, stock_sym, amount, transactionType, price) => {
    const trade = new UserHistory({userName: userName,
                                    stock_title: stock_title,
                                    stock_sym: stock_sym,
                                    amount: amount,
                                    transactionType: transactionType,
                                    price: price});
    return trade.save();
};

const findAllUserHistory = async (userName) => {
    const query = UserHistory.find({userName: userName});
    return query.exec();
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {addHistory, findAllUserHistory};
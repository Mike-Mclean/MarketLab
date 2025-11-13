import * as userInfo from '../models/userPortfolio_model.mjs';
import express from 'express';
import { checkSchema, validationResult } from 'express-validator';

const router = express.Router();

router.post('/trade', checkSchema({
    tradeType: {notEmpty: true, isString: true},
    userName: {notEmpty: true, isString: true},
    stock_title: {notEmpty: true, isString: true},
    stock_sym: {notEmpty: true, isString: true},
    amount: {notEmpty: true, isFloat: true, isFloat: {options: {gt: 0}}}
    }),
    (req, res) => {
        const result = validationResult(req);
        const {tradeType, userName, stock_title, stock_sym, amount} = req.body;
        if (result.isEmpty()){
            userInfo.createUserStock()
            .then(info => {
                res.status(201).json(info);
            })
            .catch(err =>{
                console.error(err);
                res.status(500).json({Error: 'Internal Server Error'})
            });
        } else {
            console.error(result.array());
            res.status(400).json({Error: 'invalid request', details: result.array()});
        }
    });

router.get('/user/:userName', (req, res) => {
    const user = req.params.userName;
    userInfo.findAllUserStocks(user)
    .then(userInfo => {
        res.json(userInfo);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    })
});

router.get('/user/:userName/:stock_title', (req, res) => {
    const user = req.params.userName;
    const stock = req.params.stock_title
    userInfo.findUserStockByUserName(user, stock)
    .then(userInfo => {
        res.json(userInfo);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    })
});

router.put('/user/:userName/:stock', (req, res) => {
    userInfo.replaceUserStock(req.params.userName, req.params.stock, req.body.amountOwned)
    .then(modifiedCount => {
        if (modifiedCount === 1){
            res.json({amountOwned: req.body.amountOwned})
        } else {
            res.status(404).json({Error: 'Resource not found'});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    });

});

router.delete('/user/:userName/:stock', (req, res) => {
    userInfo.deleteById(req.params.userName, req.params.stock)
        .then(deletedCount => {
            if (deletedCount === 1){
                res.status(204).send();
            } else{
                res.status(404).json({ Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'})
        })
});

export default router;
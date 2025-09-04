import * as userInfo from '../models/userHistory_model.mjs';
import express from 'express';
import { checkSchema, validationResult } from 'express-validator';

const router = express.Router();

router.post('/history/:userName', checkSchema({
    userName: {notEmpty: true, isLength: {options: {min: 1}}, isString: true},
    stock_title: {notEmpty: true, isLength: {options: {min: 1}}, isString: true},
    stock_sym: {notEmpty: true, isLength: {options: {min: 1}}, isString: true},
    amount: {notEmpty: true, isFloat: true, isFloat: {options: {gt: 0}}},
    transactionType: {notEmpty: true, isLength: {options: {min: 1}}, isString: true},
    price: {notEmpty: true, isFloat: true, isFloat: {options: {gt: 0}}},
    }),
    (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()){
            userInfo.addHistory(req.body.userName,
                                req.body.stock_title,
                                req.body.stock_sym,
                                req.body.amount,
                                req.body.transactionType,
                                req.body.price)
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

router.get('/history/:userName', (req, res) => {
    const user = req.params.userName;
    userInfo.findAllUserHistory(user)
    .then(userInfo => {
        res.json(userInfo);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    })
});

export default router;
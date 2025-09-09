import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { handleNewUser, handleLogin } from '../models/registerLogin_model.mjs';

const router = express.Router();

function validateAndHandle(req, res, handler){
    const isNotValid = validationResult(req);
        if (isNotValid.isEmpty()){
            handler(req, res);
        } else {
            console.error(isNotValid.array());
            res.status(400).json({Error: 'invalid request', details: result.array()});
        }
}

router.post('/', checkSchema({
    user: {notEmpty: true},
    pwd: {notEmpty: true}}),
    (req, res) => {
        validateAndHandle(req, res, handleNewUser);
    });

router.post('/login', checkSchema({
    user: {notEmpty: true},
    pwd: {notEmpty: true}}),
    (req, res) => {
        validateAndHandle(req, res, handleLogin);
    });



export default router;
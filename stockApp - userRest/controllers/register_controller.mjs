import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { handleNewUser } from '../models/register_model.mjs';

const router = express.Router();

router.post('/register', checkSchema({
    user: {notEmpty: true},
    pwd: {notEmpty: true}}),
    (req, res) => {
        const isNotValid = validationResult(req);
        if (isNotValid.isEmpty()){
            handleNewUser(req.body.user, req.body.pwd)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({Error: 'Internal Server Error'})
            });
        } else {
            console.error(isNotValid.array())
            res.status(400).json({Error: 'invalid request', details: result.array()});
        }
    });
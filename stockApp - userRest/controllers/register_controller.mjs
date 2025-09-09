import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { handleNewUser } from '../models/register_model.mjs';

const router = express.Router();

router.post('/', checkSchema({
    user: {notEmpty: true},
    pwd: {notEmpty: true}}),
    (req, res) => {
        const isNotValid = validationResult(req);
        if (isNotValid.isEmpty()){
            handleNewUser(req, res);
        } else {
            console.error(isNotValid.array());
            res.status(400).json({Error: 'invalid request', details: result.array()});
        }
    });

    export default router;
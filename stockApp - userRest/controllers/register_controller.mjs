import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { handleNewUser} from '../models/registerLogin_model.mjs';

const router = express.Router();

export function validateAndHandle(req, res, handler){
    const isNotValid = validationResult(req);
        if (isNotValid.isEmpty()){
            handler(req, res);
        } else {
            console.error(isNotValid.array());
            res.status(400).json({Error: 'invalid request', details: isNotValid.array()});
        }
}

router.post('/', checkSchema({
    user: {notEmpty: true},
    pwd: {notEmpty: true}}),
    (req, res) => {
        validateAndHandle(req, res, handleNewUser);
    });

export default router;
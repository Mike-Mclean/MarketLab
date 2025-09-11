import express from 'express';
import { checkSchema} from 'express-validator';
import {handleLogin} from '../models/registerLogin_model.mjs';
import { validateAndHandle } from './register_controller.mjs';

const router = express.Router();

router.post('/', checkSchema({
    user: {notEmpty: true},
    pwd: {notEmpty: true}}),
    (req, res) => {
        validateAndHandle(req, res, handleLogin);
    });

export default router;
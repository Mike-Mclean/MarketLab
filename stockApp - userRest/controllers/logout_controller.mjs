import express from 'express';
import {handleLogout} from '../models/registerLogin_model.mjs';

const router = express.Router();

router.get('/',
    (req, res) => {
        handleLogout(req, res);
    });

export default router;
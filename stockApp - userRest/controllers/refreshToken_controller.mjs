import express from 'express';
import {handleRefreshToken} from '../models/registerLogin_model.mjs';

const router = express.Router();

router.get('/', (req, res) => {
    handleRefreshToken(req, res)
});


export default router;
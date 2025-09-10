import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const usersSchema = mongoose.Schema({
    user: {type: String, required: true},
    pwd: {type: String, required: true},
    refToken: {type: String, default: []}
}, {
    collection: 'Users',
    versionKey: false
});

const User = mongoose.model("Users", usersSchema);

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});
    const duplicate = await User.findOne({user})
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = new User({user, pwd: hashedPwd});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully'})
    } catch (err) {
        res.status(500).json({"message" : err.message})
    }
}

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || ! pwd) return res.status(400).json({'message' : 'Username and password are required'});

    const foundUser = await User.findOne({user});
    if (!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.pwd)
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {"username": foundUser.user},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '300s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.user},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        foundUser.refToken.push(refreshToken);
        res.json({ accessToken});
    } else {
        res.sendStatus(401);
    }
}

export {handleNewUser, handleLogin}
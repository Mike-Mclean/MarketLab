import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const usersSchema = mongoose.Schema({
    user: {type: String, required: true},
    pwd: {type: String, required: true},
    refToken: {type: Array, default: []}
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
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
        await User.updateOne(
            { user: foundUser.user },
            {$push: {refToken: refreshToken}}
        );
        res.json({ accessToken});
    } else {
        res.sendStatus(401);
    }
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refToken: refreshToken})
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.user !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s'}
            );
            res.json({accessToken})
        }
    );
}
const handleLogout = async (req, res) => {
    // On client, acessToken needs to be deleted.
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refToken: refreshToken})
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }
    //Delete refreshToken in db
    await User.updateOne(
        {refToken: refreshToken},
        {$pull: {refToken: refreshToken}}
    );

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true}); //made add secure: true to serve https
    res.sendStatus(204)
}

export {handleNewUser, handleLogin, handleRefreshToken, handleLogout}
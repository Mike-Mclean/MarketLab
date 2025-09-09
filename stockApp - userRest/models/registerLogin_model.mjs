import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = mongoose.Schema({
    user: {type: String, required: true},
    pwd: {type: String, required: true}},
    {collection: 'Users', versionKey: false
});

const User = mongoose.model("Users", usersSchema);

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});
    //check for duplicates in users db
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
        res.json({ 'success': `User ${user} is logged in!`});
    } else {
        res.sendStatus(401);
    }
}

export {handleNewUser, handleLogin}
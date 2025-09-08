import mongoose from 'mongoose';

const bcrypt = require('bcrypt');

const usersSchema = mongoose.Schema({
    user: {type: String, requried: true},
    pwd: {type: String, required: true}},
    {collection: 'Users', versionKey: false
});

const User = mongoose.model("User", usersSchema);

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});

    //check for duplicates in users db
    const duplicate = await User.findOne({user})
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        await createNewUser(user, pwd);
        res.status(201).json({ message: 'User created seuccessfully'})
    } catch (err) {
        res.status(500).json({"message" : err.message})
    }
}

const createNewUser = async (user, pwd) => {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const user = new User({user, pwd: hashedPwd});
    return user.save();
}


export {handleNewUser}
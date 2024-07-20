const userRepo = require("../models/user");
const generateToken = require("../utils/jwt");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        await userRepo.saveUser(
            req.body.username,
            req.body.password,
            "Nurse",
        );
        res.status(201).json({message: "User created"});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'User already exists'});
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userRepo.findUserByUsername(req.body.username);
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            res.status(202).json({token: generateToken(user._id)});
        } else {
            res.status(400).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {registerUser, loginUser};
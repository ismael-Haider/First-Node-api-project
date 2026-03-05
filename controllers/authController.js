const {User, ValidateLoginUser, ValidateRegesterUser} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

/**
 * @doc   register a new user
 * @path  /api/auth/register
 * @method POST
 * @access public
 */
const registerUser = asynchandler(async (req, res) => {
    const { error } = ValidateRegesterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "this user is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User(req.body);
    const result = await user.save();
    const { password, ...other } = result._doc;

    // sign token
    const token = jwt.sign(
        { id: result._id, isAdmin: result.isAdmin },
        process.env.SECRET_KEY
    );

    res.status(201).json({ ...other, token });
});

/**
 * @doc   login existing user
 * @path  /api/auth/login
 * @method POST
 * @access public
 */
const loginUser = asynchandler(async (req, res) => {
    const { error } = ValidateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    const { password, ...other } = user._doc;
    const token = user.generateToken();
    res.status(200).json({ ...other, token });
});

module.exports = {
    registerUser,
    loginUser,
};

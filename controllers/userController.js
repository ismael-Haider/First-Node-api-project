const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const { ValidateUpdateUser } = require("../models/User");

/**
 * @doce Update users
 * @path /api/users/:id
 * @method PUT
 * @acces privet
 */
const updateUser = asynchandler(async (req, res) => {
    // هون لازم اكد مشان مو ازا عطاني توكين مو لنفس الايدي بيعدل فبعمل شرط

    const { error } = ValidateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    console.log(req.headers);
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            },
        },
        {
            new: true,
            //من اجل اعادة الفاليداشن من المونغو
            runValidators: true,
        },
    ).select("-password");
    res.status(200).json(updatedUser);
});

/**
 * @doce Get All Users
 * @path /api/users
 * @method GET
 * @access private (only admin)
 */
const getAllUser=asynchandler(async(req,res)=>{
    const users=await User.find().select("-password")
    res.status(200).json(users)
})

/**
 * @doce Get User by id
 * @path /api/users/:id
 * @method GET
 * @access private (only admin&user himself)
 */
const getUserById=asynchandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password")
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({message:"usser not found"})
    }
})

/**
 * @doce Delete
 * @path /api/users/:id
 * @method DELETE
 * @access private (only admin & user himself)
 */
const DeleteUser=asynchandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password")
    if(user){
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"user deleting sucesfully"})
    }else{
        res.status(404).json({message:"usser not found"})
    }
})

module.exports={
    updateUser,
    DeleteUser,
    getAllUser,
    getUserById
}

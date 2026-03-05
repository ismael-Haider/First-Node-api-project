const mongoose=require("mongoose")
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200,
        unique:true,
    }
    ,
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true,
})
userSchema.methods.generateToken=function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.SECRET_KEY);
}



const User=mongoose.model("User",userSchema)
//validation Regester User 
    function ValidateRegesterUser(obj){
        const schema=Joi.object({
            email:Joi.string().trim().min(3).max(200).required(),
            username:Joi.string().trim().min(2).max(200).required(),
            password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}
// validation Update User
    function ValidateLoginUser(obj){
        const schema=Joi.object({
            email:Joi.string().trim().min(3).max(200).required(),
            password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}
// validation Update User
    function ValidateUpdateUser(obj){
        const schema=Joi.object({
            email:Joi.string().trim().min(3).max(200),
            username:Joi.string().trim().min(2).max(200),
            password:Joi.string().trim().min(6),
    })
    return schema.validate(obj)
}


module.exports={
    User,
    ValidateRegesterUser,
    ValidateLoginUser,
    ValidateUpdateUser,
}
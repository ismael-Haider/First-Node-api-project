const mongoose=require("mongoose")
const Joi = require('joi');

const BookSchema=new mongoose.Schema({
    name:{
        minlength:3,
        required:true,
        maxlength:15,
        type:String,
    }, 
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author", 
    required: true,
  },
  title:{
    type:String,
    required:true,
    minlength:3,
    maxlength:15,
  },
  price:{
    type:Number,
    min:0,
    max:1000,
  }
  ,
  cover:{
    type:String,
    required:true,
    enum:["soft cover","hard cover"]
  }
})

const Book=mongoose.model("Book",BookSchema)


function ValidateCreateBook(obj){
        const schema=Joi.object({
        title:Joi.string().trim().min(3).max(15).required(),
        name:Joi.string().trim().min(3).max(15).required(),
        author:Joi.string().required(),
        price: Joi.number().min(0).max(1000),
        cover:Joi.string().required().valid("soft cover","hard cover")
    })
    return schema.validate(obj)
}
function ValidateUpdateBook(obj){
        const schema=Joi.object({
        title:Joi.string().trim().min(3).max(15).required(),
        name:Joi.string().trim().min(3).max(15).required(),
        author:Joi.string().required(),
        price: Joi.number().min(0).max(1000),
        cover:Joi.valid("soft cover","hard cover").string().required()
    })
    return schema.validate(obj)
}



module.exports={
  Book,
  ValidateCreateBook,
  ValidateUpdateBook
}

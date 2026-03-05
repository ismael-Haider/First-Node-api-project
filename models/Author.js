const mongoose=require("mongoose");
const Joi=require("joi")

const AuthorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15,
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15,
    },
    fatherName:{
        type:String,
        minlength:3,
        maxlength:13,
        default:"fouad"
    }
},{
    timestamp:true,
})
    // i need to write what i need to export in author router
    const Author=mongoose.model("Author",AuthorSchema);

    function ValidateCreateauthor(obj){
        const schema=Joi.object({
            name:Joi.string().trim().min(4).max(15).required(),
            lastName:Joi.string().trim().min(3),
            fatherName:Joi.string().trim().min(3),
    })
    return schema.validate(obj)
}
function ValidateUpdateauthor(obj){
        const schema=Joi.object({
        name:Joi.string().trim().min(4).max(15),
        lastName:Joi.string().trim().min(4).max(15),
        fatherName:Joi.string().trim().min(4).max(15),
    })
    return schema.validate(obj)
}

    module.exports={
        Author,
        ValidateCreateauthor,
        ValidateUpdateauthor,
    }
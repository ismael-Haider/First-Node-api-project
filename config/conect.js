const mongoose=require("mongoose")
function conect(){
try {
    mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
   );
    console.log("conect succesfully")}
 catch (error) {
    console.log("cann't conect data base",error)
}
}
module.exports={conect}
// i can write this to connect with mongo insted using try catch method
// mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("connection to mongoDb")}).catch((err)=>{console.log(err)})
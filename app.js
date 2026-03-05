const express=require("express")
const app=express();
require("dotenv").config();
const logger=require("./middlewares/logger")
const error=require('./middlewares/error')
const notfound=require("./middlewares/notFound");
const { conect } = require("./config/conect");

// Apply midalewares
app.use(express.json())
app.use(logger)


//Routes 
app.use("/api/books",require("./Routes/books"))
app.use("/api/authors",require("./Routes/authors"))
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/user",require("./Routes/user"))

// not found handler midalewares to dont show html, here it wlll show a fson with message to frontend develoter : after all routes befor handler error 
app.use(notfound)
// Error handler midalewares to dont show html here it well show a json with message to frontend developer: after all routes I mean after each route
app.use(error)

// conect in mongodb
conect()

// app.post()
// app.delete()
// app.put()

//running the server
app.listen(process.env.PORT,()=>console.log("servering "+process.env.PORT))
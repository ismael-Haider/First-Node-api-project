const {Book,ValidateCreateBook,ValidateUpdateBook} = require("../models/Book")
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");

/**
 * @doce get all books
 * @path /api/books
 * @method GET 
 * @acces public 
 */
const getAllBook= asynchandler(
    async(req,res)=>{
        // $eq (equals)
        // $ne (not equal)
        // $gt (greater than)
        // $lt (less than)
        // $lte (less than or equal)
        // $gte (greater than or equal)
        // $in (in){in[1,2,3,4]}
        // $nin (not in){nin[1,2,3,4]}
        const {min,max}=req.qurey;
        if(min && max){
            const books = await Book.find({price:{$gte:min,$lte:max}});
            return res.json(books);
        }else{
            const books=await Book.find()
                if(!books || books.length===0){
                    console.log("ismael")
                    return res.status(404).json({message:"it is empty"})
                }
            return res.json(books);
        }
})
/**
 * @doce get book by id
 * @path /api/books/:id
 * @method GET 
 * @acces public 
 */
const getBookById=asynchandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid Book ID" });
    }
    const book = await Book.findById(id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
})
/**
 * @doce create book
 * @path /api/books
 * @method POST 
 * @acces private (only admin) 
 */
const createBook=asynchandler(async(req,res)=>{
    const {error}=ValidateCreateBook(req.body)
    
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    const book=new Book({
        name:req.body.name,
        author:req.body.author,
        title:req.body.title.trim(),
        price:req.body.price,
        cover:req.body.cover,
    })
    const result=await book.save();
    res.status(201).json(result)
    
})
/**
 * @doce update book
 * @path /api/books/:id
 * @method PUT 
 * @access private (only admin) 
 */
const updateBook=asynchandler(async(req,res)=>{
    const {error}=ValidateUpdateBook(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const updatedbook=await Book.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            author:req.body.author,
            title:req.body.title.trim(),
            price:req.body.price,
            cover:req.body.cover,
        }
    },{new:true})
    res.status(201).json(updatedbook)
})

/**
 * @doce delete book
 * @path /api/books/:id
 * @method DELETE 
 * @acces public 
 */
const DeleteBook=asynchandler(async(req,res)=>{
    const book=await Book.findById(req.params.id);
    console.log(book)
    if(book){
        await Book.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"deteting succesfuly"})
    }
    else{
        res.status(404).json({message:"book not found"})
    }
})
module.exports={
    getAllBook,
    getBookById,
    createBook,
    updateBook,
    DeleteBook
}
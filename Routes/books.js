const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
    createBook,
    DeleteBook,
    getAllBook,
    getBookById,
    updateBook,
} = require("../controllers/bookController");

router
    .route("/")
    .post(verifyTokenAndAdmin, createBook)
    .get(getAllBook);

router
    .route("/:id")
    .get(getBookById)
    .put(verifyTokenAndAdmin, updateBook)
    .delete(verifyTokenAndAdmin, DeleteBook);

module.exports = router;
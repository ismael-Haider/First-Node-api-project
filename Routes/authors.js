const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} = require("../controllers/authorController");

// public
router.route("/")
    .get(getAllAuthors)
    .post(verifyTokenAndAdmin, createAuthor);

router.route("/:id")
    .get(getAuthorById)
    .put(verifyTokenAndAdmin, updateAuthor)
    .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
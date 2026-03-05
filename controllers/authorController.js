const { Author, ValidateCreateauthor, ValidateUpdateauthor } = require("../models/Author");
const asynchandler = require("express-async-handler");

/**
 * @doc    get all authors
 * @path   /api/authors
 * @method GET
 * @access public
 */
const getAllAuthors = asynchandler(async (req, res) => {
    const authorsList = await Author.find().sort({ name: 1 });
    res.status(200).json(authorsList);
});

/**
 * @doc    get author by id
 * @path   /api/authors/:id
 * @method GET
 * @access public
 */
const getAuthorById = asynchandler(async (req, res) => {
    const author = await Author.findById(req.params.id).select("name");
    if (author) {
        res.status(200).json(author);
    } else {
        res.status(404).json({ message: "author not found" });
    }
});

/**
 * @doc    create a new author
 * @path   /api/authors
 * @method POST
 * @access private (admin)
 */
const createAuthor = asynchandler(async (req, res) => {
    const { error } = ValidateCreateauthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const author = new Author({
        name: req.body.name.trim(),
        lastName: req.body.lastName.trim(),
        fatherName: req.body.fatherName,
    });

    const result = await author.save();
    res.status(201).json(result);
});

/**
 * @doc    update an existing author
 * @path   /api/authors/:id
 * @method PUT
 * @access private (admin)
 */
const updateAuthor = asynchandler(async (req, res) => {
    const { error } = ValidateUpdateauthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const author = await Author.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name: req.body.name,
                lastName: req.body.lastName,
                fatherName: req.body.fatherName,
            },
        },
        { new: true }
    );

    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
});

/**
 * @doc    delete author
 * @path   /api/authors/:id
 * @method DELETE
 * @access private (admin)
 */
const deleteAuthor = asynchandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "delete successful" });
    } else {
        res.status(404).json({ message: "author not found" });
    }
});

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};

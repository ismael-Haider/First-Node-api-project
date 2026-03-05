const express = require("express");
const router = express.Router();
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
    updateUser,
    getAllUser,
    getUserById,
    DeleteUser,
} = require("../controllers/userController");

// admin only
router.get("/", verifyTokenAndAdmin, getAllUser);

router
    .route("/:id")
    .get(verifyTokenAndAuthorization, getUserById)
    .put(verifyTokenAndAuthorization, updateUser)
    .delete(verifyTokenAndAuthorization, DeleteUser);

module.exports = router;

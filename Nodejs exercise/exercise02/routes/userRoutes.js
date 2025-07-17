const express = require("express")
const { createBook, getBooks, singleBook, deleteBook, updateBook } = require("../controls/booksControls")
const router = express.Router()

// add books
router.post("/create",createBook)

// see all books
router.get("/",getBooks)

// search single book
router.get("/search/:id",singleBook)

// delete book
router.delete("/delete/:id",deleteBook)

// update book
router.put("/update/:id",updateBook)

module.exports = router


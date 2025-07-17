const mongoose = require("mongoose")
const booksShema = mongoose.Schema({
    title:String,
    author:String,
    published:String,
    catgory: []
})


module.exports = mongoose.model("book",booksShema)


const Books = require("../models/booksScem")

const data = new Date()
const fullData = `${data.getFullYear()}:${data.getMonth() < 9 ? `0${data.getMonth()}`:data.getMonth() }:${data.getDate() < 9 ? `0${data.getDate()}`:data.getDate()}`

// create book
exports.createBook = async (req,res)=>{
    const book = new Books({
        title:req.body.title,
        author:req.body.author,
        published:fullData,
        catgory:req.body.catgory
    })
    const saved = await book.save()
    if(!saved) return res.status(500).send("books not created there is error")
    res.json(saved)
}

// get all books
exports.getBooks = async (req,res)=>{
    const getBooks = await Books.find()
    res.json(getBooks)
}

// get single book
exports.singleBook = async (req,res)=>{
try {
        const {id} = req.params
    const singleBook = await Books.findById(id)
    if(!singleBook) return res.status(500).send(`User ${id} not found`)
    res.json(singleBook)
} catch (error) {
    res.status(500).send("there is error", error)
}
}

// delete book
exports.deleteBook = async (req,res)=>{
   try {
     const {id} = req.params
    const delet = await Books.findByIdAndDelete(id)
    if(delet) return res.status(200).send(`Success this id ${id} was deleted`)
    if(!delet) return res.status(404).send(`user id ${id} not found`)
   } catch (error) {
    res.status(500).send("error delete", error)
   }

}

// update book
exports.updateBook = async (req,res)=>{
    const {id} = req.params
    const updateBok = await Books.findByIdAndUpdate(id,req.body)
    if(!updateBok) return res.status(404).send(`book id ${id} not found`)
    res.status(200).send(`this book id ${id} was updated`)
}


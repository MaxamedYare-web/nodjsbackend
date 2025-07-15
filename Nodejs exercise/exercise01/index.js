
const express = require("express")

const app = express()
const port = 3000

// make json to parse
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Node.js exercise01")
})

app.listen(port,()=>{
    console.log(`service running... https://localhost:${port}` )
})

// create books place
const books = [
    {
        id:1,
        title:"HTML & CSS fundemental",
        author:"Mucaawiye"
    },
    {
        id:2,
        title:"Reactjs for Beginer",
        author:"Zamzam"
    },
    {
        id:3,
        title:"FIGMA UI/UX Design",
        author:"Baarlin"
    },
]

// searching all books
app.get("/books",(req,res)=>{
    res.json(books)
})

// search single book or one book
app.get("/books/:id",(req,res)=>{
    const book = books.find(b => b.id == req.params.id)
    if(!book) return res.status(404).send(`this book and this id ${req.params.id} not found `)
    res.json(book)
    
})

// add new book 
app.post("/books",(req,res)=>{
    const newBook = {
        id:books.length + 1,
        title:req.body.title,
        author:req.body.author
    }
    books.push(newBook)
    res.json(books)
})

//book update
app.put("/books/:id",(req,res)=>{
    const book = books.find(b => b.id == req.params.id)
     book.title = req.body.title,
      book.author =  req.body.author
    res.json(books)
})

// delete single book
app.delete("/books/:id",(req,res)=>{
const deleteBook = books.filter(b => b.id != req.params.id)
res.json(deleteBook)
})



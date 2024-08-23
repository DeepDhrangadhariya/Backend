const express = require("express")
const port = 1002

const app = express()
const db = require("./config/database")
const BookSchema = require("./model/dataSchema")

app.use(express.urlencoded())
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    const data = await BookSchema.find({})
    data ? res.render("index", {data}) : console.log("Data Not Found")
})

app.post("/insert", async (req, res) => {
    const data = await BookSchema.create(req.body)
    data ?  res.redirect('back') : console.log("Data Not Submitted");
})

app.get("/deleteBook", async (req, res) => {
    const deletedBook = await BookSchema.findByIdAndDelete(req.query.id)
    deletedBook ? res.redirect("back") : console.log("Data Not Deleted")
})

app.get("/editBook", async (req, res) => {
    const editData = await BookSchema.findById(req.query.id)
    editData ? res.render("edit", {editData}) : console.log("Data Not Found")
})

app.post("/updateBook", async (req, res) => {
    const updatedBook = await BookSchema.findByIdAndUpdate(req.query.id, req.body)
    updatedBook ? res.redirect("/") : console.log("Data Not Updated")
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server Started On Port ${port}`)
});
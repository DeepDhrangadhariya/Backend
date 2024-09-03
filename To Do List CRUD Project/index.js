const express = require("express")
const port = 1003

const app = express()
const db = require("./config/database")
const ToDoSchema = require("./model/dataSchema")


app.use(express.urlencoded())
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    const data = await ToDoSchema.find({})
    data ? res.render("index", {data}) : console.log("Data Not Found")
})

app.post("/insert", async (req, res) => {
    const data = await ToDoSchema.create(req.body)
    data ? res.redirect("back") : console.log("Data Not Submitted")
})

app.get("/deleteList", async (req, res) => {
    const deletedList = await ToDoSchema.findByIdAndDelete(req.query.id)
    deletedList ? res.redirect("back") : console.log("Data Not Deleted")
})

app.get("/editList", async (req, res) => {
    const editList = await ToDoSchema.findById(req.query.id)
    editList ? res.render("edit", {editList}) : console.log("Data Not Found")
})

app.post("/updateList", async (req, res) => {
    const updatedList = await ToDoSchema.findByIdAndUpdate(req.query.id, req.body)
    updatedList ? res.redirect("/") : console.log("Data Not Updated")
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server Started On Port ${port}`)
})
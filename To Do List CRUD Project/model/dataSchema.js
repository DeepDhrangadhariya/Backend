const mongoose = require("mongoose")

const ToDoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    }
})

const ToDoTable = mongoose.model("List", ToDoSchema)

module.exports = ToDoTable
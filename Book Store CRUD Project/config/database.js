const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/Book_Store")

const db = mongoose.connection

db.once("open", (error) => {
    error ? console.log(error) : console.log("Database Connection Successfull");
})

module.exports = db
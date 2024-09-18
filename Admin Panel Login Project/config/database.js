const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/AdminPanel_Login")

const db = mongoose.connection

db.once("open", (err) => {
    err ? console.log(err) : console.log("Database Connection Successfull")
})

module.exports = db
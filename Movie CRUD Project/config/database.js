const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/MovieCRUD')

const db = mongoose.connection

db.once("open", () => {
    try {
        console.log("Database Conncection Successfull");
    } catch (error) {
        console.log("Error With Database Connection", error)
    }  
})

module.exports = db
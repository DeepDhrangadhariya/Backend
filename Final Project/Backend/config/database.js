const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/Final_Project")
const db = mongoose.connection

db.once("open", () => {
    try {
        console.log("DataBase Connected")
    } catch (error) {
        console.log("DataBase Not Connected, ", error)
    }
})

module.exports = db
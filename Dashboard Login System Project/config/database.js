const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/SeoDashProject")
const db = mongoose.connection
db.once("open", (error) => {
    error ? console.log("DataBase Not Connected, ", error) : console.log("DataBase Connected")
})
module.exports = db
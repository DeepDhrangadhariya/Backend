const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/Nested_Routing_Project")
const db = mongoose.connection
db.once("open", () => {
    try {
        console.log("DataBase Connected To Nested_Routing_Project")
    } catch (error) {
        console.log("Database Error, ", error)
    }
})
module.exports = db
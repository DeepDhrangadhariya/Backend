const mongoose = require("mongoose")
const adminSchema = mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


const adminTable = mongoose.model("admin", adminSchema)
module.exports = adminTable
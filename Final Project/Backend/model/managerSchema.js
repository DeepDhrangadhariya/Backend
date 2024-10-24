const mongoose = require("mongoose")

const managerSchema = mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
})

const managerTable = mongoose.model("manager", managerSchema)

module.exports = managerTable
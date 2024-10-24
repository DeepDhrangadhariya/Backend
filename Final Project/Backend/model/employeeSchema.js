const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
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

const employeeTable = mongoose.model("employee", employeeSchema)

module.exports = employeeTable
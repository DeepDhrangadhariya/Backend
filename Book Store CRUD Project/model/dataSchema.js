const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    image_link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    published_year: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    published_copies: {
        type: Number,
        required: true
    }
})

const bookTable = mongoose.model("Book", BookSchema)

module.exports = bookTable
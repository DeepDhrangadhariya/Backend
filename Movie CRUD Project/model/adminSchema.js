const mongoose =  require("mongoose")

const movieSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
})

const movieTable = mongoose.model("Movie", movieSchema)

module.exports = movieTable
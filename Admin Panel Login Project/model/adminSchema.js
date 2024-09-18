const mongoose = require("mongoose")

const formSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true   
    },
    number : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required :true

    },
    message : {
        type : String,
        required : true
    }
})

const formTable = mongoose.model("form", formSchema)

module.exports = formTable
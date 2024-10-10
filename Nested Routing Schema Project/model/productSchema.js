const mongoose = require("mongoose");

const crud = mongoose.Schema(
    {
        prname : {
            type : String,
            require : true
        },
        subcategoryid :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "subcrud",
            require : true
        },

        categoryid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "category",
            require : true
        },
        image : {
            type : String,
            require : true   
        }
    }
);

const crudtbl = mongoose.model("product",crud)

module.exports = crudtbl
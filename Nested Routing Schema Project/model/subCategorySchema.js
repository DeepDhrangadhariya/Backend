const mongoose = require("mongoose");

const crud = mongoose.Schema(
    {
        subacg : {
            type : String,
            require : true
        },
        categoryid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "category",
            require : true
        }
    }
);

const crudtbl = mongoose.model("subcrud",crud)

module.exports = crudtbl
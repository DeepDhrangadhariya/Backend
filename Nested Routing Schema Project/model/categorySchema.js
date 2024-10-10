const mongoose = require("mongoose");

const crudtab = mongoose.Schema(
    {
        acg : {
            type : String,
            require : true
        },
        image : {
            type : String,
            require : true
        }
    }
);

const crud = mongoose.model("category",crudtab)

module.exports = crud
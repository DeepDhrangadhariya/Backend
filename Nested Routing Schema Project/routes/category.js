const express = require("express");
const routes = express.Router();
const passport = require("passport")
const catctl = require("../controller/catagoryCtrl");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/category/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage}).single('image')

routes.get("/addcat",passport.checkAuth,catctl.addcat)
routes.get("/vcat",passport.checkAuth,catctl.vcat)
routes.post("/insert",upload ,passport.checkAuth,catctl.insert)
routes.get("/deletedataa",passport.checkAuth,catctl.deletedataa)
routes.get("/editdata",passport.checkAuth,catctl.editdata)
routes.post("/updatedataa",upload ,passport.checkAuth,catctl.updatedataa)




module.exports = routes; 
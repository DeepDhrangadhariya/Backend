const express = require("express");
const routes = express.Router();
const passport = require("passport")
const prctl = require("../controller/productCtrl");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/product/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage}).single('image')

routes.get("/addpr",passport.checkAuth,prctl.addpr)
routes.post("/insert",upload,passport.checkAuth,prctl.insert)
routes.get("/vpr",passport.checkAuth,prctl.vpr)
routes.get("/deletedata",passport.checkAuth,prctl.deletedata)
routes.get("/editpr",passport.checkAuth,prctl.editpr)
routes.post("/updatedataa",upload,passport.checkAuth,prctl.updatedataa)

module.exports = routes
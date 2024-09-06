const express = require('express');
const routes = express.Router()
const adminCtl = require("../controller/adminCtl")
const multer = require("multer")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ ' - ' + file.originalname)
    }
})

const uploadPic = multer({ storage: Storage }).single("image")

routes.get("/", adminCtl.index)
routes.get("/form", adminCtl.form)
routes.post("/insert", uploadPic, adminCtl.insert)
routes.get("/delete", adminCtl.delete)
routes.get("/edit", adminCtl.edit)
routes.post("/update", uploadPic , adminCtl.update)

module.exports = routes
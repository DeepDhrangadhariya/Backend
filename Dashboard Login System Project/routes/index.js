const express = require("express")
const routes = express.Router()
const adminCtrl = require("../controller/adminCtrl")
const multer = require("multer")
const passport = require("passport")

const dStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadPic = multer({storage: dStorage}).single("image")

routes.get("/", adminCtrl.login)
routes.get("/logout", passport.checkauth, adminCtrl.logout)
routes.get("/dashboard", passport.checkauth, adminCtrl.dashboard)
routes.get("/addAdmin", passport.checkauth, adminCtrl.addAdmin)
routes.get("/viewAdmin", passport.checkauth, adminCtrl.viewAdmin)
routes.get("/deleteData", passport.checkauth, adminCtrl.deleteData)
routes.get("/editData", passport.checkauth, adminCtrl.editData)

routes.post("/userlogin",passport.authenticate("local",{failureRedirect:"/"}),adminCtrl.userlogin);
routes.post("/insert", passport.checkauth, uploadPic, adminCtrl.insert)
routes.post("/updateData", passport.checkauth, uploadPic, adminCtrl.updateData)

module.exports = routes
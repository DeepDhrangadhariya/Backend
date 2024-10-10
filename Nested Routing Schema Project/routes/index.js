const express = require("express")
const routes = express.Router()
const adminCtrl = require("../controller/adminCtrl")
const multer = require("multer")
const passport = require("passport")

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadPic = multer({ storage: diskStorage }).single("image")


routes.get("/", adminCtrl.loginAdmin)
routes.get("/logOut", passport.checkAuth, adminCtrl.logOut)
routes.get("/dashboard", passport.checkAuth, adminCtrl.dashboard)
routes.get("/addAdmin", passport.checkAuth, adminCtrl.addAdmin)
routes.get("/viewAdmin", passport.checkAuth, adminCtrl.viewAdmin)
routes.get("/deleteData", passport.checkAuth, adminCtrl.deleteData)
routes.get("/editData", passport.checkAuth, adminCtrl.editData)
routes.get("/changePassword", passport.checkAuth, adminCtrl.changePassword)
routes.get("/addcat", passport.checkAuth, adminCtrl.addcat)
routes.get("/fpass",adminCtrl.fpass)

routes.post("/userLogin", passport.authenticate("local", { failureRedirect: "/" }), adminCtrl.userLogin)
routes.post("/newPassword", passport.checkAuth, adminCtrl.newPassword)
routes.post("/insert", passport.checkAuth, uploadPic, adminCtrl.insert)
routes.post("/updateData", passport.checkAuth, uploadPic, adminCtrl.updateData)
routes.post("/checkotp", adminCtrl.checkotp)
routes.post("/forgotpass",adminCtrl.forgotpass)

module.exports = routes
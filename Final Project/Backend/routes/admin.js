const express = require('express');
const routes = express.Router()
const adminCtrl = require("../controller/adminCtrl")
const multer = require("multer")
const adminAuth = require("../config/adminAuth")

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/admin/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const managerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/manager/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const employeeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/employee/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadPic = multer({ storage: diskStorage }).single("image")
const managerPic = multer({ storage: managerStorage }).single("image")
const employeePic = multer({ storage: employeeStorage }).single("image")

routes.get("/viewAdmin", adminAuth, adminCtrl.viewAdmin)
routes.get("/viewManager", adminAuth, adminCtrl.viewManager)
routes.get("/viewEmployee", adminAuth, adminCtrl.viewEmployee)

routes.post("/loginAdmin", adminCtrl.loginAdmin)
routes.post("/addAdmin", uploadPic, adminCtrl.addAdmin)
routes.post("/addManager", adminAuth, managerPic, adminCtrl.addManager)
// routes.post("/addEmployee", adminAuth, employeePic, adminCtrl.addEmployee)
routes.post("/forgotPassword", adminCtrl.forgotPassword)

routes.delete("/deleteAdmin", adminAuth, adminCtrl.deleteAdmin)
routes.delete("/deleteManager", adminAuth, adminCtrl.deleteManager)
// routes.delete("/deleteEmployee", adminAuth, adminCtrl.deleteEmployee)

routes.put("/editAdmin", adminAuth, uploadPic, adminCtrl.editAdmin)
routes.put("/editManager", adminAuth, managerPic, adminCtrl.editManager)
// routes.put("/editEmployee", adminAuth, employeePic, adminCtrl.editEmployee)
routes.put("/changePassword", adminAuth, adminCtrl.changePassword)
routes.put("/checkOtp", adminCtrl.checkOtp)

module.exports = routes
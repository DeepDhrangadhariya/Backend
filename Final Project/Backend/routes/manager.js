const express = require('express');
const routes = express.Router()
const managerCtrl = require("../controller/managerCtrl")
const multer = require("multer")
const managerAuth = require("../config/managerAuth")

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

const managerPic = multer({ storage: managerStorage }).single("image")
const employeePic = multer({ storage: employeeStorage }).single("image")

routes.get("/viewManager", managerAuth, managerCtrl.viewManager)
routes.get("/viewEmployee", managerAuth, managerCtrl.viewEmployee)

routes.post("/loginManager", managerCtrl.loginManager)
// routes.post("/addManager", managerPic, managerCtrl.addManager)
routes.post("/addEmployee", managerAuth, employeePic, managerCtrl.addEmployee)
routes.post("/forgotPassword", managerCtrl.forgotPassword)

// routes.delete("/deleteManager", managerAuth, managerCtrl.deleteManager)
routes.delete("/deleteEmployee", managerAuth, managerCtrl.deleteEmployee)

// routes.put("/editManager", managerAuth, managerPic, managerCtrl.editManager)
routes.put("/editEmployee", managerAuth, employeePic, managerCtrl.editEmployee)
routes.put("/changePassword", managerAuth, managerCtrl.changePassword)
routes.put("/checkOtp", managerCtrl.checkOtp)

module.exports = routes
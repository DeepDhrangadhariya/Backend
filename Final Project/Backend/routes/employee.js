const express = require('express');
const routes = express.Router()
const employeeCtrl = require("../controller/employeeCtrl")
const multer = require("multer")
const employeeAuth = require("../config/employeeAuth")

const employeeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/employee/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const employeePic = multer({ storage: employeeStorage }).single("image")

routes.get("/viewEmployee", employeeAuth, employeeCtrl.viewEmployee)

routes.post("/loginEmployee", employeeCtrl.loginEmployee)
// routes.post("/addEmployee", employeePic, employeeCtrl.addEmployee)
routes.post("/forgotPassword", employeeCtrl.forgotPassword)

// routes.delete("/deleteEmployee", employeeAuth, employeeCtrl.deleteEmployee)

// routes.put("/editEmployee", employeeAuth, employeePic, employeeCtrl.editEmployee)
routes.put("/changePassword", employeeAuth, employeeCtrl.changePassword)
routes.put("/checkOtp", employeeCtrl.checkOtp)

module.exports = routes
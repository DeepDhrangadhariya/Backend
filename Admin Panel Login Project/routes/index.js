const express = require("express");
const routes = express.Router();

const adminCtrl = require("../controller/adminCtrl");

routes.get("/", adminCtrl.loginAdmin)
routes.post("/userlogin",adminCtrl.userlogin)
routes.get("/logout",adminCtrl.logout)
routes.get("/dashboard",adminCtrl.dashboard)
routes.get("/addAdmin",adminCtrl.addAdmin)
routes.get("/viewAdmin",adminCtrl.viewAdmin)
routes.post("/insert",adminCtrl.insert)
routes.get("/deletedata",adminCtrl.deletedata)
routes.get("/editdata",adminCtrl.editdata)
routes.post("/updatedata",adminCtrl.updatedata)

module.exports = routes; 
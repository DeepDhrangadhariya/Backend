
const express = require("express");
const routes = express.Router();
const passport = require("passport")
const subctl = require("../controller/subCategoryCtrl");

routes.get("/addsubcat",passport.checkAuth,subctl.addsubcat)
routes.post("/subinsert",passport.checkAuth,subctl.subinsert)
routes.get("/vsubcat",passport.checkAuth,subctl.vsubcat)
routes.get("/deletedata",passport.checkAuth,subctl.deletedata)
routes.get("/editdata",passport.checkAuth,subctl.editdata)
routes.post("/updatedataa",passport.checkAuth,subctl.updatedataa)


module.exports = routes

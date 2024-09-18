const adminSchema = require("../model/adminSchema");

module.exports.loginAdmin = (req, res) => {
    try {
        res.render("loginAdmin");
    } catch (error) {
        console.log("Error On rendering LoginAdmin page ", error);
    }
};


module.exports.userlogin=async(req,res)=>{
    console.log(req.body)
    let user = await adminSchema.findOne({email : req.body.email})
    console.log(user);
    
    if(user){
        if(user.password == req.body.password){
            res.cookie("adminData",user)
            res.redirect("/dashboard")
        }
        else{
            console.log("user not found");
            return res.redirect("/")
        }
    }
    else{
        console.log("user not found");
        return res.redirect("/")
    }
}

module.exports.logout=async(req,res)=>{
    res.clearCookie("adminData");
    res.redirect("/")
}

module.exports.dashboard = async (req, res) => {
    try {
        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await adminSchema.findById(req.cookies.adminData._id)
            console.log(admindata);
            if(admindata){
                res.render("dashboard")
            }else{
                res.redirect("/")
            }
            
        }
    } catch (error) {
        console.log("Error On rendering Dashboard ", error);
    }
};

module.exports.addAdmin = async (req, res) => {
    try {

        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await adminSchema.findById(req.cookies.adminData._id)
            if(admindata){
                res.render("addAdmin");
            }
            else{
                res.redirect("/")
            }
        }
    } catch (error) {
        console.log("Error On rendering AddAdmin ", error);
    }
};

module.exports.viewAdmin = async (req, res) => {
    try {

        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await adminSchema.findById(req.cookies.adminData._id)
            if(admindata){
                let data = await adminSchema.find({});
                if (data) {
                    res.render("viewAdmin", { data });
                } else {
                    console.log("Data not found");
                }            }
                else{
                    res.redirect("/")
                }
        }
    } catch (error) {
        console.log("Error On rendering ViewAdmin ", error);
    }
};

module.exports.insert = async (req, res) => {
    try {

        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await adminSchema.findById(req.cookies.adminData._id)
            if(admindata){
                let data = await adminSchema.create(req.body);
                if (data) {
                    res.redirect("viewAdmin");
                } else {
                    console.log("Data not submitted");
                }            }
                else{
                    res.redirect("/")
                }
        }
    } catch (error) {
        console.log("Error On rendering AddAdmin ", error);
    }
};

module.exports.deletedata = async (req, res, next) => {
    try {
        const id = req.query.id;
        let deletedData = await adminSchema.findByIdAndDelete(id);
        if (deletedData) {
            res.redirect("back");
        } else {
            console.log("Data not deleted");
        }
    } catch (err) {
        console.log("Error deleting data ", err);
        next(err); 
    }
};

module.exports.editdata = async (req, res) => {
    try {
        let editdata = await adminSchema.findById(req.query.id);
        if (editdata) {
            res.render("edit", { editdata });
        } else {
            console.log("Data not found");
        }
    } catch (error) {
        console.log("Error retrieving data ", error);
    }
};

module.exports.updatedata = async (req, res) => {
    try {

        if(req.cookies.adminData == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await adminSchema.findById(req.cookies.adminData._id)
            if(admindata){
                let updateData = await adminSchema.findByIdAndUpdate(req.query.id, req.body);
                if (updateData) {
                    res.redirect("viewAdmin");
                } else {
                    console.log("Data not updated");
                }         }
                else{
                    res.redirect("/")
                }
        }
    } catch (error) {
        console.log("Error rendering AddAdmin ", error);
    }
};

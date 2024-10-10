const adminSchema = require("../model/adminShema")
// const passwordSchema = require("../model/passwordSchema")
const path = require("path")
const fs = require("fs")
const mailer = require("../config/mailer");

module.exports.loginAdmin = (req, res) => {
    try {
        res.render("loginAdmin")
    } catch (error) {
        console.log("Error On Rendering LoginAdmin, ", error)
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        res.redirect("/dashboard")
        req.flash("success","login successfully")
    } catch (error) {
        console.log("Login Error, ", error)
    }
}

module.exports.logOut = (req, res) => {
        req.session.destroy((err) => {
            err ? console.log(err) : res.redirect("/")
        })
}

module.exports.changePassword = (req, res) => {
    try {
        res.render("changePassword")
    } catch (error) {
        console.log("Error On Rendering ChangePassword, ", error)
    }
}

module.exports.newPassword = async (req, res) => {
    const user = await adminSchema.findById(req.user.id)
    if (user) {
        if (req.body.oldPassword == user.password) {
            if (req.body.oldPassword != req.body.newPassword) {
                if (req.body.newPassword == req.body.confirmPassword) {
                    const newPassword = await adminSchema.findByIdAndUpdate(user.id, { password: req.body.newPassword })
                    newPassword ? res.redirect("/logOut") : console.log("Password Not Changed")
                } else {
                    console.log("NewPassword And ConfirmPassword Not Matched")
                    res.redirect("/changePassword")
                }
            } else {
                console.log("OldPassword And NewPassword Are Same")
                res.redirect("/changePassword")
            }
        } else {
            console.log("OldPassword Is Wrong")
            res.redirect("/changePassword")
        }
    } else {
        console.log("User Not Found")
        res.redirect("/changePassword")
    }
}

module.exports.fpass=(req,res)=>{
    res.render("fpass")
}

module.exports.forgotpass = async (req,res)=>{
    let admindata = await adminSchema.findOne({email : req.body.email});
    if(!admindata){
        return res.redirect("/");
    }
    let otp = Math.floor(Math.random() * 100000 + 90000);
    mailer.sendotp(req.body.email,otp);
    req.session.otp = otp
    req.session.adminId = admindata.id;

    res.render("newpass");;
}

module.exports.checkotp = async (req, res) => {
    let otp = req.session.otp;
    let adminId = req.session.adminId;
  
    if (req.body.otp = otp) {
        if (req.body.newpass == req.body.copass) {
            let changeauth = await adminSchema.findByIdAndUpdate(adminId, { password: req.body.newpass })

            changeauth && res.redirect("/")
        }
        
        else {
            res.redirect("/")
        }
    }
    else {
        res.redirect("/")
    }
}

module.exports.addcat=async(req,res)=>{
    res.render("addcat")
}

module.exports.dashboard = (req, res) => {
    try {
        res.render("dashboard")
    } catch (error) {
        console.log("Error On Rendering Dashboard, ", error)
    }
}

module.exports.addAdmin = (req, res) => {
    try {
        res.render("addAdmin")
    } catch (error) {
        console.log("Error On Rendering AddAdmin, ", error)
    }
}

module.exports.viewAdmin = async (req, res) => {
    try {
        const formData = await adminSchema.find({})
        if (formData) {
            try {
                res.render("viewAdmin", {formData})
            } catch (error) {
                console.log("Data Not Found")
            }
        }
    } catch (error) {
        console.log("Error On Rendering ViewAdmin, ", error)
    }
}

module.exports.insert = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        await adminSchema.create(req.body)
        res.redirect("/addAdmin")
    } catch (error) {
        console.log("Data Not Submited, ", error)
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        const imageData = await adminSchema.findById(req.query.id)
        if (imageData.image) {
            const oldImage = path.join(__dirname, "../uploads/", imageData.image)
                fs.unlinkSync(oldImage)
        }
        await adminSchema.findByIdAndDelete(req.query.id)
        res.redirect("/viewAdmin")
    } catch (error) {
        console.log("Data Not Deleted, ", error)
    }
}

module.exports.editData = async (req, res) => {
    try {
        const formData = await adminSchema.findById(req.query.id)
        if (formData) {
            try {
                res.render("editAdmin", {formData})
            } catch (error) {
                console.log("Data Not Found")
            }
        }
    } catch (error) {
        console.log("Error On Rendering EditAdmin, ", error)
    }
}

module.exports.updateData = async (req, res) => {
    try {
        const imageData = await adminSchema.findById(req.query.id)
        if (req.file) {
            if (imageData.image) {
                const oldImage = path.join(__dirname, "../uploads/", imageData.image)
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage)
                }
            }
            req.body.image = req.file.filename
        } else {
            req.body.image = imageData.imagez``
        }
        await adminSchema.findByIdAndUpdate(req.query.id, req.body)
        res.redirect("/viewAdmin")
    } catch (error) {
        console.log("Data Not Updated, ", error)
    }
}
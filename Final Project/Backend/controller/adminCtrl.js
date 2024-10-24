const adminSchema = require("../model/adminSchema")
const managerSchema = require("../model/managerSchema")
const employeeSchema = require("../model/employeeSchema")
const path = require("path")
const fs = require("fs")
const bcrypt = require("bcryptjs")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const mailer = require("../config/nodemailer")

module.exports.loginAdmin = async (req, res) => {
     try {
        const user = await adminSchema.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({ adminData: user }, "admin", { expiresIn: "1h" })
                res.status(200).json({ message: "Login Success", token: token })
            } else {
                res.status(400).json({ message: "Invalid Email Or Password" })
            }
        } else {
            res.status(400).json({ message: "User Not Found" })
        }
     } catch (error) {
        res.status(400).json({ message: "Login Error", error: error })
        console.log("Login Error", error)
     }
}

module.exports.changePassword = async (req, res) => {
    try {
        const user = await adminSchema.findById(req.query.id)
        if (user) {
            let oldPassword = req.body.oldPassword
            let newPassword = req.body.newPassword
            let confirmPassword = req.body.confirmPassword

            if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                if (oldPassword != newPassword) {
                    if (newPassword == confirmPassword) {
                        newPassword = await bcrypt.hash(newPassword, 10)
                        const passwordUpdate = await adminSchema.findByIdAndUpdate(user.id, { password: newPassword })
                        if (passwordUpdate) {
                            res.status(200).json({ message: "Password Changed" })
                        }
                    } else {
                        res.status(400).json({ message: "Password Not Match" })
                    }
                } else {
                    res.status(400).json({ message: "Old Password And New Password Are Same" })
                }
            } else {
                res.status(400).json({ message: "Old Password Not Match" })
            }
        } else {
            res.status(400).json({ message: "User Not Found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Password Not Changed", error: error })
        console.log("Password Not Changed, ", error)
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        let user = await adminSchema.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: "User Not Found" })
        }
        let otp = Math.floor(Math.random() * 100000 + 900000)
        mailer.sendOtp(req.body.email, otp)
        req.session.otp = otp
        req.session.userId = user.id

        res.status(200).json({ message: "Otp Send" })
    } catch (error) {
        res.status(400).json({ message: "Otp Not Send", error: error })
        console.log("Otp Not Send, ", error)
    }
}

module.exports.checkOtp = async (req, res) => {
    try {
        let otp = req.session.otp
        let userId = req.session.userId

        if (req.body.otp == otp) {
            if (req.body.newPassword == req.body.confirmPassword) {
                let newPassword = await bcrypt.hash(req.body.newPassword, 10)
                let changePassword = await adminSchema.findByIdAndUpdate(userId, { password: newPassword })
                if (changePassword) {
                    res.status(200).json({ message: "Password Changed" })
                }
            } else {
                res.status(400).json({ message: "Password Not Match" })
            }
        } else {
            res.status(400).json({ message: "Otp Not Match" })
        }
    } catch (error) {
        res.status(400).json({ message: "Password Not Changed", error: error })
        console.log("Password Not Changed, ", error)
    }
}

module.exports.addAdmin = async (req, res) => {
    try {
        let user = await adminSchema.findOne({ email: req.body.email })
        if (user) {
            res.status(300).json({ message: "Admin Already Exixts." })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAt = moment().format('LLLL')

        if (req.file) {
            req.body.image = req.file.filename
        }

        const data = await adminSchema.create(req.body)
        res.status(200).json({ message: "Admin Added", data: data })
    } catch (error) {
        res.status(400).json({ message: "Admin Not Added", error: error })
        console.log("Admin Not Added, ", error)
    }
}

module.exports.addManager = async (req, res) => {
    try {
        let manager = await managerSchema.findOne({ email: req.body.email })
        if (manager) {
            res.status(300).json({ message: "Manager Already Exixts." })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAt = moment().format('LLLL')

        if (req.file) {
            req.body.image = req.file.filename
        }

        const data = await managerSchema.create(req.body)
        res.status(200).json({ message: "Manager Added", data: data })
    } catch (error) {
        res.status(400).json({ message: "Manager Not Added", error: error })
        console.log("Manager Not Added, ", error)
    }
}

module.exports.addEmployee = async (req, res) => {
    try {
        let employee = await employeeSchema.findOne({ email: req.body.email })
        if (employee) {
            res.status(300).json({ message: "Employee Already Exixts." })
        }

        req.body.passwword = await bcrypt.hash(req.body.password, 10)
        req.body.createdAt = moment().format('LLLL')

        if (req.file) {
            req.body.image = req.file.filename
        }

        const data = await employeeSchema.create(req.body)
        res.status(200).json({ message: "Employee Added", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Added", error })
        console.log("Employee Not Added, ", error)
    }
}

module.exports.viewAdmin = async (req, res) => {
    try {
        const data = await adminSchema.find({})
        res.status(200).json({ message: "Admin Data Found", data: data })
    } catch (error) {
        res.status(400).json({ message: "Admin Data Not Found", error: error })
        console.log("Admin Data Not Found, ", error)
    }
}

module.exports.viewManager = async (req, res) => {
    try {
        const data = await managerSchema.find({})
        res.status(200).json({ message: "Manager Data Found", data: data })
    } catch (error) {
        res.status(400).json({ message: "Manager Data Not Found", error: error })
        console.log("Manager Data Not Found, ", error)
    }
}

module.exports.viewEmployee = async (req, res) => {
    try {
        const data = await employeeSchema.find({})
        res.status(200).json({ message: "Employee Data Found", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Data Not Found", data: data })
        console.log("Employee Data Not Found, ", error)
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const imageData = await adminSchema.findById(req.query.id)
        if (imageData.image) {
            const oldImage = path.join(__dirname, "../uploads/admin/", imageData.image)
            fs.unlinkSync(oldImage)
        }
        const data = await adminSchema.findByIdAndDelete(req.query.id)
        res.status(200).json({ message: "Admin Deleted" })
    } catch (error) {
        res.status(400).json({ message: "Admin Not Deleted", error: error })
        console.log("Admin Not Deleted, ", error)
    }
}

module.exports.deleteManager = async (req, res) => {
    try {
        const imageData = await managerSchema.findById(req.query.id)
        if (imageData.image) {
            const oldImage = path.join(__dirname, "../uploads/manager/", imageData.image)
            fs.unlinkSync(oldImage)
        }
        const data = await managerSchema.findByIdAndDelete(req.query.id)
        res.status(200).json({ message: "Manager Deleted" })
    } catch (error) {
        res.status(400).json({ message: "Manager Not Deleted", error: error })
        console.log("Manager Not Deleted, ", error)
    }
}

module.exports.deleteEmployee = async (req, res) => {
    try {
        const imageData = await employeeSchema.findById(req.query.id)
        if (imageData.image) {
            const oldImage = path.join(__dirname, "../uploads/employee/", imageData.image)
            fs.unlinkSync(oldImage)
        }
        const data = await employeeSchema.findByIdAndDelete(req.query.id)
        res.status(200).json({ message: "Employee Deleted" })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Deleted", error: error })        
        console.log("Employee Not Deleted, ", error)
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        const imageData = await adminSchema.findById(req.query.id)
        if (req.file) {
            if (imageData.image) {
                const oldImage = path.join(__dirname, "../uploads/admin/", imageData.image)
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage)
                }
            }
            req.body.image = req.file.filename
        } else {
            req.body.image = imageData.image
        }

        if (req.body.password) {
            let oldPassword = await bcrypt.compare(req.body.password, imageData.password)
            if (!oldPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } else {
                req.body.password = imageData.password
            }
        } else {
            req.body.password = imageData.password
        }

        const data = await adminSchema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ message: "Admin Edited", data: data })
    } catch (error) {
        res.status(400).json({ message: "Admin Not Edited", error: error })
        console.log("Admin Not Edited, ", error)
    }
}

module.exports.editManager = async (req, res) => {
    try {
        const imageData = await managerSchema.findById(req.query.id)
        if (req.file) {
            if (imageData.image) {
                const oldImage = path.join(__dirname, "../uploads/manager/", imageData.image)
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage)
                }
            }
            req.body.image = req.file.filename
        } else {
            req.body.image = imageData.image
        }

        if (req.body.password) {
            let oldPassword = await bcrypt.compare(req.body.password, imageData.password)
            if (!oldPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } else {
                req.body.password = imageData.password
            }
        } else {
            req.body.password = imageData.password
        }

        const data = await managerSchema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ message: "Manager Edited", data: data })
    } catch (error) {
        res.status(400).json({ message: "Manager Not Edited", error: error })
        console.log("Manager Not Edited, ", error)
    }
}

module.exports.editEmployee = async (req, res) => {
    try {
        const imageData = await employeeSchema.findById(req.query.id)
        if (req.file) {
            if (imageData.image) {
                const oldImage = path.join(__dirname, "../uploads/employee/", imageData.image)
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage)
                }
            }
            req.body.image = req.file.filename
        } else {
            req.body.image = imageData.image
        }

        if (req.body.password) {
            let oldPassword = await bcrypt.compare(req.body.password, imageData.password)
            if (!oldPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } else {
                req.body.password = imageData.password
            }
        } else {
            req.body.password = imageData.password
        }

        const data = await employeeSchema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ message: "Employee Edited", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Edited", error: error })
        console.log("Employee Not Edited, ", error)
    }
}
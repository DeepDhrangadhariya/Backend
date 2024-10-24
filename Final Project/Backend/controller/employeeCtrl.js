const employeeSchema = require("../model/employeeSchema")
const path = require("path")
const fs = require("fs")
const bcrypt = require("bcryptjs")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const mailer = require("../config/nodemailer")

module.exports.loginEmployee = async (req, res) => {
    try {
        let user = await employeeSchema.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({ employeeData: user }, "employee", { expiresIn: "1h" })
                res.status(200).json({ message: "Login Success", token: token })
            } else {
                res.status(401).json({ message: "Invalid Password" })
            }
        } else {
            res.status(404).json({ message: "Employee Not Found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Login Error", error: error })
        console.log("Login Error, ", error)
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const user = await employeeSchema.findById(req.query.id)
        if (user) {
            let oldPassword = req.body.oldPassword
            let newPassword = req.body.newPassword
            let confirmPassword = req.body.confirmPassword
    
            if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                if (oldPassword != newPassword) {
                    if (newPassword == confirmPassword) {
                        newPassword = await bcrypt.hash(newPassword, 10)
                        const changePassword = await employeeSchema.findByIdAndUpdate(user.id, { password: newPassword })
                        if (changePassword) {
                            res.status(200).json({ message: "Password Changed Successfully" })
                        }
                    } else {
                        res.status(400).json({ message: "Confirm Password Does Not Match" })
                    }
                } else {
                    res.status(400).json({ message: "Old and New Password Should Be Different" })
                }
            } else {
                res.status(400).json({ message: "Old Password Does Not Match" })
            }
        } else {
            res.status(404).json({ message: "Employee Not Found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Password Not Changed", error: error })
        console.log("Password Not Changed, ", error)
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        let user = await employeeSchema.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: "Employee Not Found" })
        }

        let otp = Math.floor(Math.random() * 100000 + 900000)
        mailer.sendOtp(req.body.email, otp)
        req.session.otp = otp
        req.session.employeeId = user.id

        res.status(200).json({ message: "Otp Send" })
    } catch (error) {
        res.status(400).json({ message: "Otp Not Send", error: error })
        console.log("Otp Not Send, ", error)
    }
}

module.exports.checkOtp = async (req, res) => {
    try {
        let otp = req.session.otp
        let employeeId = req.session.employeeId

        if (req.body.otp == otp) {
            if (req.body.newPassword == req.body.confirmPassword) {
                let newPassword = await bcrypt.hash(req.body.newPassword, 10)
                let changePassword = await employeeSchema.findByIdAndUpdate(employeeId, { password: newPassword })
                if (changePassword) {
                    res.status(200).json({ message: "Password Changed Successfully" })
                }
            } else {
                res.status(400).json({ message: "Confirm Password Does Not Match" })
            }
        } else {
            res.status(400).json({ message: "Otp Does Not Match" })
        }
    } catch (error) {
        res.status(400).json({ message: "Password Not Changed", error: error })
        console.log("Password Not Changed, ", error)
    }
}

module.exports.addEmployee = async (req, res) => {
    try {
        let user = await employeeSchema.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ message: "Employee Already Exist" })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAt = moment().format("LLLL")

        if (req.file) {
            req.body.image = req.file.filename
        }

        const data = await employeeSchema.create(req.body)
        res.status(200).json({ message: "Employee Added", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Added", error: error })
        console.log("Employee Not Added, ", error)
    }
}

module.exports.viewEmployee = async (req, res) => {
    try {
        const data = await employeeSchema.find({})
        res.status(200).json({ message: "Employee Data Found", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Data Not Found", error: error })
        console.log("Employee Data Not Found, ", error)
    }
}

module.exports.deleteEmployee = async (req, res) => {
    try {
        const employeeData = await employeeSchema.findById(req.query.id)
        if (employeeData.image) {
            const oldImage = path.join(__dirname, "../uploads/employee/", employeeData.image)
            fs.unlinkSync(oldImage)
        }
    
        const data = await employeeSchema.findByIdAndDelete(req.query.id)
        res.status(200).json({ message: "Employee Deleted" })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Deleted", error: error })
        console.log("Employee Not Deleted, ", error)
    }
}

module.exports.editEmployee = async (req, res) => {
    try {
        const employeeData = await employeeSchema.findById(req.query.id)
        if (req.file) {
            if (employeeData.image) {
                const oldImage = path.join(__dirname, "../uploads/employee/", employeeData.image)
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage)
                }
            }
            req.body.image = req.file.filename
        } else {
            res.body.image = employeeData.image
        }

        if (req.body.password) {
            let oldPassword = await bcrypt.compare(req.body.password, employeeData.password)
            if (!oldPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } else {
                req.body.password = employeeData.password
            }
        } else {
            req.body.password = employeeData.password
        }

        const data = await employeeSchema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ message: "Employee Edited", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Edited", error: error })
        console.log("Employee Not Edited, ", error)
    }
}
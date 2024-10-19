const managerSchema = require("../model/managerSchema")
const employeeSchema = require("../model/employeeSchema")
const path = require("path")
const fs = require("fs")
const bcrypt = require("bcryptjs")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const mailer = require("../config/nodemailer")

module.exports.loginManager = async (req, res) => {
    try {
        let user = await managerSchema.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                let token = jwt.sign({ managerData: user }, "manager", { expiresIn: "1h" })
                res.status(200).json({ message: "Login Success", token: token })
            } else {
                res.status(400).json({ message: "Invalid Password" })
            }
        } else {
            res.status(400).json({ message: "Manager Not Found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Login Error", error: error })
        console.log("Login Error, ", error)
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const user = await managerSchema.findById(req.query.id)
        if (user) {
            let oldPassword = req.body.oldPassword
            let newPassword = req.body.newPassword
            let confirmPassword = req.body.confirmPassword

            if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                if (oldPassword != newPassword) {
                    if (newPassword == confirmPassword) {
                        newPassword = await bcrypt.hash(newPassword, 10)
                        const passwordUpdate = await managerSchema.findByIdAndUpdate(user.id, { password: newPassword })
                        if (passwordUpdate) {
                            res.status(200).json({ message: "Password Changed" })
                        }
                    } else {
                        res.status(400).json({ message: "New Password And ConfirmPassword Not Matched" })
                    }
                } else {
                    res.status(400).json({ message: "Old Password And New Password Are Same" })
                }
            } else {
                res.status(400).json({ message: "Old Password Not Matched" })
            }
        } else {
            res.status(400).json({ message: "Manager Not Found" })
        }
    } catch (error) {
        res.status(400).json({ message: "Password Not Changed", error: error })
        console.log("Password Not Changed, ", error)   
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        let user = await managerSchema.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({ message: "Manager Not Found" })
        }
        let otp = Math.floor(Math.random() * 100000 + 900000)
        mailer.sendOtp(req.body.email, otp)
        req.session.otp = otp
        req.session.managerId = user.id

        res.status(200).json({ message: "Otp Send" })
    } catch (error) {
        res.status(400).json({ message: "Otp Not Send", error: error })
        console.log("Otp Not Send, ", error)
    }
}

module.exports.checkOtp = async (req, res) => {
    try {
        let otp = req.session.otp
        let managerId = req.session.managerId
    
        if (req.body.otp == otp) {
            if (req.body.newPassword == req.body.confirmPassword) {
                let newPassword = await bcrypt.hash(req.body.newPassword, 10)
                let changePassword = await managerSchema.findByIdAndUpdate(managerId, { password: newPassword })
    
                if (changePassword) {
                    res.status(200).json({ message: "Password Changed" })
                }
            } else {
                res.status(400).json({ message: "New Password And ConfirmPassword Not Matched" })
            }
        } else {
            res.status(400).json({ message: "Otp Not Matched" })
        }
    } catch (error) {
        res.status(400).json({ message: "Password Not Changed", error: error })
        console.log("Password Not Changed, ", error)
    }
}

module.exports.addManager = async (req, res) => {
    try {
        let user = await managerSchema.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ message: "Manager Already Exist" })
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
        let user = await employeeSchema.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ message: "Employee Already Exist" })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAt = moment().format('LLLL')

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

module.exports.viewManager = async (req, res) => {
    try {
        let data = await managerSchema.find({})
        res.status(200).json({ message: "Manager Data Found", data: data })
    } catch (error) {
        res.status(400).json({ message: "Manager Data Not Found", error: error })
        console.log("Manager Data Not Found, ", error)
    }
}

module.exports.viewEmployee = async (req, res) => {
    try {
        let data = await employeeSchema.find({})
        res.status(200).json({ message: "Employee Data Found", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Data Not Found", error: error })
        console.log("Employee Data Not Found, ", error)
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
        res.status(400).json({ message: "Employee Not Deleted", error: error})
        console.log("Employee Not Deleted, ", error)
    }
}

module.exports.editManager = async (req, res) => {
    try {
        const managerData = await managerSchema.findById(req.query.id)
        if (req.file) {
            if (managerData.image) {
                const oldImage = path.join(__dirname, "../uploads/manager/", managerData.image)
                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage)
                }
            }
            req.body.image = req.file.filename
        } else {
            req.body.image = managerData.image
        }

        if (req.body.password) {
            let oldPassword = await bcrypt.compare(req.body.password, managerData.password)
            if (!oldPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } else {
                req.body.password = managerData.password
            }
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
            req.body.image = employeeData.image
        }

        if (req.body.password) {
            let oldPassword = await bcrypt.compare(req.body.password, employeeData.password)
            if (!oldPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            } else {
                req.body.password = employeeData.password
            }
        }

        const data = await employeeSchema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ message: "Employee Edited", data: data })
    } catch (error) {
        res.status(400).json({ message: "Employee Not Edited", error: error })
        console.log("Employee Not Edited, ", error)
    }
}
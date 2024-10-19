const nodeMailer = require("nodemailer")

const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "deepgajjar008@gmail.com",
        pass: "bvrnuycddtavmiht"
    }
})

module.exports.sendOtp = (to, otp) => {
    let mailOption = {
        from: "deepgajjar008@gmail.com",
        to: to,
        subject: "Your OTP",
        text: `Your Otp Is ${otp}`
    }

    transport.sendMail(mailOption, (err) => {
        err && console.log(err)
    })
}
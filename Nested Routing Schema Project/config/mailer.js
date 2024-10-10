const nodemailer = require("nodemailer");

const trasnsport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "deepgajjar008@gmail.com",
        pass : "rjuecmojsbitnvey"
    }
})
module.exports.sendotp = (to,otp)=>{
    let mailoption ={
        from : "deepgajjar008@gmail.com",
        to : to,
        subjet : "Your otp",
        text : `your otp is ${otp}`
    }
    trasnsport.sendMail(mailoption,(err)=>{
        err && console.log(err);
    })
}
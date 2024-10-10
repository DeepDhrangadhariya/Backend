const express = require("express")
const port = 1019
const app = express()
const db = require("./config/database")
const path = require("path")
const sesstion = require("express-session")
const passport = require("passport")
const localSt = require("./config/passport")
const flashconnect = require("connect-flash");
const connectflash = require("./config/connectFlash");

app.use(express.urlencoded())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(express.static(path.join(__dirname, 'uploads/category')))
app.use(express.static(path.join(__dirname, 'uploads/product')))

app.use(sesstion({
    name: "demo",
    secret: "keyboard",
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 100 * 100 * 60}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthUser)
app.use(flashconnect())
app.use(connectflash.setflash)

app.use("/", require("./routes/index"))
app.use("/category",require("./routes/category"))
app.use("/subcategory",require("./routes/subcategory"))
app.use("/product",require("./routes/product"))

app.listen(port, () => {
    try {
        console.log(`Server Started On Port ${port}!`)
    } catch (error) {
        console.log("Server Error, ", error)
    }
})
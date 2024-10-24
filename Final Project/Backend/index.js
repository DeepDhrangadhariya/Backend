const express = require('express');
const port = 1024
const app = express()
const db = require("./config/database")
const path = require("path")
const session = require("express-session")
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors({
    origin: 'http://localhost:3000', // React app's URL
    credentials: true,
  }));

app.use(express.urlencoded())
app.use(express.json())
app.use(bodyParser.json())
app.use("/uploads/admin", express.static(path.join(__dirname, "uplods/admin")))
app.use("/uploads/manager", express.static(path.join(__dirname, "uploads/manager")))
app.use("/uploads/employee", express.static(path.join(__dirname, "uploads/employee")))

app.use(session({
    name: "demo",
    secret: "keyboard",
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 100 * 100 * 60}
}))

app.use("/", require("./routes/index"))

app.listen(port, () => {
    try {
        console.log("Server Started On Port " + port)
    } catch (error) {
        console.log("Server Not Started, ", error)
    }
})
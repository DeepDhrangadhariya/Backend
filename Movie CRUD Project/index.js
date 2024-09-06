const express = require("express");
const port = 1007

const app = express()
app.use(express.urlencoded())
app.set("view engine", "ejs")

const path = require("path")
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/public", express.static(path.join(__dirname, "public")))

const db = require("./config/database")

app.use("/", require("./routes"))

app.listen(port, () => {
    try {
        console.log(`Server Started On Port ${port}`);
    } catch (error) {
        console.log("Error On Starting Server", error)
    }
});
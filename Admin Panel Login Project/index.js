const express = require("express");
const port = 1010

const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
const db = require("./config/database")

app.use(cookieParser())
app.use(express.urlencoded())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.use("/", require("./routes/index"))

app.listen(port, () => {
    try {
        console.log(`App listening on port ${port}`);
    } catch (error) {
        console.log(error)
    }
});
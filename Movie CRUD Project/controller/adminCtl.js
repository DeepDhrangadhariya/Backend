const adminSchema = require("../model/adminSchema")
const path = require("path")
const fs = require("fs")


module.exports.index = async (req,res) => {
    const data = await adminSchema.find({})
    try {
        res.render("index", {data})
    } catch (error) {
        console.log("Error On Rendering Index Page", error)
    }
}

module.exports.form = (req, res) => {
    try {
        res.render("form")
    } catch (error) {
        console.log("Error On Rendering Form Page", error)
    }
}

module.exports.insert = async (req, res) => {
    req.body.image = req.file.filename
    const data = await adminSchema.create(req.body)
    try {
         res.redirect('/');
    } catch (error) {
        console.log("Error On Inserting Data", error)
    }
}

module.exports.delete = async (req, res) => {
    try {
        const imgData = await adminSchema.findById(req.query.id)
        const oldImg = path.join(__dirname, "../uploads/", imgData.image)
        fs.unlinkSync(oldImg)
    
        const deletedData = await adminSchema.findByIdAndDelete(req.query.id)
        res.redirect('/')
    } catch (error) {
        console.log("Data Is Not Deleted", error)
    }
}

module.exports.edit = async (req, res) => {
    try {
        const editedData = await adminSchema.findById(req.query.id)
        res.render("edit", {editedData})
    } catch (error) {
        console.log("Error On Rendering Edit Page", error)
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedData = await adminSchema.findById(req.query.id)

        if(req.file){
            if(updatedData.image){
                const oldImg = path.join(__dirname, "../uploads/", updatedData.image)
                if(fs.existsSync(oldImg)){
                    fs.unlinkSync(oldImg)
                }
            }
            req.body.image = req.file.filename
        }
        else{
            req.body.image = updatedData.image
        }

        const finalData = await adminSchema.findByIdAndUpdate(req.query.id, req.body)
        res.redirect("/")
    } catch (error) {
        console.log("Data Not Updated", error)
    }
}
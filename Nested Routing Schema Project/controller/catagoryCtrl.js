const catagory = require("../model/categorySchema");
const fs = require('fs');
const path = require('path');
const mailer = require("../config/mailer");

module.exports.index = (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log("Error rendering index page: ", error);
    }
};

module.exports.addcat = async (req, res) => {
    res.render("addcat");
};

module.exports.vcat = async (req, res) => {
    try {
        let data = await catagory.find({});
        if (data) {
            res.render("vcat", { data });
        } else {
            console.log("Data not found");
        }
    } catch (error) {
        console.log("Error rendering dashboard: ", error);
    }
};

module.exports.insert = async (req, res) => {
    console.log(req.file);

    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        
        
        let data = await catagory.create(req.body);
        if (data) {
            res.redirect("vcat");
        } else {
            console.log("Data not submitted");
        }
    } catch (error) {
        console.log("Error rendering addform: ", error);
    }
};

module.exports.deletedataa = async (req, res, next) => {
    const deleteImage = await catagory.findById(req.query.id);

    if (deleteImage) {
            fs.unlinkSync(deleteImage.image);
    }
    
    const deletedData = await catagory.findByIdAndDelete(req.query.id);
    
    if (deletedData) {
        res.redirect("back");
    } else {
        console.log("Data not deleted");
    }
    } 
   ;

module.exports.editdata = async (req, res) => {
    try {
        const editdata = await catagory.findById(req.query.id);
        
        if (editdata) {
            res.render("editcat", { editdata });
        } else {
            console.log("Data not found");
        }
    } catch (error) {
        console.log("Error retrieving data: ", error);
    }
};

module.exports.updatedataa = async (req, res) => {
    try {


        let img = ""
        const editimage = await catagory.findById(req.query.id);
        req.file ? img = req.file.path : img = editimage.image

        const imgpath=path.join(__dirname,"..",editimage.image)

        
        if(req.file){
            fs.unlinkSync(editimage.image)
        }
        req.body.image = img;

    
            const updateData = await catagory.findByIdAndUpdate(req.query.id, req.body, { new: true });
            
            if (updateData) {
                res.redirect("vcat");
            } else {
                console.log("Data not updated");
            }
        } 
     catch (error) {
        console.log("Error rendering addform: ", error);
     }
};
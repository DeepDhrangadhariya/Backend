const subcatagory = require("../model/subCategorySchema");
const catagory = require("../model/categorySchema")
const product = require("../model/productSchema")
const fs = require('fs');
const path = require('path');


module.exports.addpr = async (req,res)=>{
    let catdata = await catagory.find({});
    let subdata = await subcatagory.find({});
    let data = await catagory.find({});

    res.render("addpr",{catdata,subdata});

}

module.exports.insert = async (req,res)=>{
    req.body.image = req.file.path
    let data = await product.create(req.body);
    data ? res.redirect("vpr") : console.log("can't view category");
}

module.exports.vpr = async (req,res)=>{
  let data = await product.find({}).populate("categoryid").populate("subcategoryid")
  data ? res.render("vpr",{data}) : console.log("err")
}

module.exports.deletedata = async (req, res, next) => {
  const id = req.query.id
  const deleteImage = await product.findById(id);

  if (deleteImage) {
          fs.unlinkSync(deleteImage.image);
  }
  
  const deletedData = await product.findByIdAndDelete(id);
  
  if (deletedData) {
      res.redirect("back");
  } else {
      console.log("Data not deleted");
  }
  } 
 ;
module.exports.editpr = async (req,res)=>{
  const editdata = await product.findById(req.query.id);
        
        if (editdata) {
            res.render("editpr", { editdata });
        } else {
            console.log("Data not found");
        }
}


module.exports.updatedataa = async (req,res)=>{
  
  let img = ""
  let singledata = await product.findById(req.query.id);
  req.file ? img = req.file.path : img = singledata.image
  if(req.file){
      fs.unlinkSync(singledata.image)
  }
  req.body.image = img;
  let updatedata = await product.findByIdAndUpdate(req.query.id,req.body);
  updatedata ? res.redirect("vpr") : console.log("Data Not update");
}
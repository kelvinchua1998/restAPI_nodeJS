const express =require("express")
const router = express.Router()
const multer = require("multer")
const mongoose = require("mongoose")//for mongoose db


//import model
const Products = require("../models/product")

// settings to configure filename and destination
const storage = multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,"./upload/")
    },
    filename: function(req,file,cb) 
    {
        cb(null,file.originalname)
    }
})

//able to set limits such as file size - interms of bytes
const upload = multer({storage: storage})


const fileFilter = (req,file,cb)=>{
    //reject a file
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png")
    {
        cb(null,true)
    }
    else
    {
        cb(null,false)
    }
}
//return all products
router.get("/", (req,res,next)=> {
    Products.find()
    .exec()
    .then(docs => {
        console.log(docs)
        // send a empty entries response if the database if empty
        if (docs.length >= 1){
            res.status(200).json(docs)
        }else{
            res.status(200).json({
                message: "no entries found"
            })
        }
        
    })
    .catch(err=>{
        console.log(err)
        res.status(200).json({error: err})
    })
})

router.post("/", (req,res,next)=> {
    const product = new Products({
        id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    //save the data into database, .exec()-> turn it into a promise, the format should be in a way the product saved-> success response OR error-> error response
    product.save().then(result=>{
        console.log(result)
        res.status(200).json({
            message: "handling POST requests to /products",
            createdProduct: result
        })
    }) 
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
})

router.get("/:productid", (req,res,next)=> {
    const id = req.params.productid
    Products.findById(id)//find the object by id
    .exec()
    .then(doc=>{
        console.log("From Database",doc)
        //check for null value in the database
        if(doc) {
            res.status(200).json(doc)
        }else{
            res.status(404).json({message:"No valid entry for Product id"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err});
    })
})

router.patch("/:productid", (req,res,next)=> {
    const id = req.params.productid
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    // the format is written in [{"propName":fieldname, "value": value to change into}]
    Products.update({_id: id},{ $set: updateOps})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err});
    })
})

router.delete("/:productid", (req,res,next)=> {
    const id = req.params.productid
    Products.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err});
    })
})


module.exports = router
const express =require("express")
const router = express.Router()
const multer = require("multer")// parse file module
var fs = require('fs') //append file module
const mongoose = require("mongoose")

const testResult = require("../models/speedtest")

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

router.get("/", (req,res,next)=> {
    testResult.testResult.find({}).sort({_id:-1}).limit(1)
    .exec()
    .then(data=>{
        console.log("latest",data)
    res.status(200).json({
        errorCode: 0,
        message: "GET request success",
        data: data
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
        })
    })
})
// have to create 2 upload folders, 1. uploadlog 2. uploadcurrent
// uploadlogs would have all the logs for all the files
// uploadcurrent would receive the json format the currentresult and save to uploadcurrent
// have to create 2 endpoints - uploadlist and uploadcurrent


router.post("/",(req,res,next)=> {
    const testresult = new testResult.testResult({
        testId: new mongoose.Types.ObjectId(),
        ssid: req.body.ssid,
        ping: req.body.ping,
        download: req.body.download,
        upload: req.body.upload,
        testServer: req.body.testServer,
        timeStamp: req.body.timeStamp
    })
    //save the data into database, .exec()-> turn it into a promise, the format should be in a way the product saved-> success response OR error-> error response
    testresult.save().then(result=>{
        console.log(result)
        res.status(200).json({
            errorCode: 0 ,
            message: "success",
            createdProduct: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
})

// router.get("/:logid", (req,res,next)=> {
//     const id = req.params.logid
//         res.status(200).json({
//             errorCode: 0,
//             message: "you passed an id"
//         })
    
// })

// router.patch("/:id", (req,res,next)=> {
//     res.status(200).json({
//         errorCode: 0,
//         message: "patch request"
//     })
// })

// router.delete("/:id", (req,res,next)=> {
//     res.status(200).json({
//         errorCode: 0,
//         message: "delete request"
//     })
// })


module.exports = router
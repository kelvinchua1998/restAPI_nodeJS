const express =require("express")
const router = express.Router()
const multer = require("multer")// parse file module
var fs = require('fs') //append file module

const storage = multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,"./upload/files_received")
    },
    filename: function(req,file,cb) 
    {
        cb(null,file.originalname)
    }
})

const upload = multer({storage: storage})

function readAppend(destination,source){
    var data = fs.readFileSync(source,function(err,data){
        if (err) throw err
        console.log("file was read")
    })
    fs.appendFileSync(destination,data,function(err,data){
        if (err) throw err
        console.log("the data is appended to the file!")
    })
}


router.post("/",upload.single("logfile"),(req,res,next)=> {
    console.log(req.file)
    //the funtion below will append the file received into the date file, is the file does not exist it would create it
    readAppend("upload/" + new Date().getDate().toString()+ "-" + (new Date().getMonth()+1).toString() + "-" + new Date().getFullYear().toString() + ".txt", req.file.path)
    console.log(new Date().toLocaleDateString())
        res.status(200).json({
            errorCode: 0 ,
            message: "success",
        })
})

module.exports = router
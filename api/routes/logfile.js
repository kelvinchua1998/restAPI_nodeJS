const express =require("express")
const router = express.Router()
const multer = require("multer")

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
    res.status(200).json({
        errorCode: 0,
        message: "GET request success"
    })
})

router.post("/",upload.single("logfile") ,(req,res,next)=> {
    console.log(req.file)
    res.status(200).json({
        errorCode: 0,
        message: "POST request success",
    })
})

router.get("/:logid", (req,res,next)=> {
    const id = req.params.logid
        res.status(200).json({
            errorCode: 0,
            message: "you passed an id"
        })
    
})

router.patch("/:id", (req,res,next)=> {
    res.status(200).json({
        errorCode: 0,
        message: "patch request"
    })
})

router.delete("/:id", (req,res,next)=> {
    res.status(200).json({
        errorCode: 0,
        message: "delete request"
    })
})


module.exports = router
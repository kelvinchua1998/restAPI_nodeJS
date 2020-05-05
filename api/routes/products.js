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
        message: "handling GET requests to /products"
    })
})

router.post("/",upload.single("logfile") ,(req,res,next)=> {
    console.log(req.file)
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    res.status(200).json({
        message: "handling POST requests to /products",
        body: product
    })
})

router.get("/:id", (req,res,next)=> {
    const id = req.params.id
    if (id == "special") 
    {
        res.status(200).json({
        message: "u found the special id",
        id: id
        })
    }   
    else 
    {
        res.status(200).json({
            message: "you passed an id"
        })
    }
})

router.patch("/:id", (req,res,next)=> {
    res.status(200).json({
        message: "updated product!"
    })
})

router.delete("/:id", (req,res,next)=> {
    res.status(200).json({
        message: "deleted product!"
    })
})


module.exports = router
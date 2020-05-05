const express =require("express")
const router = express.Router()


router.get("/", (req,res,next)=> {
    res.status(200).json({
        message: "orders are fetched"
    })
})

router.post("/", (req,res,next)=> {
    const order = { 
        productid: req.body.productid,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "order was created",
        body: order
    })
})

router.get("/:orderid", (req,res,next)=> {
    res.status(201).json({
        message: "order details",
        orderid : req.params.orderid
    })
})

router.delete("/:orderid", (req,res,next)=> {
    res.status(201).json({
        message: "orders was deleted",
        orderid : req.params.orderid
    })
})


module.exports = router
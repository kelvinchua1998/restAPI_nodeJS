const express =require("express")
const router = express.Router()
const multer = require("multer")// parse file module
const mongoose = require("mongoose")//for mongoose db

const aplist_model = require("../models/speedtest")

router.get("/", (req,res,next)=> {
    aplist_model.ap_list.find()
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

router.post("/",(req,res,next)=> {
    const testresult = new aplist_model.ap_list({
        ssid: req.body.ssid,
        site: req.body.site,
        location: req.body.location,
        wifiController: req.body.wifiController,
        password: req.body.password,
        model: req.body.model,
        runtime: req.body.runtime,
        mac: req.body.mac,
        IP: req.body.IP,
        desc: req.body.desc,
        lat: req.body.lat,
        lon: req.body.lon
    })
    //save the data into database, .exec()-> turn it into a promise, the format should be in a way the product saved-> success response OR error-> error response
    testresult.save().then(result=>{
        console.log(result)
        res.status(200).json({
            errorCode: 0 ,
            message: "success",
            created: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
})

router.patch("/:ssid", (req,res,next)=> {
    const ssid = req.params.ssid
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    
    // the format is written in [{"propName":fieldname, "value": value to change into}]
    aplist_model.ap_list.updateMany({ssid: ssid},{ $set: updateOps})
    .exec()
    aplist_model.ap_list.find()
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            errorCode: 0 ,
            message: "updated"
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err});
    })
})

module.exports = router
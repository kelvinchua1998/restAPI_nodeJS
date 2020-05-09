const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

// routes for requests
const productsRoutes = require("./api/routes/products")
const ordersRoutes = require("./api/routes/orders")
const testresultRoutes = require("./api/routes/testresult")
const logfileRoutes = require("./api/routes/logfile")
const applistRoutes = require("./api/routes/applist")


// connect to mongoose database
mongoose.connect("mongodb+srv://kelvinchua1998:" + process.env.mongoDBpw + "@database-debgd.mongodb.net/test?retryWrites=true&w=majority")

// show stats in terminal
app.use(morgan("dev"))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json({}))

// for cors => which is for security purposes where different servers are prevented from commmunicating to each other, however it can be overriden by adding headers
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")

    if (req.method == "options")
    {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
        res.status(200).json({})
    }
    next()
})

// endpoints that handle incoming requests
app.use("/products",productsRoutes)
app.use("/orders",ordersRoutes)

app.use("/testresult", testresultRoutes)
app.use("/logfile",logfileRoutes)
app.use("/ap_list", applistRoutes)

//your custom error message
app.use((req,res,next)=>
{
    const error = new Error("not found")
    error.status = 404
    next(error)
})
// errors thrown from anywhere else in the app
app.use((error, req,res,next)=>
{
    res.status(error.status || 500)

    res.json
    ({
        error:{
            message: error.message
            }
        
    })
})


module.exports = app
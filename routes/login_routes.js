
const express=require("express")
const env=require("../env")
const customer=require("../database/Customer")
const router=express.Router()



router.get("/login",(req,res)=>{
    console.log(req.session)
    req.session.loggedIn=true;

    res.sendFile(env.root_dir+"/templates/login.html")
})

router.get("/login/getLoginDetails",(req,res)=>{
    const isLoggedIn=req.session.loggedIn
    res.send({loggedIn:isLoggedIn})
})

router.post("/loginUser",(req,res)=>{
    const username=req.body.username
    const password=req.body.password


})

router.get("/register",(req,res)=>{
    if(!req.secure.hasOwnProperty("loggedIn")||!req.session.loggedIn){
        res.sendFile(env.root_dir+"/templates/register.html")

    }
})

router.post("/registerCustomer",async (req, res) => {

    if (req.body && req.body.hasOwnProperty("username") && req.body.hasOwnProperty("password")) {

        const result=await customer.createNewCustomer(req.body.username, req.body.password)
        console.log("This line"+result)
        res.send(result)

    } else {
        throw new Error("Incomplete details given")
    }


})

module.exports=router
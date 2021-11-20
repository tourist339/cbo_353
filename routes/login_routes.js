
const express=require("express")
const env=require("../env")
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

router.get("/register",(req,res)=>{
    if(!req.secure.hasOwnProperty("loggedIn")||!req.session.loggedIn){
        res.sendFile(env.root_dir+"/templates/register.html")

    }
})

router.post("/registerCustomer",(req,res)=>{

    res.send({working:"true"})


})

module.exports=router
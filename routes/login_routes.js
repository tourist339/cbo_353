
const express=require("express")
const env=require("../env")
const Customer=require("../database/Customer")
const Login=require("../database/Login")
const router=express.Router()


router.get("/login",(req,res)=>{

    if(req.session.loggedIn){
        res.redirect("/")
    }else{
        res.sendFile(env.root_dir+"/templates/login.html")
    }

})

router.get("/login/getLoginDetails",(req,res)=>{
    const isLoggedIn=req.session.loggedIn
    if(isLoggedIn) {
        res.send({loggedIn: true,username:req.session.username})
    }else{
        res.send({loggedIn: false})

    }
})

router.post("/loginUser",(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    Login.loginVerification(username,password,(result,data)=>{
        if(!result){
            res.send({"result":false})
        }else{
            req.session.loggedIn=true
            req.session.username=data.username
            req.session.type=data.type
            res.send({"result":true})
        }
    })


})

router.get("/register",(req,res)=>{
    if(!req.secure.hasOwnProperty("loggedIn")||!req.session.loggedIn){
        res.sendFile(env.root_dir+"/templates/register.html")

    }
})

router.post("/registerCustomer",async (req, res) => {

    console.log(req.body)
    if (req.body && req.body.hasOwnProperty("username") && req.body.hasOwnProperty("password")) {

        Customer.createNewCustomer(req.body.username, req.body.password,(resultString)=>{
            res.send(resultString)
        })


    } else {
        throw new Error("Incomplete details given")
    }


})

module.exports=router
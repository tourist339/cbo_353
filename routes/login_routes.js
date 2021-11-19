
const express=require("express")
const env=require("../env")
const router=express.Router()

router.get("/login",(req,res)=>{
    console.log(req.session)
    res.sendFile(env.root_dir+"/templates/login.html")
})

module.exports=router
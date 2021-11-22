
const express=require("express")
const env=require("../env")
const Customer=require("../database/Customer")
const Login=require("../database/Login")
const router=express.Router()
//
// router.use((req,res,next)=>{
//     if(env.checkLoggedIn(req)){
//         if(!req.session.type=="admin"){
//             res.send("Not logged in as admin")
//         }else{
//             next()
//         }
//     }else{
//         res.send("Not logged in")
//     }
// })
router.get("/",(req,res)=>{
    res.sendFile(env.root_dir+"/templates/admin/index.html")
})

router.get("/staff",(req,res)=>{
    res.sendFile(env.root_dir+"/templates/admin/staff.html")
})

router.get("/getAllStaff",(req,res)=>{
    res.send({font:"Fdsa"})
})

router.post("/registerStaff",(req,res)=>{

})

module.exports=router

const express=require("express")
const env=require("../env")
const Customer=require("../database/Customer")
const Login=require("../database/Login")
const Staff=require("../database/Staff")
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
    Object.keys(req.body).forEach(key=>{
        if (req.body[key]==""){
            res.send({result:false,data:"Empty "+key})
        }
    })

    Staff.createNewStaff(req.body.username,req.body.password,(result,data)=>{
        if(!result){
            res.send({result:false,data:data})
            return
        }
        const loginId=data.insertId
        Staff.createStaffData(loginId,req.body.first_name,req.body.last_name,req.body.speciality,(result,data)=>{
            if(!result){
                res.send({result:false,data:data})
                return
            }

            res.send({result:true,data:data})

        })


    })
})

module.exports=router
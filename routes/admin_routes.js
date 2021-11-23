
const express=require("express")
const env=require("../env")
const Customer=require("../database/Customer")
const Login=require("../database/Login")
const Staff=require("../database/Staff")
const Database=require("../database/Database")

const router=express.Router()
//
router.use((req,res,next)=>{
    if(env.checkLoggedIn(req)){
        if(!req.session.type=="admin"){
            res.send("Not logged in as admin")
        }else{
            next()
        }
    }else{
        res.send("Not logged in")
    }
})
router.get("/",(req,res)=>{
    res.sendFile(env.root_dir+"/templates/admin/index.html")
})

router.get("/staff",(req,res)=>{
    if(req.query.hasOwnProperty("id")){
        Staff.getSingleStaff(req.query.id,(result,data)=>{
            if(!result){
                res.send(data)
            }else{
                res.sendFile(env.root_dir + "/templates/admin/singlestaff.html")
            }
        })
    }else {
        res.sendFile(env.root_dir + "/templates/admin/staff.html")
    }
})
router.get("/getSingleStaff",(req,res)=>{


        Staff.getSingleStaff(req.query.id,(result,data)=>{

            if(!result){
                res.send({result:result,data:data})

            }else{
                res.send({result:result,data:data[0]})

            }
        })

})


router.get("/getAllStaff",(req,res)=>{
    Staff.getAllStaff((data)=>{
        if(!data){
            res.send(["Error "+data])
        }
        data.forEach((row,index)=>{Database.getAddictionNameFromId(row.addiction_speciality,(addiction_name)=>{
            row.addiction_speciality=addiction_name[0].name
            if(index==data.length-1){
                res.send(data)
            }
        })});

    })
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
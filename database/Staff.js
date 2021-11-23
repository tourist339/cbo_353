let conn
const bcrypt=require("bcrypt")
const env=require("../env")
const database = require("./Database");
const Database = require("../database/Database");
const Login = require("../database/Login");
class Staff{

    constructor() {
    }
    static init(database){
        conn=database
    }

    static createNewStaff(username,password,callback){
        database.createNewUser(username,password,"staff",callback)
    }


    static createStaffData(login_id,firstname,lastname,speciality,callback){
        let query=`INSERT INTO ${env.database.STAFF_TABLE} (firstname,lastname,login_id,addiction_speciality) VALUES(?,?,?,?)`
        conn.query(query,[firstname,lastname,login_id,speciality],(err,result)=>{
            if (err){
                callback(false,err.message)
                return
            }
            callback(true,result)
        })
    }




    static getAllStaff(callback){


        let query=`SELECT * FROM ${env.database.STAFF_TABLE}`
        conn.query(query,(err,result)=> {
            if (err) {
                throw err
            }
            let allstaff = result
            let updatedStaff = 0

            let updateStaff = (singleStaff, username, addiction_type, customers) => {
                singleStaff.username = username
                singleStaff.addiction_type = addiction_type
                singleStaff.customers = "fd"
                delete singleStaff["customer_ids"]
                updatedStaff++
                if (updatedStaff == allstaff.length) {
                    callback(allstaff)
                }
            }
            allstaff.forEach((singlestaff, index) => {
                Database.getAddictionNameFromId(singlestaff.addiction_speciality, (addiction_name) => {
                    Login.getUsernameFromId(singlestaff.login_id, (result, username) => {
                        let customers=singlestaff.customers
                        if(customers){
                            updateStaff(singlestaff, username, addiction_name, customers)

                        }else {
                            updateStaff(singlestaff, username, addiction_name, customers)
                        }
                    })
                });
            })
        })

    }

    static updateSingleStaff(singlestaff,callback){
        let updateStaff = (singleStaff, username, addiction_type, customers) => {
            singleStaff.username = username
            singleStaff.addiction_type = addiction_type
            singleStaff.customers = "fd"
            delete singleStaff["customer_ids"]
            callback(true,singlestaff)

        }
        Database.getAddictionNameFromId(singlestaff.addiction_speciality, (addiction_name) => {
            Login.getUsernameFromId(singlestaff.login_id, (result, username) => {
                let customers=singlestaff.customers
                if(customers){
                    updateStaff(singlestaff, username, addiction_name, customers)
                }else {
                    updateStaff(singlestaff, username, addiction_name, customers)
                }
            })
        });
    }

    static getSingleStaff(staff_id,callback){
        let query=`SELECT * FROM ${env.database.STAFF_TABLE} WHERE id = ?`
        conn.query(query,[staff_id],(err,result)=>{
            if(err||result.length==0){
                callback(false,"No staff exists in database with id "+staff_id)
                return
            }
            let singlestaff=result[0]
            this.updateSingleStaff(singlestaff,callback)


        })
    }

    static getSingleStaffFromLoginId(login_id,callback){
        let query=`SELECT * FROM ${env.database.STAFF_TABLE} WHERE login_id = ?`
        conn.query(query,[login_id],(err,result)=>{
            if(err||result.length==0){
                callback(false,"No staff exists in database with id "+staff_id)
                return
            }
            let singlestaff=result[0]
            this.updateSingleStaff(singlestaff,callback)


        })
    }

    static getCurrentPatients(doctorId,callback){
        let query=`SELECT customer_ids FROM ${env.database.STAFF_TABLE} WHERE id = ?`
        conn.query(query,[doctorId],(err,result)=>{
            if(err||result.length==0){
                throw new Error("No Doctor with such id")
            }
            let customer_ids=result[0].customer_ids
            callback(customer_ids)


        })
    }

    static addCustomerToDoctor(patientId,doctorId,callback){

        this.getCurrentPatients(doctorId,customerIds=>{
            let updateCustomerIds=customerIds+","+patientId
            let query=`UPDATE ${env.database.STAFF_TABLE} SET customer_ids = ? WHERE id = ?`
            conn.query(query,[updateCustomerIds,doctorId],(err,result)=>{
                if(err){
                    throw err
                }
                callback(result)
            })
        })

    }




}
module.exports=Staff
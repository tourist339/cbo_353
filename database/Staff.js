let conn
const bcrypt=require("bcrypt")
const env=require("../env")
const database = require("./Database");
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
        conn.query(query,(err,result)=>{
            if(err){
                throw err
            }
            callback(result)
        })
    }

    static getSingleStaff(staff_id,callback){
        let query=`SELECT * FROM ${env.database.STAFF_TABLE} WHERE id = ?`
        conn.query(query,[staff_id],(err,result)=>{
            if(err||result.length==0){
                callback(false,"No staff exists in database with id "+staff_id)
                return
            }
            callback(true,result)

        })
    }


}
module.exports=Staff
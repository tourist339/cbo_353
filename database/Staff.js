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


}
module.exports=Staff
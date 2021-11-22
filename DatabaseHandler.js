const Customer=require("./database/Customer")
const Login=require("./database/Login")
const Staff=require("./database/Staff")
const env=require("./env")

let conn
class DatabaseHandler{

    static init(db){
        conn=db
        Customer.init(db)
        Login.init(db)
        Staff.init(db)
    }

    static getAllAddictions(callback){
        let query=`SELECT * FROM ${env.database.ADDICTION_TABLE}`
        conn.query(query,(err,result)=>{
            if(err){
                throw err
            }
            callback(true,result)
        })
    }
}

module.exports=DatabaseHandler
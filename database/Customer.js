let conn
const bcrypt=require("bcrypt")
const env=require("../env")
const database=require("./Database")
class Customer{


     static init(database){
         conn=database
     }

     static createNewCustomer(username,password,callback){
         database.createNewUser(username,password,"customer",callback)
     }

    static createCustomerData(login_id,firstname,lastname,addiction_type,phone_num,callback){
        let query=`INSERT INTO ${env.database.CUSTOMER_TABLE} (firstname,lastname,login_id,addiction_type,phone_num) VALUES(?,?,?,?,?)`
        conn.query(query,[firstname,lastname,login_id,addiction_type,phone_num],(err,result)=>{
            if (err){
                callback(false,err.message)
                return
            }
            callback(true,result)
        })
    }

    static getAllCustomers(callback){
        let query=`SELECT * FROM ${env.database.CUSTOMER_TABLE}`
        conn.query(query,(err,result)=>{
            if(err){
                throw err
            }
            callback(result)
        })
    }
     static updateCustomerData(){

     }


}
module.exports=Customer
let conn
const database=require("../DatabaseHandler")
const bcrypt=require("bcrypt")
const {DATE} = require("mysql/lib/protocol/constants/types");
class Customer{
     static init(database){
         conn=database
     }

     static createNewCustomer(username,password){
         bcrypt.hash(password,1,(err,hash)=>{
            let query=`INSERT INTO ${database.LOGIN_TABLE} (username,password,type) VALUES(?,?,"customer")`
             conn.query(query,[username,hash],(err,result)=>{
                 if (err)throw err;
                 console.log(result)
             })
         })
         conn.query()
     }


}
module.exports=Customer
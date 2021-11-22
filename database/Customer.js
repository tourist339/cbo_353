let conn
const bcrypt=require("bcrypt")
const env=require("../env")
class Customer{

    constructor() {
        this.id="Fsd"
    }
     static init(database){
         conn=database
     }

     static createNewCustomer(username,password,callback){
         bcrypt.hash(password,1,(err,hash)=>{
            let query=`INSERT INTO ${env.database.LOGIN_TABLE} (username,password,type) VALUES(?,?,"customer")`
             console.log(query)
             conn.query(query,[username,hash],(err,result)=>{
                 if (err){
                     callback(err.message)
                     return
                 }
                 console.log("Result creating new customer "+result)
                 callback("Succesfull")
             })
         })
     }


}
module.exports=Customer
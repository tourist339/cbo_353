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

     static createNewCustomer(username,password){
         bcrypt.hash(password,1,(err,hash)=>{
            let query=`INSERT INTO ${env.database.LOGIN_TABLE} (username,password,type) VALUES(?,?,"customer")`
             console.log(query)
             conn.query(query,[username,hash],(err,result)=>{
                 if (err){
                     console.log(err);
                     return err
                 }
                 console.log(result)
                 return "Successful"
             })
         })
     }


}
module.exports=Customer
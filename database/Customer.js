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

     static updateCustomerData(){

     }


}
module.exports=Customer
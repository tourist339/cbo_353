let conn
const bcrypt=require("bcrypt")
const env=require("../env")
class Database{


    static init(database){
        conn=database
    }

    static createNewUser(username,password,user_type,callback){
        bcrypt.hash(password,1,(err,hash)=>{
            let query=`INSERT INTO ${env.database.LOGIN_TABLE} (username,password,type) VALUES(?,?,?)`
            conn.query(query,[username,hash,user_type],(err,result)=>{
                if (err){
                    callback(false,err.message)
                    return
                }
                callback(true,result)
            })
        })
    }

    static updateCustomerData(){

    }


}
module.exports=Database
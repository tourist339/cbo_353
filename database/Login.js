let conn
const bcrypt=require("bcrypt")
const env=require("../env")
class Login{


    static init(database){
        conn=database
    }

    static loginVerification(username,password,callback){
        let query=`SELECT * FROM ${env.database.LOGIN_TABLE} WHERE username = ?`
        conn.query(query,username,(err,result)=>{

            bcrypt.compare(password,result[0].password,(err,res)=>{
                if(res){
                    callback(true,result[0])
                }else{
                    callback(false)
                }
            })
        })

    }


}
module.exports=Login
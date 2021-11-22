let conn
const bcrypt=require("bcrypt")
const env=require("../env")
class Login{


    static init(database){
        conn=database
    }

    static loginVerification(username,password){
        let query=`SELECT * FROM ${env.database.LOGIN_TABLE} WHERE username = ?`
        conn.query(query,username,(err,result)=>{
            console.log(result)
        })
        bcrypt.hash(password,1,(err,hash)=>{
            let query=`INSERT INTO ${env.database.LOGIN_TABLE} (username,password,type) VALUES(?,?,"customer")`
            console.log(query)
            conn.query(query,[username,hash],(err,result)=>{
                if (err)throw err;
                console.log(result)
                return true
            })
        })
    }


}
module.exports=Customer
const Customer=require("./database/Customer")
const Login=require("./database/Login")

class DatabaseHandler{

    static init(conn){
        Customer.init(conn)
        Login.init(conn)
    }
}

module.exports=DatabaseHandler
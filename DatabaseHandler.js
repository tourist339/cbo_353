const Customer=require("./database/Customer")

class DatabaseHandler{

    static init(conn){
        Customer.init(conn)
    }
}

module.exports=DatabaseHandler
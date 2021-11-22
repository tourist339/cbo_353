let conn
const bcrypt=require("bcrypt")
const env=require("../env")
class Staff{

    constructor() {
    }
    static init(database){
        conn=database
    }

    static getAllStaff(){

    }

    static updateCustomerData(){

    }


}
module.exports=Staff
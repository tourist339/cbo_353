const express =require("express")
const bodyParser =require("body-parser");
const session=require("express-session")
const app=express()
const loginRoutes=require("./routes/login_routes")
app.use(express.static("public/css"))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(loginRoutes)



module.exports= app

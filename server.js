const express =require("express")
const bodyParser =require("body-parser");
const session=require("express-session")

const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))



module.exports= app

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const doenv=require("dotenv");
const cookieParser=require("cookie-parser");

doenv.config({
    path: "./.env",
});



app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
module.exports=app;
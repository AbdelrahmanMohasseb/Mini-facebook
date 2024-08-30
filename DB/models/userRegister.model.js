const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');
var CryptoJS=require("crypto-js");
const { boolean, bool } = require("joi");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String
    },
    isConfirmed:{type:Boolean,default:false}


    
})

userSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,parseInt(process.env.ROUNDS))
    this .phone =CryptoJS.AES.encrypt(this.phone,process.env.SECRET_KEY).toString();
    next()
}) 

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;
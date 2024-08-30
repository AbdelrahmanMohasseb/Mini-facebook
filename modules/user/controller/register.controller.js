const userModel=require("../../../DB/models/userRegister.model");
const bCrypt=require("bcryptjs");
// const nodemailer = require("nodemailer");
const { sendEmail } = require("../../../middleware/sendEmail");
const jwt = require('jsonwebtoken');

const registerController=async(req,res)=>{
let{email,userName,password,phone}=req.body
const isFounded =await userModel.findOne({email})
if(isFounded){
    res.status(400).json({message:"user already register"})
}else{
    const newUser=new userModel({email,userName,password,phone});
    const addedUser=await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRETKEY, { expiresIn: 60 });
            const refreshToken = jwt.sign({ id: savedUser._id }, process.env.SECRETKEY);

            const message = `<a href="${req.protocol}://${req.headers.host}/user/confirm/${token}">click me </a> <br>
            <a href="${req.protocol}://${req.headers.host}/user/email/re_send/${refreshToken}">re-send activation  link </a>`
            await sendEmail(email, message)
            res.status(201).json({ message: "Done", status: 201 })
   

    
}
}

const signInController=async (req,res)=>{
    try {
        let{email,userName,password,phone}=req.body
 const isFounded =await userModel.findOne({email})
 if(isFounded){
    bCrypt.compare(password,isFounded.password,function(err,result){
 if(result){

    res.status(200).json({message:"welcome",userInfo:isFounded})
  }else{
    res.status(400).json({message:"password is in-valid"})
    }
    })
}else{
    res.status(400).json({message:"this email is not register yet "})
}

    } catch (error) {
        res.status(400).json({message:"server error"})
    }
 
}

const confirmEmail=async(req,res)=>{


    const { token } = req.params
        if (!token || token == undefined || token == null) {
            res.status(400).json({ message: "token err" })

        } else {

            const decoded = jwt.verify(token, process.env.SECRETKEY);
            console.log(decoded);

            const user = await userModel.findOneAndUpdate({ _id: decoded.id, confirmed: false }, { confirmed: true }, { new: true });
            if (user) {
                res.status(200).json({ message: "confimed pleas login" })
            } else {
                res.status(400).json({ message: "in-valid link" })
            }
        }
//     let {email}=req.params;
//     const foundedUser=await userModel.findOne({email});
// if(foundedUser){
//     if(foundedUser.isConfirmed){
//         res.status(400).json({message:"email elready confirmed"});

//     }else{
//         foundedUser.isConfirmed=true;
//         const updatedUser= await userModel.findByIdAndUpdate({_id:foundedUser._id},{isConfirmed:foundedUser.isConfirmed},{new:true});
//         res.status(200).json({message:"your email verfied now",updatedUser});

//     }
// }else{
//     res.status(400).json({message:"email not register"});

// }
    
}
const resendConfirmationEmail = async(req, res, next) => {

    const { token } = req.params;

    if (!token || token == undefined || token == null) {
        res.status(400).json({ message: "token err" })

    } else {

        const decoded = jwt.verify(token, process.env.SECRETKEY);
        console.log(decoded);

        const user = await userModel.findOne({ _id: decoded.id, confirmed: false });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: 60 });
            const refreshToken = jwt.sign({ id: user._id }, process.env.SECRETKEY);

            const message = `<a href="${req.protocol}://${req.headers.host}/user/confirm/${token}">click me </a> <br>
            <a href="${req.protocol}://${req.headers.host}/user/email/re_send/${refreshToken}">re-send activation  link </a>`
            await sendEmail(user.email, message)
                //resendEmail
            res.status(200).json({ message: "Done", status: 200 })
        } else {
            res.status(400).json({ message: "in-valid link" })
        }
    }


}

module.exports={registerController,signInController,confirmEmail,resendConfirmationEmail}
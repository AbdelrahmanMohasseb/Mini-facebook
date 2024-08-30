const userRouter =require("express").Router();
const { validationFunc } = require("../../middleware/validation");
const {registerController,signInController,confirmEmail,resendConfirmationEmail}=require("./controller/register.controller");
const { userValidationSchema,userSignInValidationSchema } = require("./validation");

userRouter.post("/register",validationFunc(userValidationSchema),registerController)
userRouter.post("/signIn",validationFunc(userSignInValidationSchema),signInController)
// userRouter.get("/confirm/:email",confirmUser)
userRouter.get("/user/confirm/:token", confirmEmail)
//resend email
userRouter.get("/user/email/re_send/:token", resendConfirmationEmail)


module.exports=userRouter 
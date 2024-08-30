const Joi=require("joi");


const userValidationSchema={
  body:  Joi.object().keys({
    userName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    cPassword: Joi.ref('password'),
phone:Joi.string()
  })

}

const userSignInValidationSchema={
  body:  Joi.object().keys({
    email:Joi.string().email().required(),
    password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

}


module.exports={userValidationSchema,userSignInValidationSchema};

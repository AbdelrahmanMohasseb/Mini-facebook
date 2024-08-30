
const headers=["body","params","query"];

const validationFunc=(schema)=>{
    return(req,res,next)=>{
        let validationError=[];

        headers.forEach((key)=>{
            if(schema[key]){
                let errors=schema[key].validate(req[key]);
                if(errors.error){
                    validationError.push(errors.error.details);
                }
                if(validationError.length){
                    res.json({message:"error",validationError})
                }else{
                    next();
                }
                   }
        })
    }
   
}
module.exports={validationFunc}
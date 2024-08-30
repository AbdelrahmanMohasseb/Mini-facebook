const userModel=require("../../../DB/models/userRegister.model")
const postModel=require("../../../DB/models/post.model")
const commentModel=require("../../../DB/models/comments.model")

const addPostController=async(req,res)=>{
   let{title,desc,userId}=req.body;
   const foundedUser=await userModel.findById({_id:userId});
   if(!foundedUser){
    res.status(400).json({message:"this user not register"})
   }else{
    const addedpost=await postModel.insertMany({title,desc,userId});
    res.status(200).json({message:"added",addedpost})
   }
}


const allPost=async (req,res)=>{
   const cursor=await postModel.find({}).populate([
      {
         path:"userId",
         model:"user",
         select:"userName"
      }
      // ,{
      //    path:"commentsId",
      //    model:"comment",
      //    populate:{
      //       path:"userId",
      //       model:"user",
      //       select:"userName"
      //    }
      // }
   ]).cursor();
   let allData=[]
   for(let doc=await cursor.next();doc!=null;doc=await cursor.next()){

      const comments=await commentModel.find({postId:doc._id}).populate([{
         path:"userId",
         model:"user",
         select:"userName"
      }]);
      allData.push({...doc._doc,comments})
   }
   res.json({message:"all data",allData})
}


module.exports={addPostController,allPost};
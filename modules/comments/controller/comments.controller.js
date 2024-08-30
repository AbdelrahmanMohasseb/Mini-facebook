const userModel=require("../../../DB/models/userRegister.model")
const postModel=require("../../../DB/models/post.model")
// const commentModel=require("../../../DB/models/comments.model")



const addCommentController=async (req,res)=>{
    let {desc,userId,postId}=req.body
    const foundedUser=await userModel.findById({_id:userId});
    if(!foundedUser){
        res.status(400).json({message:"this user not register"});
}else{
 
const postFound=await postModel.findById({_id:postId})

 if(postFound){
  // const addComment=await commentModel.insertMany({desc,userId,postId});
  //   postFound["commentsId"].push(addPost[0]); 
  //  const updatedPost= await postModel.findByIdAndUpdate({_id:postFound._id},{commentsId:postFound.commentsId},{new:true});
  postFound.comments.push({desc,userId});
  const updatedPost=await postModel.findByIdAndUpdate(postFound._id,{comments:postFound.comments},{new:true})
   res.json({message:"updated",updatedPost});
 }else{
   res.status(400).json({message:"post not founded"});

 }
}   
}
const updateCommentController=async (req,res)=>{
let commentId=req.params.id;
let{desc,userId,postId}=req.body;
const postFound=await postModel.findOne({_id:postId});
if(!postFound){
  res.status(400).json({message:"post not found"})
}else{
  // let commentFound=await commentModel.findOne({_id:commentId});
  // if(!commentFound){
  //   res.status(400).json({message:"comment not found"})

  // }else{
  //   commentFound.desc=desc;
  //  const updatedComment= await commentModel.findByIdAndUpdate({_id:commentId},{desc:commentFound.desc},{new:true});
  //   res.status(200).json({message:"updated",updatedComment})
  // }
  let currentComment
  const foundedComment =postFound.comments.find((comment,index)=>{
    if(comment.userId==userId&& comment._id==_id){
      currentComment=index
          return comment;   
    }
  })
  if(foundedComment){
postFound.comments[currentComment].desc=desc;
let updatedComment= await postModel.findByIdAndUpdate({_id:postId},{comments:postFound.comments},{new:true})
     res.status(200).json({message:"updated",updatedComment})

  }else{
    res.status(400).json({message:"comment not found"})

  }
}
}

module.exports={addCommentController,updateCommentController}; 
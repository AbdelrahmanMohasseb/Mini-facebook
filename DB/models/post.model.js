const mongoose=require("mongoose");
const replaySchema=new mongoose.Schema({
    desc:{
        type:String,
        required:true,
        
    },userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
     },
})
const commentSchema=new mongoose.Schema({
    desc:{
          type:String,
          required:true,
          
      },userId:{
          type:mongoose.Types.ObjectId,
          ref:"user"
       },//,postId:{
    //       type:mongoose.Types.ObjectId,
    //       ref:"post"
    //   }
    replay:[replaySchema]
  
      
  });

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },desc:{
        type:String,
        required:true,
        
    },userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    // commentsId:[{type:mongoose.Types.ObjectId,ref:"comment"}]
    comments:[commentSchema]


    
});

const postModel=mongoose.model("post",postSchema);
module.exports=postModel;
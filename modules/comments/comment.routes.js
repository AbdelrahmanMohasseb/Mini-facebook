const commentRouter =require("express").Router();
const{addCommentController,updateCommentController}=require("./controller/comments.controller")

commentRouter.post("/addComment",addCommentController);
commentRouter.post("/updateComment/:id",updateCommentController)


module.exports=commentRouter 
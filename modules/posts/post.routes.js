const postsRouter =require("express").Router();
const{addPostController,allPost}=require("./controller/post.controller")

postsRouter.post("/addPost",addPostController);

postsRouter.get("/allpost",allPost);

module.exports=postsRouter 
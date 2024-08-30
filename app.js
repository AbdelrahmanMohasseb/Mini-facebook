const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT
const{postsRouter,userRouter, commentRouter}=require("./routes/index");
const runDB = require('./DB/connection');

app.use(express.json())
app.use(postsRouter,userRouter,commentRouter)

runDB();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
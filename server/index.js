const express = require("express");
const app = express();
app.use(express.json());
//router
require("dotenv").config()
const authRouter = require('./router/auth');
const SkillRouter = require('./router/skill');

//connect to database
const mongoose = require("mongoose");
 
const connectDB = async () =>{
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g7cyd.mongodb.net/mernapp?retryWrites=true&w=majority`,
        {
            useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify: false
        },
        console.log("Conncet database success!!!") 
        )

    } catch (error) {
        console.log("Connect db fail" + error   )
        process.exit(1)
    }
}
connectDB(); 



app.get("/", (req,res)=> res.send("Hello word !!!"))



app.use('/api/auth',authRouter)
app.use('/api/posts',SkillRouter)


const port = 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})

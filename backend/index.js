const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors= require('colors');
const morgan = require('morgan')
const connectDB=require('./config/db')
// doten
dotenv.config();
// mongodb connection
connectDB();

//rest object
const app = express();
//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// routes
app.use('/api/v1/auth',require('./routes/userRoutes'))
app.use('/api/v1/post',require('./routes/postRoutes'))
// home
app.get("/",(req,res)=>{
    res.status(200).send({
        "success":true,
        "message":"node server running"
    })
})
//port
const PORT = process.env.PORT || 8080
//listen
app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}`.bgGreen.white);
});

const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel")
const JWT = require("jsonwebtoken")
var  {expressjwt: jwt} = require('express-jwt')

// middleware
const requiredSignIn = jwt({
    secret:process.env.JWT_SECRET,
    algorithms:['HS256'],
})

// register
const registerController = async (req,res) =>{
  try {
       const {name,email,password} = req.body
       // validation
       if(!name){
        return res.status(400).send({
            success:false,
            message:'name is required'
        })
       }

       if(!email){
        return res.status(400).send({
            success:false,
            message:'email is required'
        })
       }

        if(!password || password.length < 6){
            return res.status(400).send({
                success:false,
                message:'check your password and it should be of length six'
            })
        }

        // existing user
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(500).send({
                success:false,
                message:"user already exist with this email"
            })
        }
        // hashed password
        const hashedPassword= await hashPassword(password);
        // save user
        const user = await userModel({name,email,password:hashedPassword}).save();
        
        return res.status(201).send({
            success:true,
            message:'registration succesful'
        })

  } catch (error) {
      console.log(error)
      return res.status(500).send({
        success:false,
        message:"error in register api",
        error,
      })
  }
};


// login
const loginController = async (req,res) =>{
        try {
            const {email,password} = req.body
            if(!email || !password){
                return res.status(500).send({
                    success:false,
                    message:'Please provide required credentials'
                })
            }
             const user = await userModel.findOne({email})
             if(!user){
                return res.status(500).send({
                    success:false,
                    message:"user not found"
                })
             }  
             // match password
             const match = await comparePassword(password,user.password)
             if(!match){
                return res.status(500).send({
                    success:false,
                    message:"invalid username or password"
                })
             } 
             // token jwt 
             const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:"7d",
             })
             // undefined password
             user.password =  undefined;
             res.status(200).send({
                success:true,
                message:'login successfully',
                token,
                user,
              
             })         

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:'error in login api',
                error
            })
        }
}
// update user
const updateUserController=async(req,res)=>{
    try {
        const {name , password , email}=req.body
        //user find
        const user = await userModel.findOne({email})
        // password validate
        if(password && password.length < 6 ){
            return res.status(400).send({
                success:false,
                message:"password is required and should be 6 characters long"
            })
        }
         
        const hashedPassword = password ? await hashPassword(password) : undefined
        // updated user
        const updatedUser = await userModel.findOneAndUpdate({email},{
            name : name || user.name ,
            password :  hashedPassword || user.password,
        },{new : true});

         updatedUser.password=undefined;

        res.status(200).send({
            success:true,
            message:'Profile updated please login',
            updatedUser
        })
    
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update user api",
            error
        })
    }
}


module.exports = {updateUserController,registerController,loginController,requiredSignIn}
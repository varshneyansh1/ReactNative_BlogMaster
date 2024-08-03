const { request } = require("express");
const postModel = require("../models/postModel")

// create post
const createPostController = async(req,res) => {
    try {
        console.log(req.body)
        const {title,description} = req.body
        // validate
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:"please provide the necessary details"
            })
        }

        const post  = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();
     

        res.status(201).send({
            success:true,
            message:"post created sucessfully",
            post
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in create post api",
            error
        })
        
    }
}

const getAllPostController = async (req,res) => {
 try {
    const post = await  postModel.find()
    .populate('postedBy', "_id name")
    .sort({createdAt:-1})
    res.status(200).send({
        success:true,
        message:"All Post Data",
        post,

    })
 } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"error in get all post api",
        error
    })
    
 }
}

const getUserPostController = async (req,res) =>  {
    try {
        const userPosts =  await postModel.find({postedBy:req.auth._id})
         res.status(200).send({
            success:true,
            message:"all user post",
            userPosts
         })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get user post api",
            error
        })
        
    }
}

const deletePostController = async (req,res) => {
    try {
        const {id} =  req.params
        await postModel.findByIdAndDelete({_id:id})
        res.status(200).send({
            success:true,
            message:"Post deleted succesfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in deleting the post"
        })
    }
}

const updatePostController = async (req,res) => {
    try {
        const {title,description} = req.body
        //find post
        const post = await postModel.findById({_id:req.params.id});
        // validation
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:"please provide post title or description",
            })  
        }
        const updatedPost = await postModel.findByIdAndUpdate({_id:req.params.id},
            {
                title:title || post?.title,
                description: description || post?.description
            },{new:true}
        )
        res.status(200).send({
            success:true,
            message:"post updated succesfully",
            updatedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in update post api",
            error,
        })
    }
}
module.exports = {createPostController,updatePostController,
    getAllPostController,getUserPostController,deletePostController}
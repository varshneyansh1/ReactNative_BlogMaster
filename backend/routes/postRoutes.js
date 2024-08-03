const express = require('express')
const { requiredSignIn } = require('../controllers/userController')
const {createPostController,getAllPostController, getUserPostController, deletePostController, updatePostController} = require ('../controllers/postController')


// router object
const router  = express.Router()
// create post

router.post('/create-post',requiredSignIn,createPostController)

// get  all post 

router.get('/get-all-post', getAllPostController)

// get user post 
router.get('/get-user-post',requiredSignIn,getUserPostController)

// delete user post
 router.delete("/delete-post/:id",requiredSignIn,deletePostController)

 // update post

  router.put("/update-post/:id",requiredSignIn,updatePostController)


//export 
module.exports  = router
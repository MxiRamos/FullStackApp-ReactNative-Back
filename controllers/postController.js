const postModel = require("../models/postModel")

// create post
const createPostController = async(req, res) => {
    try{
        const{title, description} = req.body
        
        //validate
        if(!title || !description){
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save()
        res.status(201).send({
            success: true,
            message: 'Post created successfully',
            post,
        })
        console.log(req)
    }catch(error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message: 'Error in create Post API',
            error
        })
    }
}

// GET ALL POSTS 
const getAllPostsController = async(req, res) => {
    try {
        const posts = await postModel.find()
        .populate('postedBy', '_id name')
        .sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: 'All Post Data',
            posts,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in GET ALL POSTS API',
            error,
        })
    }
}

// get user posts
const getUserPostsController = async(req, res) => {
    try{
        const userPosts = await postModel.find({postedBy:req.auth._id})
        res.status(200).send({
            success: true,
            message: 'User posts',
            userPosts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in User POST API',
            error
        })
    }
}

// DELETE POST
const deletePostController = async(req, res) => {
    try{
        const { id } = req.params 
        await postModel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            success: true,
            message: "Your post been deleted",
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in delete post API',
            error,
        })
    }
}

// UPDATE POST
const updatePostController = async(req, res) => {
    try{
        const {title, description} = req.body
        //post find
        const post = await postModel.findById({ _id: req.params.id })
        // validation
        if(!title || !description) {
            return res.status(500).send({
                success: false,
                message: 'Please provide post title or description'
            })
        }
        const updatedPost = await postModel.findByIdAndUpdate({_id:req.params.id},
            {
                title: title || post?.title,
                description: description || post?.description
            }, 
            { new:true }
        )
        res.status(200).send({
            success: true,
            message: 'Post updated succesfully',
            updatedPost
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in update post API',
            error
        })
    }
}

module.exports = { 
    createPostController, 
    getAllPostsController, 
    getUserPostsController, 
    deletePostController,
    updatePostController 
}
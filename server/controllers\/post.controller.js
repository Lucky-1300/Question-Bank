import PostModal from '../models/post.model.js'

const CreatePost = async (req, res, next) => {
    try {
        const { topic, question, answer } = req.body;
        console.log(topic, question, answer);
        const responseData = await PostModal.create({
            topic,
            question,
            answer,
        })
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        const responseData = await PostModal.find();
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        const { postID } = req.query;
        console.log(postID)
        const responseData = await PostModal.findById(postID);
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { postID } = req.body;
        if(!postID) throw Error("Pleas Provide post id");
        const responseData = await PostModal.findByIdAndDelete(postID)
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { postID, topic, question, answer } = req.body;
        console.log(postID, topic, question, answer)
        const responseData = await PostModal.findByIdAndUpdate(postID, {
            topic,
            question,
            answer,
        }, { new: true });
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

export {
    CreatePost,
    getPosts,
    getSinglePost,
    deletePost,
    updatePost,
}
const express = require('express');
const { createPost, likeandunlikepost, deletepost, getpostoffollowing, updatecaption, addcomment, deletecomment } = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/auth');
const router =express.Router();

router.route('/post/upload').post(isAuthenticated,createPost);

router.route('/post/:id').get(isAuthenticated,likeandunlikepost).delete(isAuthenticated,deletepost).put(isAuthenticated,updatecaption);
router.route('/posts').get(isAuthenticated,getpostoffollowing);
router.route('/post/comment/:id').put(isAuthenticated,addcomment).delete(isAuthenticated,deletecomment)


module.exports = router;

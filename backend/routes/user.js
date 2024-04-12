const express = require('express');
const { register,login,followuser, logout, updatepassword, updateProfile, deletemyprofile, myprofile, getUserProfile, getallusers, forgotpassword,getMyPosts, getUserPosts, getAllUsers } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');




const router =express.Router();

router.route("/register").post(register)
router.route('/login').post(login);
router.route('/follow/:id').get(isAuthenticated,followuser)
router.route('/logout').get(logout);
router.route("/update/password").put(isAuthenticated,updatepassword);
router.route("/update/profile").put(isAuthenticated,updateProfile);
router.route('/delete/me').delete(isAuthenticated,deletemyprofile);
router.route('/me').get(isAuthenticated,myprofile);
router.route('/my/posts').get(isAuthenticated,getMyPosts)
router.route('/userposts/:id').get(isAuthenticated,getUserPosts)
router.route('/forgot/password').post(isAuthenticated,forgotpassword);
router.route('/user/:id').get(isAuthenticated,getUserProfile);
router.route('/users').get(isAuthenticated,getallusers);
router.route('/api/v1/users?name=${name}').get(isAuthenticated,getAllUsers)
router.route('/register').get((req,res)=>{
    res.status(201).json({
        message:"The end is e"
    })
})

module.exports = router;
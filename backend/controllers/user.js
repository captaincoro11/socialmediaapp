const user = require('../models/user');
const Post = require('../models/post');
const {sendemail} = require('../middlewares/sendemail')
const cloudinary = require('cloudinary')


exports.register = async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;
     
      let User = await user.findOne({ email });
      if (User) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

     
  
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
  

      User = await user.create({
        name,
        email,
        password,
        avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
      });
  
      const token = await User.generateToken();
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(201).cookie("token", token, options).json({
        success: true,
        User,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  };
  

exports.login =async(req,res)=>{
    try {
        const {email,password} = req.body;
        
        const User = await user.findOne({email}).select("+password").populate('posts followers following');

        if(!User){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        const isMatch = await User.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        const token =await User.generateToken();
        res.status(200).cookie("token",token,{expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,}).
        json({
            success:true,
            User,
       
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error,

        })
    }
}
exports.logout = async (req,res)=>{
    try {
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"logged out"
        })
    } 
    catch (error) {
        res.status(500).json({

            success:false,
            message:error.message,
           
        })
        
    }
}

exports.followuser= async (req,res)=> {
try {
    const usertofollow = await user.findById(req.params.id);
    const loggedinuser = await user.findById(req.user._id);
    if(!usertofollow){
        return res.status(404).json({
            success:false,
            message:"User not found "
        })
    }
    if(loggedinuser.following.includes(usertofollow._id)){

        const indexfollowing =loggedinuser.following.indexOf(usertofollow._id);
        const indexfollowers =usertofollow.followers.indexOf(loggedinuser._id);

        loggedinuser.following.splice(indexfollowing,1);

        usertofollow.followers.splice(indexfollowers,1);

        await loggedinuser.save();
        await usertofollow.save();

        res.status(200).json({
            success:true,
            message:"User unfollowed"
        })
    }
    else{
        loggedinuser.following.push(usertofollow._id);
        usertofollow.followers.push(loggedinuser._id);
        await loggedinuser.save();
        await usertofollow.save();
        res.status(200).json({
            success:true,
            message:"User Followed"
        })
        

    }
   

    
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
    
}

}

exports.updatepassword = async (req,res)=>{
    try {
        const User = await user.findById(req.user._id).select("+password");
        
        const {oldpassword , newpassword} = req.body;
        if(!oldpassword || !newpassword){
            return res.status(400).json({
                success:false,
                message:"Please provide both passwords"
            })
        }
        const isMatch = await User.matchPassword(oldpassword);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Old Password",
            })
        }
        User.password = newpassword;
        await User.save();
        res.status(200).json({
            success:true,
            message:"PASSWORD UPDATED",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
exports.updateProfile = async(req,res)=>{
    try {
        const User = await user.findById(req.user._id);
        const {name,email} = req.body;
        if(name){
            User.name= name;

        }
        if(email){
            User.email= email;
            
        }
        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            const myCloud=await cloudinary.v2.uploader.upload(avatar,{
                folder:"avatars",
            })

            user.avatar.public_id=myCloud.public_id;
            user.avatar.url= myCloud.secure_url;

        }
        await User.save();
        res.status(200).json({
            success:true,
            message:"Profile Updated Successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}
exports.deletemyprofile = async (req, res) => {
    try {
      // Fetch the user by ID
        const User = await user.findById(req.user._id);
     
        const userid= User._id;
        const followers = User.followers;
        const following= User.following;
        
        const posts = User.posts;

        await cloudinary.v2.uploader.destroy(user.avatar.public_id)

  
        // Delete the user
        await User.deleteOne();
  
        // Clear the user token
        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  
        // Delete user's posts
        for (let i = 0; i < posts.length; i++) {
          const post = await Post.findById(posts[i]);
  
          // Check if the post exists before deleting
          if (post) {
            await cloudinary.v2.uploader.destroy(post.image.public_id)
            await post.deleteOne();
          }
        }
        for(let j=0;j<followers.length;j++){
            const follower = await user.findById(followers[j]);
           
            const index = follower.following.indexOf(userid);
                
            follower.following.splice(index, 1);
            await follower.save();
             

          
    
        }
        for(let j=0;j<following.length;j++){
            const follows = await user.findById(following[j]);
           
            const index = follows.followers.indexOf(userid);
                
            follows.followers.splice(index, 1);
            await follows.save();
             

          
    
        }
        
  
        // Respond with success message
        res.status(200).json({
          success: true,
          message: "Profile deleted successfully"
        });

        if(!User){
            // If user is not found, respond with an error
        res.status(404).json({
            success: false,
            message: "User not found"
          });
        
        }
     
        
    
    
    }




    

    
    catch (error) {
      // Handle errors
      res.status(500).json({
        success: false,
        message: error.message,
      });
    
  };
 
        
    
  };


exports.myprofile = async(req,res)=>{
    try {
        const User = await user.findById(req.user._id).populate("posts followers following")
        res.status(200).json({
            success:true,
            User,
        });



        
    } catch (error) 
    {
    res.status(500).json({
        success:false,
        message:error.message
    });
};
}

exports.getUserProfile = async(req,res) =>{
    try {
        
        const User = await user.findById(req.params.id).populate('posts followers following')
        if(!User){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        res.status(200).json({
            success:true,
            User,
        })
        
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message

        })
        
    }
}
exports.getallusers = async(req,res)=>{
    try {
        
        const Users = await user.find({});
        res.status(200).json({
            success:true,
            Users,

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message

        })
        
        
    }
}

exports.forgotpassword = async(req,res)=>{
    try {
        const User = await user.findOne({email:req.body.email});
        if(!User){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

    const resetpasswordtoken =User.getresetpasswordtoken();
    await User.save();
    const reseturl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetpasswordtoken}`
    const message = `Reset your Password By clicking on the link  \n\n ${reseturl}`
    try {
        
        await sendemail({
            email:User.email,
            subject:"Reset Password",
            message,
        })

        res.status(200).json({
            success:true,
            message:`Email has been sent to ${User.email}`,
        })

    } catch (error) {
        User.resetpasswordtoken=undefined;
        User.resetpasswordexpire=undefined;
        await User.save();

        res.status(500).json({
            success:false,
            message:error.message,
        })

        
        
        
    }
    


        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message

        })
        
    }
}

exports.getMyPosts = async(req,res)=>{
    try {
        
        const User = await user.findById(req.user._id);

        const posts=[]
        for(let i=0;i<User.posts.length;i++){
            const post=await Post.findById(User.posts[i]).populate(
                'likes comments.user owner'
            )
            posts.push(post)
        }
        res.status(200).json({
            success:true,
            posts,

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message

        })
        
        
    }
}
exports.getAllUsers = async (req, res) => {
    try {
      const Users = await user.find({
        name: { $regex: req.query.name, $options: "i" },
      });
  
      res.status(200).json({
        success: true,
        Users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
exports.getUserPosts = async(req,res)=>{
    try {
        
        const User = await user.findById(req.params.id);

        const posts=[]
        for(let i=0;i<User.posts.length;i++){
            const post=await Post.findById(User.posts[i]).populate(
                'likes comments.user owner'
            )
            posts.push(post)
        }
        res.status(200).json({
            success:true,
            posts,

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message

        })
        
        
    }
}
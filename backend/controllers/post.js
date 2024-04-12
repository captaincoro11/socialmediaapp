const Post = require('../models/post')
const user = require('../models/user')
const cloudinary = require('cloudinary')
exports.createPost =async(req,res)=>{

    try{
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
            folder:'posts',
        });

        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            owner:req.user._id,



        };

        const post=await Post.create(newPostData);
        const User = await user.findById(req.user._id); 
        User.posts.unshift(post._id) 
        await User.save();
        res.status(201).json({
            success:true,
            message:'Post Created',
     
        })
       
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }


}
exports.deletepost  = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found",
            });
        }
        if(post.owner.toString() !== req.user._id.toString()){

            return res.status(401).json({
                success:false,
                message:"Unauthorized",
            })

        }
        await cloudinary.v2.uploader.destroy(post.image.public_id)
       await post.deleteOne({_id:req.params.id})
        const User = await user.findById(req.user._id);
        const index = User.posts.indexOf(req.params.id);
        User.posts.splice(index,1);
        await User.save();

        res.status(200).json({
            sucess:true,
            message:"Post Deleted",
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}


exports.likeandunlikepost = async (req,res)=>{
    try {

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found",
            });
        }
        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Post Unliked"
            })
        }
        else
        {

            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Post Liked"
            })
        }
       


        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
exports.getpostoffollowing = async(req,res)=>{
    try {
        
        const User = await user.findById(req.user._id);
        const posts = await Post.find({
            owner:{
                $in: User.following,
            }
        }).populate('owner likes comments.user');
        res.status(200).json({
            success:true,
            posts:posts.reverse(),
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}
exports.updatecaption = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            });
        }
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorised"
            })
        }

        post.caption = req.body.caption;
        await post.save();
        res.status(200).json({
            success:true,
            message:"Post Updated Successfully",
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
exports.addcomment = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        let commentexist =-1;
        //Checking if comment already exists

        
        post.comments.forEach((item,index) => {
            if(item.user.toString() === req.user._id.toString()){
                commentexist=index
            }

        });
      if(commentexist !== -1){

        post.comments[commentexist].comment =req.body.comment;
        await post.save();
        return res.status(200).json({
            success:true,
            message:"Comment Updated",
        });
        

      }
      else{
        post.comments.push({
            user:req.user._id,
            comment:req.body.comment,
        });
        await post.save();
        return res.status(200).json({
            success:true,
            message:"Comment Added",
        })
    }

    }
        
  
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
        
   
     }
    
    }

    exports.deletecomment = async(req,res)=>{
        try {

            const post = await Post.findById(req.params.id);
            if(!post){
                return res.status(404).json({
                    success:false,
                    message:"Post not found",
                });
            }
            if(post.owner.toString()===req.user._id.toString()){
                if(req.body.commentId ==undefined){
                    return res.status(400).json({
                        success:false,
                        message:"Comment Id is required"
                    })
                }
                post.comments.forEach((item,index) => {
                    if(item._id.toString() === req.body.commentId.toString()){
                       return post.comments.splice(index,1);
                    }
            })

            await post.save();
            return res.status(200).json({
                success:true,
                message:"Selected Comment has been Deleted"
            })
          

                


            }
            else{
                post.comments.forEach((item,index) => {
                    if(item.user.toString() === req.user._id.toString()){
                       return post.comments.splice(index,1);
                    }
        
                });

                await post.save();
                res.status(200).json({
                    success:true,
                    message:"Your Comment has been Deleted"
                })



            }
            
        } catch (error) {

            res.status(500).json({
                success:false,
                message:error.message
            })
            
        }
    }
const User = require('../models/User');

//Create User
exports.createUser = async(req,res) => {
    try{
        const{firstName,lastName,email,salary} = req.body;

        if(!firstName || !lastName || !email || !salary){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }

        const userDetails = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            salary:salary
        })

        res.status(200).json({
            success:true,
            data:userDetails,
            message:'User created'
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//Get User
exports.getUsers = async(req,res) => {
    try{
        const getUser = await User.find({});

        res.status(200).json({
            success:true,
            data:getUser,
            message:'User fetched successfully'
        })
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//Update User
exports.updateUser = async(req,res) => {
    try{
        const {id} = req.params;

        const{firstName,lastName,email,salary} = req.body;

        if(!firstName || !lastName || !email || !salary)
        {
            return res.status(400).json({
                success:false,
                message:'Missing properties'
            })
        }
    
        const userDetail = await User.findById({_id:id});
    
        if(!userDetail)
        {
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
    
        const updatedUser = await User.findOneAndUpdate(userDetail,{firstName:firstName,lastName:lastName,email:email,salary:salary},{new:true});
    
        res.status(200).json({
            success:true,
            data:updatedUser,
            message:'User updated'
        })
    }catch(error){
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }

}

//Delete User
exports.deleteUser = async(req,res) => {
    try{
        const {id} = req.params;

        const userDetail = await User.findById({_id:id});
    
        if(!userDetail)
        {
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
    
        const updatedUser = await User.findOneAndDelete(userDetail);
    
        res.status(200).json({
            success:true,
            data:updatedUser,
            message:'User deleted'
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
          })
    }
}
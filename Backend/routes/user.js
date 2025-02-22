const express=require('express');
const router=express.Router();
const {user,bank} =require('../database');
const {userschema ,signinschema} =require('../validation');
const authMiddleware =require('../middlware');
const {JWT_SECRET}=require('../config');
const jwt=require('jsonwebtoken');
const zod=require('zod');


router.post('/signup',async (req,res)=>{
    const userdata=req.body;
    const user1=userschema.safeParse(userdata);
    if(!user1.success){
        return res.status(404).json({
            msg:"Wrong Input"
        })
    }
    const existinguser=await user.findOne({
        username:userdata.username
    })
    if(existinguser){
        return res.status(404).json({
            msg:"Already exists"
        })
    }
    const dbuser = await user.create(userdata);
    const userId = dbuser._id;
   
    await bank.create({
        userid:userId,
        balance: 1 + Math.random() * 10000
    })

    const token=jwt.sign({
        userid:dbuser._id

    },JWT_SECRET)
    res.status(200).json({
        msg:"User data is added successfuly",
        token:token
    })
    
})

router.post('/signin',async(req,res)=>{
    const userdata=req.body;
    user1=signinschema.safeParse(userdata);
    if(!user1.success){
        return res.status(404).json({
            msg:"Worng Input"
        })
    }
    const existinguser=await user.findOne({
        username:userdata.username,
        password:userdata.password
    })
    if(!existinguser){
        return res.status(404).json({
            msg:"Wrong inputs"
        })
    }
    const token=jwt.sign({
        userid:existinguser._id,
    },JWT_SECRET)

    res.status(200).json({
        msg:"signin successfuly",
        username:userdata.username,
        token:token
    })

})

router.get('/bulk',async(req,res)=>{
    const users=await user.find();
    res.json({
        user: users.map(u=>({
            _id:u._id,
            username:u.username,
            firstname:u.firstname,
            lastname:u.lastname,
            password:u.password
        })
    )
    })
})
/*
router.put("/", authMiddleware, async (req, res) => {
    

    await data.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})*/

module.exports=router;
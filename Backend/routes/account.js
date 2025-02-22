const express=require('express');
const router=express.Router();
const {user,bank} =require('../database');
const {validate ,signinvalidate} =require('../validation');
const authMiddleware =require('../middlware');
const {JWT_SECRET}=require('../config');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');



router.get('/balance',authMiddleware,async(req,res)=>{
    const user=await bank.findOne({
        userid:req.userid
    })
    if(user){
        return res.json({
            balance:user.balance
        })
    }
})

router.post('/transfer',authMiddleware,async(req,res)=>{
    const user=req.body;
    const sender=await bank.findOne({
        userid:req.userid
    });
    if(!sender || sender.balance<user.amount){
        return res.json({
            msg:"Isufficient!"
        })
    }

    const reciever=await bank.findOne({
        userid:user.to
    });
    if(!reciever){
        return res.json({
            msg:"Wrong reciever"
        })
    }

    //Perform transaction
    await bank.updateOne({
        userid:req.userid
    },{
        $inc: { balance: -user.amount }
    });
    await bank.updateOne({
        userid:user.to
    },{
        $inc: { balance: user.amount }
    });

    res.json({
        message: "Transfer successful"
    });

})

module.exports=router;
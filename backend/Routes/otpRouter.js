const express = require ('express');
const otpRouter = express.Router();
const nodemailer = require('nodemailer');
const userModal = require('../Modals/userModal')

const tp = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"softpro,abbas@gmail.com",
        pass:"ydyiyluofsjsssgg"
    }
});

otpRouter.post('/send_otp',async (req,res)=>{
    const {email} = req.body;
    constuser= await userModal.findOne({email})
    if(!user){
        return res.json({"msg":"User not found"});
    }
    const otp = Math.floor(100000 + Math.random()* 90000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + (5*6*1000);
    user.otpVerified = false;
    await user.save();
    await tp.sendMail({
        from:"softpro.abbas@gmail.com",
    })
});

module.exports = otpRouter;
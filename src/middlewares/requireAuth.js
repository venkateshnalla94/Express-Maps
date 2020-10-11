const express=require('express')
const jwt=require("jsonwebtoken")
const mongoose=require('mongoose')
const User=mongoose.model('User')


module.exports=(req,res,next)=>{
     const {authorization}=req.headers;
     if (!authorization) {
          return res.status(401).send({ error: 'You must be logged in.' });
     }
     const token = authorization.replace('Bearer ', '');
     jwt.verify(token,'My_SecretKey',async (err,payload)=>{
          if(err)
          {
               res.status(401).send({error:"You must be login"})
          }
          /**
           * We are getting the information encoded in JWT token user Provided
           * and retrieving  the _id
           * Once the the _id is received then we can access user details from MongoDB
           */
          const {userId}=payload;
          const user=await User.findById(userId);
          req.user=user;
          next();
     })
}





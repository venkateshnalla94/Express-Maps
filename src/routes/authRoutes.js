const express=require('express')
const jwt=require("jsonwebtoken")
const mongoose=require('mongoose')
const User=mongoose.model('User')
const router=express.Router();

/**
 * Once user Sign ups then we do
 * a pre condition operation of hashing +salting and then saving it in DB
 * After Saving we generate a JWT token for saved instance of user with reference to _id
 */

router.post('/signup',async (req,res)=>{
     const {email,password}=req.body;
     try {
          const user=new User({email,password});
          await user.save();
          const token=jwt.sign({userId:user._id},'My_SecretKey')
          res.send({JWTToken:token})
     }catch (err) {
          return res.status(422).send(err.message)
          console.error("Error in saving Email",err);
     }
})

/**
 * We fetch the email that user Entered
 * and then we pass pwd to comparedPassword method where we bcrypt the user password
 * then after bcrypting we compare it with password saved in db (hashed+salted)
 * if true then promise will be resolved
 * and again we generate a new JWt token to _id of user
 */

router.post('/signin',async (req,res)=>{
     const {email,password}=req.body;
     if(!email||!password){
          res.send({Error:"Insert Both Email and password"});
     }
     const user=await User.findOne({email})
     if(!user){
          res.status(404).send({Error:"Invalid Email or Password"});
     }
     try{
          await user.comparedPassword(password);
          const token=jwt.sign({userId:user._id},'My_SecretKey');
          res.send({JWTToken:token})
     }catch (err) {
          res.status(422).send({Error:"In correct Password"})
          
     }
})



module.exports = router;


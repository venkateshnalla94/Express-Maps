const express=require('express')
const mongoose=require('mongoose')
const User=mongoose.model('User')
const router=express.Router();

router.post('/signup',async (req,res)=>{
     const {email,password}=req.body;
     try {
          const user=new User({email,password});
          await user.save();
          res.send({Type:"You made a signup request"})
     }catch (err) {
          return res.status(422).send(err.message)
          console.error("Error in saving Email",err);
     }
})



module.exports = router;


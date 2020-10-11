const express=require('express')
const requireAuth=require('../middlewares/requireAuth');
const mongoose=require('mongoose')
const Track=mongoose.model("Track")
const router=express.Router();
router.use(requireAuth);
router.get('/tracks',async (req,res)=>{
     try {
     const track=await Track.find({userId:req.user._id});
          res.send({track:track})
     }catch (err) {
          res.status(404).send({error:err})
     }
})

router.post('/tracks',async (req,res)=>{
     const {name,location}=req.body
     if(!name||!location){
          res.status(422).send({error:"Provide name and Location"})
     }
     try {
          const track=new Track({name,location,userId:req.user._id})
          await track.save();
          res.send({track});
     }catch (err) {
          res.status(422).send({error:err.message})
     }
})

module.exports=router;

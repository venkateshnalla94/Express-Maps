const express=require('express')
const mongoose=require('mongoose')
const app=express();
const uri = "mongodb+srv://venkateshnalla94:Venky@007@cluster0.s5ivr.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri,{
     useNewUrlParser: true,
     useCreateIndex:true,
     useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
     console.log("Connected to Mongo DB")
})
mongoose.connection.on('error',(err)=>{
     console.log("Error in Connection",err)
})

app.get('/',(req,res)=>{
     res.send({
          data:"Contact Express"
     })
})

app.listen(3000,()=>{
     console.log("listening on port 3000 ");
})

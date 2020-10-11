const mongoose=require("mongoose");
const pointSchema={
     timeStamp:Number,
     coords:{
          latitude:Number,
          longitude:Number,
          altitude:Number,
          accuracy:Number,
          heading:Number,
          speed:Number
     }
}
const trackSchema=new mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectID,
         ref:'User'
    },
     name:{
          type: String,
          default:''
     },
     location:[pointSchema]
});

mongoose.model("Track", trackSchema);

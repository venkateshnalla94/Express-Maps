const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const userScheme=new mongoose.Schema({
     email:{
          type:String,
          unique:true,
          required:true
     },
     password:{
          type: String,
          required: true
     }
},{
     timestamps: true
});


/**
 * before saving the password to the database
 * we are checking if its modified or not
 * if not
 * we are first salting the password
 * and then if there is no error
 * we're hashing the password with salt
 * After that we're saving it by over riding the user.password
 */

userScheme.pre('save',function (next) {
     const user=this;
     if(!user.isModified('password')){
          return next();
     }
     bcrypt.genSalt(10,(err,salt)=>{
          if(err)
               return next(err);
          bcrypt.hash(user.password,salt,(err,hash)=>{
               if (err)
                    return next(err)
               user.password=hash;
               next();
          })
     })
})

userScheme.methods.comparedPassword=function(user_password){
     const user=this;
     return new Promise((resolve ,reject)=>{
          bcrypt.compare(user_password,user.password,(err,isMatch)=>{
               if(err)
                    return reject(err);
               if(!isMatch)
                    return reject(false);
               resolve(true);
          })
     })

}






 mongoose.model("User", userScheme);

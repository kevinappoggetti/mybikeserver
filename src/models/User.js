const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

  nome:{
    type:String,
    required:true
  },
  cognome:{
    type:String,
    required:true
  },
  datadinascita:{
    type:String,
    required:true
  },
  citta:{
    type:String,
    required:true
  },
  indirizzo:{
    type:String,
    required:true
  },
  cap:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  walletaddress:{
    type:String,
    unique: true, //vogliamo che ogni wallet sia unico
    required:true //ogni user deve avere una mail
  },
  password:{
    type:String,
    required:true
  }
});

userSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')){
    return next();
  } else{
    bcrypt.genSalt(10,(err,salt)=>{
      if(err){
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err,hash)=>{
        if(err){
          return next(err);
        }
        user.password= hash;
        next();
      })
    })
  }
})

userSchema.methods.comparePassword = function(candidatePassword){ //login
  const user = this;
   return new Promise((resolve, reject)=>{
     bcrypt.compare(candidatePassword,user.password,(err, isMatch)=>{
       if(err){
         return reject(err);
       }
       if(!isMatch){
         return reject(false);
       }
       resolve(true);
     });
   })
}

mongoose.model('User', userSchema);

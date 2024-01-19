import mongoose from './index.js'

  const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e);
}

const userSchema = mongoose.Schema({
  
firstName:{type:String,required:[true,"First Name is Required"]},
lastName:{type:String,required:[true,"Last Name is Required"]},
email:{type:String,required:[true,"Email is Required"],validate:validateEmail},
password:{type:String,required:[true,"Password is Required"]},
status:{type:Boolean,default:false},
role:{type:String,default:'user'},
createdAt:{type:Date, default:Date.now()}
    
},{
    __v:false
})

const userModel = mongoose.model('users',userSchema)

export default userModel;

// firstName:{type:String,required:[false,"First Name is Required"]},
// lastName:{type:String,required:[false,"Last Name is Required"]},
// email:{type:String,required:[false,"Email is Required"],validate:validateEmail},
// password:{type:String,required:[false,"Password is Required"]},
// status:{type:Boolean,default:false},
// role:{type:String,default:'user'},
// createdAt:{type:Date, default:Date.now()}
import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true
},
password:{
    type:String,
    required:true,
    trim:true
},
mobileNumber:{
    type:String,
    required:true,
    trim:true
},
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
},
isBlocked:{
    type:Boolean,
    default:false
}
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

export default User;
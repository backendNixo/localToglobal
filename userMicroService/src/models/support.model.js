import mongoose from "mongoose";

const SupportSchema=new mongoose.Schema({
fullname:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true
},
mobileNumber:{
    type:String,
    required:true,
    trim:true
},
subject:{
    type:String,
    required:true,
},
message:{
    type:String,
    required:true,
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
}
},{timestamps:true});

const Support=mongoose.model("Support",SupportSchema);

export default Support;
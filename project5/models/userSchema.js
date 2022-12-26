//jshint esversion:6
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:"string",
      
        required:true
    },
    lastName:{
        type:"string",
      
        required:true
    },
    username:{
        type:"string",
        
        required:true
    },
    password:{
        type:"string",
    },
    mobile:{
        type:"Number",
       
        required:true
    },
    adharNo:Number,
    adharImg:String,
    typeOfPerson:{
        type:"string",
        default:'none',
        required:true
    },
    verified:{
        type:"string",
        default:'no'
    }
});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('userModel',userSchema);
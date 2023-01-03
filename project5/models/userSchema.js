//jshint esversion:6
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:"string",
        required: [true, 'first Name required']
    },
    lastName:{
        type:"string",
        required: [true, 'Last Name required']
    },
    username:{
        type:"string",
        required: [true, 'Username required']
    },
    password:{
        type:"string",
    },
    mobile:{
        type:"Number",
        required:[true,'MObile Number required'],
            min: 100000000,
            max: 999999999
    },
    adharNo:{
        type:Number,
        required:[true,'MObile Number required'],
        min: 10000000000,
        max: 99999999999
    },
    adharImg:{
        type:String,
    },
    typeOfPerson:{
        type:"string",
        default:'none',
        required:true
    },
    verified:{
        type:"string",
        default:'no'
    },
    age:{
        type:String
    },
    gender:{
        type:String
    },
    skills:{
        type:String
    },
    availability:{
        type:String
    },
    profileImg:{
        type:String
    },
});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('userModel',userSchema);
//jshint esversion:6
const mongoose = require('mongoose');
const citizenSchema = new mongoose.Schema({ 
    area:{
        type:String,
        required:true
    },
    building:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    }, 
    subject:{
        type:String,
        required:true
    },
    complaint:{
        type:String,
        required:true
    },
   
    // brokenImg:{
    //     type:Image,
    //     required:true
    // },
   
});

const citizen = new mongoose.model('citizen',citizenSchema);
module.exports=citizen;
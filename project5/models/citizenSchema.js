//jshint esversion:6
const mongoose = require('mongoose');
const citizenSchema = new mongoose.Schema({ 
    area:{
        type:String,
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
    brokenImg: { 
       type:String
     },
     date: { 
         type: Date, 
        default: Date().split('G')[0]
    },
     progress:{
        type:"string",
        default:'Complaint Lodged!'
    },
    assigned:{
        type:"string",
        default:'no'
    },
     assignedTo :{
         type:String
     },
     complaintBy :{
        type:String
     },
     acceptedByOff:{
         type:String,
         default:'yes'
     },
     reassigned:{
         type:String,
         default:"no"
     }
});

const citizen = new mongoose.model('citizen',citizenSchema);
module.exports=citizen;
//jshint esversion:6
const mongoose = require('mongoose');
const citizenSchema = new mongoose.Schema({ 
    area:{
        type:String,
    },
    building:{
        type:String,
        required:"Select Bulding"
    },
    room:{
        type:String,
        required:"Put room number"
    }, 
    subject:{
        type:String,
        required:"Select Subject"
    },
    complaint:{
        type:String,
        required:"Put Detail of a complaint"
    },
    brokenImg: { 
       type:String
     },
     date: { 
         type: Date, 
        default: Date()
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
     acceptedBytech:{
         type:String,
         default:'no'
     },
     rejectedByTech:{
        type:String,
        default:'no'
     },
     whyRejetedBytech:{
         type:String,
     },
     whyRejectedByOff:{
         type:String,
     },
     reassigned:{
         type:String,
         default:"no"
     },
     reassignedTo:{
         type:String
     },
     reassigned:{
         type:String,
         default:"no"
     },
     resolved:{
         type:String,
         default:"no"
     }

});

const citizen = new mongoose.model('citizen',citizenSchema);
module.exports=citizen;
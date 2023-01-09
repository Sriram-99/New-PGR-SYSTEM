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
     assignedBy :{
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
     rejectedByOff:{
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
     resolvedByTech:{
         type:String,
         default:"no"
     },
     resolvedByOff:{
         type:String,
         default:"no"
     },
     resolvedByCiti:{
         type:String,
         default:"no"
     },
     issue:{
         type:String
     },
     issueImg:{
        type:String
     },
     fixedImg:{
         type:String
     },
     resolvedTime:{
        type: Date, 
        default: Date()
     }

});

const citizen = new mongoose.model('citizen',citizenSchema);
module.exports=citizen;
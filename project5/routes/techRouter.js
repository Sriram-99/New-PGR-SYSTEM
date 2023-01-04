//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const complaintModel = require('../models/citizenSchema');
const flash = require('connect-flash');
const { findByIdAndUpdate } = require('../models/userSchema');
// const e = require('connect-flash');

router.get('/technician/:username', (req, res) => {
    if (req.isAuthenticated()) {
        const data ={};
        data.user = req.user;
        complaintModel.find({},(err,found)=>{
            if(err)console.log(err);
            else{
                res.render('technician',{user:data.user,complaint:found,message:req.flash('message')});
            }  
        });
    } else {
        res.redirect('/');
    }
});

router.post('/acceptByTech/:id',(req,res)=>{
    const id = req.params.id;
    complaintModel.findByIdAndUpdate({_id:id},{progress:"Complaint has been Accepted by Technician!",
     acceptedBytech:"yes",reassigned:"no",rejectedByTech:'no'},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.assignedTo;
            req.flash('message','Complaint has been Accepted!');
            res.redirect('/technician/'+username);
        }
        
    });
});
router.post('/rejectByTech/:id',(req,res)=>{
    const id = req.params.id;
    const reason = req.body.whyRejetedBytech;
    complaintModel.findByIdAndUpdate({_id:id},{progress:"Complaint has been Rejected By Technician!",
    whyRejetedBytech:reason,rejectedByTech:'yes',acceptedBytech:"no",reassigned:"no"},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.assignedTo;
            req.flash('message','Complaint has been Rejected!');
            res.redirect('/technician/'+username);
        }
        
    });
});
router.post('/resolved/:id/:username',(req,res)=>{
    const id = req.params.id;
    const username = req.params.username;
    complaintModel.findByIdAndUpdate({_id:id},{progress:"Complaint has been Resolved!", resolvedByTech:"yes"},
        (err,found)=>{
        if(err) console.log(err);
        else{
            req.flash('message','Complaint has been Resolved!');
            res.redirect('/technician/'+username);
        }
        
    });
});
router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));



module.exports = router;
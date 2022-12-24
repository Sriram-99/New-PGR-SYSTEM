//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const complaintModel = require('../models/citizenSchema');
const flash = require('connect-flash');
const e = require('connect-flash');

router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/assignOff/:username', (req, res) => {
    const usernameAssign = req.params.username;
    if (req.isAuthenticated()) {
        const data ={};
        data.user = req.user;
        userModel.find ({},(err,foundusers)=>{
            if(err) console.log(err);
            complaintModel.find({},(error,foundcomplaints)=>{
                if(err) console.log(error);
                res.render('Assigning',{profile:data.user,users:foundusers,complaints:foundcomplaints,message:req.flash('message'),assignedBy:usernameAssign});
            });
        });
       
    } else {
        res.redirect('/');
    }
});

router.post('/assignedTo/:id/:assignedBy',(req,res)=>{
    const to = req.body.assignedTo;
    const by = req.params.assignedBy;
    const id = req.params.id;
    complaintModel.findByIdAndUpdate({_id:id},{ assignedTo:to,  progress:"complaint has been Assigned", assigned:"yes"},
    (err,found)=>{
        if(err) console.log(err);
        else{
            req.flash('message','Complaint has been Assigned!');
            res.redirect('/assignOff/'+by);
        }
    });
});

module.exports = router;
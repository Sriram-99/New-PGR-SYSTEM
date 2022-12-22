//jshint esversion:6
const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');
const citizenModel = require("../models/citizenSchema");
const flash = require('connect-flash');

router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/citizen',(req,res)=>{
    const citizenComplaint = new citizenModel({
        area:req.body.area,
        building:req.body.building,
        room:req.body.room, 
        subject:req.body.subject,
        complaint:req.body.complaint,
        brokenImg: req.body.brokenImg
    });
    try {
        citizenComplaint.save();
        req.flash('message','Complaint has been lodge!');
        res.redirect('/citizen');
    } catch (error) {
        console.log(error);
    }
});

router.get('/citizen', (req, res) => {
    if (req.isAuthenticated()) {
        const data ={};
        data.user = req.user;
        res.render('citi2',{profile:data.user,message:req.flash('message')});
    } else {
        res.redirect('/');
    }
});

module.exports = router;
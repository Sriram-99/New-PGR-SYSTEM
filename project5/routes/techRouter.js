//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const complaintModel = require('../models/citizenSchema');
const flash = require('connect-flash');
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

router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));



module.exports = router;
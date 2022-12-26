//jshint esversion:6
const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');
const citizenModel = require("../models/citizenSchema");
const userModel = require('../models/userSchema');
const flash = require('connect-flash');
const multer = require('multer');
const path = require('path');
// var fs = require('fs');
// router.use(express.static('public'));
router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));

const storage = multer.diskStorage({
    destination:"public/brokenImg",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
}).single('brokenImg');


router.post('/citizen/:username',upload,(req,res)=>{
    const username=req.params.username;
    const citizenComplaint = new citizenModel({
        area:req.body.area,
        building:req.body.building,
        room:req.body.room, 
        subject:req.body.subject,
        complaint:req.body.complaint,
        complaintBy:req.body.complaintBy,
        brokenImg: req.file.filename
    });
    try {
        citizenComplaint.save(()=>{console.log("saved Complaint!")});
        req.flash('message','Complaint has been lodge!');
        res.redirect('/citizen/'+ username);
    } catch (error) {
        console.log(error);
    }
});

router.get('/citizen/:username', (req, res) => {
    if (req.isAuthenticated()) {
            userModel.findOne({username:req.params.username},(error,founduser)=>{
                citizenModel.find({},(err,found)=>{
                if(error) console.log(error);
                else{
                     if(err) console.log(err);
                  else{
                res.render('citi2',{user:founduser,message:req.flash('message'),complaint:found});
                      }
                }     
            });
           
        });
       
    } else {
        res.redirect('/');
    }
});
router.post('/deleteComplaint/:itemId',(req, res)=>{
    const id = req.params.itemId;
    citizenModel.findByIdAndDelete({_id:id},(err)=>{
         if(err){
             console.log(err);
         }else{
             res.redirect('/citizen');
             console.log('deleted');
         }
     });
 });
module.exports = router;
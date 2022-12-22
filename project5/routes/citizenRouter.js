//jshint esversion:6
const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');
const citizenModel = require("../models/citizenSchema");
const flash = require('connect-flash');
var fs = require('fs');
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
    // citizenComplaint.brokenImg.data = fs.readFileSync(req.body.brokenImg);
    // citizenComplaint.brokenImg.contentType = 'image/png';
    try {
        citizenComplaint.save(()=>{console.log("saved Complaint!")});
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
        citizenModel.find({},(err,found)=>{
            if(err) console.log(err);
            else{
                res.render('citi2',{profile:data.user,message:req.flash('message'),complaint:found});
            }
            
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
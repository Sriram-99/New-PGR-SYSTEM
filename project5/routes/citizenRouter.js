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

// const storage = multer.diskStorage({
//     destination:"public/brokenImg",
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage:storage
// }).single('brokenImg');

router.post('/citizen/:username', async(req,res)=>{
    const username=req.params.username;
    const citizenComplaint = new citizenModel({
        area:req.body.area,
        building:req.body.building,
        room:req.body.room, 
        subject:req.body.subject,
        complaint:req.body.complaint,
        complaintBy:req.body.complaintBy,
        // brokenImg: req.file.filename
    });
          await citizenComplaint.save((err)=>{
            if(err) console.log(err);
            else{
                req.flash('message','Complaint has been lodge!');
                res.redirect('/citizen/'+ username);
            } 
        });
            
        
    //  }
        
  
});

router.get('/citizen/:username', (req, res) => {
    if (req.isAuthenticated()) {
            userModel.findOne({username:req.params.username},(error,founduser)=>{
                if(error) console.log(error);
                else{
                citizenModel.find({},(err,found)=>{
                     if(err) console.log(err);
                  else{
                res.render('citi2',{user:founduser,message:req.flash('message'),complaint:found});
                      }
            });
        }
        });
       
    } else {
        res.redirect('/');
    }
});
router.post('/deleteComplaint/:itemId/:username',(req, res)=>{
    const id = req.params.itemId;
    const username = req.params.username;
    citizenModel.findByIdAndDelete({_id:id},(err,found)=>{
         if(err){
             console.log(err);
         }else{
            req.flash('message','Complaint has been deleted!');
            res.redirect('/citizen/'+ username);
         }
     });
 });

 router.post('/doneByCiti/:id/:doneBy',(req,res)=>{
    const id = req.params.id;
    const by = req.params.doneBy;
    citizenModel.findByIdAndUpdate({_id:id},{resolvedByCiti:"yes", progress:"Person who lodged complaint is satisfied!"},
    (err,found)=>{
        if(err) console.log(err);
        else{
            req.flash('message','Complaint has been marked done!');
            res.redirect('/citizen/'+by);
        }
    });
});

 router.post('/issueSend/:id/:doneBy',(req,res)=>{
    const id = req.params.id;
    const by = req.params.doneBy;
    citizenModel.findByIdAndUpdate({_id:id},{resolvedByTech:"no", progress:"Issue Raised by Person who lodged complaint!",issue:req.body.issue},
    (err,found)=>{
        if(err) console.log(err);
        else{
            req.flash('message','Issue has been raised!');
            res.redirect('/citizen/'+by);
        }
    });
});

module.exports = router;
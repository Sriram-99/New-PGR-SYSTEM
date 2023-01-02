//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const multer = require('multer');
const path = require('path');
router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));

const storage = multer.diskStorage({
    destination:"public/profile",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
}).single('profileImg');



router.get('/:username/profile', (req, res) => {
    const username= req.params.username;
    if (req.isAuthenticated()) {
    userModel.findOne({username:username},(err,found)=>{
        if(err) console.log(err);
        else{
            res.render('profile',{user:found,message:req.flash('message')});
        }
    });
}
else{
    res.redirect('/');
}
});

router.post('/:id/edit/age',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{age:req.body.age},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','Age has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});
router.post('/:id/edit/gender',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{gender:req.body.gender},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','Gender has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});
router.post('/:id/edit/skills',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{skills:req.body.skills},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','skill set has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});
router.post('/:id/edit/availability',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{availability:req.body.availability},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','availabile Hours has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});
router.post('/:id/edit/adharNo',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{adharNo:req.body.adharNo},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','identity Number has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});

router.post('/:id/edit/adharNo',(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{adharNo:req.body.adharNo},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','identity Number has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});
router.post('/:id/edit/profileImg',upload,(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id},{profileImg:req.file.filename},
        (err,found)=>{
        if(err) console.log(err);
        else{
            const username = found.username;
            req.flash('message','profile Picture has been edited!');
            res.redirect('/'+username+'/profile');
        }
    });
});

module.exports = router;
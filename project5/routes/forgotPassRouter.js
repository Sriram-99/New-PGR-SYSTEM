//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const fs = require('fs');

router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));


// const JWT_SECRET = process.env.JWT_SECRET;
router.post('/resetPass/:id', (req, res, next) => {
    const id = req.params.id;
    userModel.findOne({
        _id: id
    }, (err, found) => {
        if (!found) {
            req.flash('message', 'No such user found!');
            res.redirect('/forgotPass');
        }
        if (err) {
            console.log(err);
        } else if (found) {
            if(req.body.confirmNewpassword === req.body.newpassword){
            found.setPassword(req.body.newpassword, (err, users) => {
                if (err) console.log(err);
                else {
                    userModel.updateOne({_id: users._id}, {hash: users.hash,salt: users.salt},
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash('message', 'Password Reset!');
                                res.redirect('/resetPass/'+id);
                            }
                        });
                }

            });
        }
        else{
            req.flash('message', 'Password not Matched!');
            res.redirect('/resetPass/'+id);
        }
        }

    });

});

let mailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: "trupteeundre49@gmail.com",
        pass: "Truptee@123"
    }
});
router.post('/forgotPass', (req, res, next) => {
    const username = req.body.username;
    userModel.findOne({
        username: username
    }, (err, found) => {
        if (err) console.log(err);
        if(!found)
        {
            req.flash('message','No such user found!');
            res.redirect('/forgotPass');
        }
       else if(found){
        //    let mailDetails = {
        //        from:"trupteeundre492002@gmail.com",
        //        to:"trupteeundre49@gmail.com",
        //        subject:'Password reset link!',
        //        text:`http://localhost:3000/resetPass/${found._id}`
        //    }
        //    mailTransporter.sendMail(mailDetails,(err,data)=>{
        //        if(err) console.log(err);
        //        else{
        //         req.flash('message','Reset password link has been sent to your email!!');
        //         res.redirect('/forgotPass');
        //        }
        //    })
            const link = `http://localhost:3000/resetPass/${found._id}`;
            console.log(link);
            req.flash('message','Reset password link has been sent to your email!!');
            res.redirect('/forgotPass');
           
        }
    });
});
router.get('/forgotPass', (req, res) => {
    res.render('forgot password', {
        message: req.flash('message')
    });
});
router.get('/resetPass/:id', (req, res) => {
    res.render('resetPass', {message:req.flash('message')});
});
module.exports = router;
//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');

router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));
const JWT_SECRET = "thisisasecret";
router.post('/forgotPass', (req, res, next) => {
    const username = req.body.username;

    userModel.findOne({username: username}, (err, found) => {
        if (!found) {
             req.flash('message','No such user found!');
            res.redirect('/forgotPass');
        }
        if (err) {
            console.log(err);
        } else if(found){
            //creating one time link
            const secret = JWT_SECRET + found.password;
            const payload = {
                email: found.username,
                // id:found._id
            };
            const token = jwt.sign(payload, secret, {
                expiresIn: '15m'
            });
            const link = `http://localhost:3000/resetPass/${found._id}/${token}`;
            console.log(link);
            req.flash('message','Link has been sent to your email!');
            res.redirect('/forgotPass');
        }

    });

});
router.get('/resetPass/:id/:token', (req, res, next) => {
    const id = req.params.id;
    const token=req.params.token;
    userModel.findOne({
        _id: id
    }, (err, found) => {
        if (err) console.log(err);
        else {
            const secret = JWT_SECRET + found.password;
            try {
                const payload = jwt.verify(token, secret);
                res.render('forgot username',{name:found.firstName});
            } catch (error) {
                console.log(error.message);
            }
        }
    });

});
router.post('/resetPass/:id/:token', (req, res, next) => {
    const id = req.params.id;
    const token=req.params.token;
    userModel.findOne({
        _id: id
    }, (err, found) => {
        if (err) console.log(err);
        else {
            const secret = JWT_SECRET + found.password;
            try {
                const payload = jwt.verify(token, secret);
                found.password = req.body.newpassword;
                res.send(found);
            } catch (error) {
                console.log(error.message);
            }
        }
    });
});
router.get('/forgotPass', (req, res) => {
    res.render('forgot password',{message:req.flash('message')});
});
router.get('/resetPass', (req, res, next) => {
    res.render('forgot username',{name:"Trup"});
});
module.exports = router;
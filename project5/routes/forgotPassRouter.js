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
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/forgotPass', (req, res, next) => {
    const username = req.body.username;

    userModel.findOne({
        username: username
    }, (err, found) => {
        if (!found) {
            req.flash('message', 'No such user found!');
            res.redirect('/forgotPass');
        }
        if (err) {
            console.log(err);
        } else if (found) {
            found.setPassword(req.body.newpassword, (err, users) => {
                if (err) console.log(err);
                else {
                    userModel.updateOne({_id: users._id}, {hash: users.hash,salt: users.salt},
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash('message', 'Password Reset!');
                                res.redirect('/forgotPass');
                            }
                        });
                }

            });
        }

    });

});
router.get('/forgotPass', (req, res) => {
    res.render('forgot password', {
        message: req.flash('message')
    });
});
router.get('/resetPass', (req, res, next) => {
    res.render('forgot username', {
        name: "Trup"
    });
});
module.exports = router;
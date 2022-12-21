//jshint esversion:6
const userModel = require('../models/userSchema');
const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/',(req,res)=>{
    
    const user = new userModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        password:req.body.password,
        mobile:req.body.mobile,
        typeOfPerson:req.body.typeOfPerson
    });
    // user.save(()=>{
    //     res.render('test');
    //     console.log('Saved!!');
    // });
    userModel.register({user}, req.body.password, (err,user)=>{
        if(err){
          console.log(err);
          const data = {};
          data.user = req.user;
          console.log(user);
          res.render('registration',{user});
        }
        else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/citizen');
            });
        }
    });

});

router.get('/citizen',(req,res)=>{
    if(req.isAuthenticated()){
        const data ={};
        data.user = req.user;
          res.render('test',{data});
      }else{
          res.render('login vth password');
      }
});
module.exports = router;
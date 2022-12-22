//jshint esversion:6
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const citizenRouter = require('./routes/citizenRouter');
const forgotPassRouter = require('./routes/forgotPassRouter');
const userModel = require('./models/userSchema');
const session = require('express-session');
const passport = require('passport');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect(process.env.MONGODB_ON, {
//     useNewUrlParser: true,  useUnifiedTopology: true
// }).then(()=>{console.log("DB connected!!")}).catch((err)=>{console.log(err)});

//mongoose connect
mongoose.connect(process.env.MONGODB_LOCAL, {useNewUrlParser: true}).then(()=>{console.log("DB connected!!")}).catch((err)=>{console.log(err)});

passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.post('/', (req, res) => {
    const username = req.body.username;
    const userno = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
        typeOfPerson: req.body.typeOfPerson
    });
    userModel.register(userno, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            const data = {};
            data.user = req.user;
            console.log(user);
            res.render('registration', {
                user
            });
        } else {
            passport.authenticate('local')(req, res, () => {
                userModel.findOne({username:username},(err,found)=>{
                    if(err){
                        console.log("no such user!!");
                    }
                    if(found.typeOfPerson === "citizen")res.redirect('/citizen');
                    if(found.typeOfPerson === "assigningOfficer")res.redirect('/assignOff');
                   else if(found.typeOfPerson === "technician")res.redirect('/technician');
                });
                
            });
        }
    });
});
app.post('/login', (req, res) => {
    const username = req.body.username;
    const userno = new userModel({
        username: req.body.username,
        password: req.body.password
    });
    req.login(userno, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                userModel.findOne({username:username},(err,found)=>{
                    if(err){
                        console.log("no such user!!");
                    }
                    if(found.typeOfPerson === "citizen")res.redirect('/citizen');
                    if(found.typeOfPerson === "assigningOfficer")res.redirect('/assignOff');
                   else if(found.typeOfPerson === "technician")res.redirect('/technician');
                });
                
            });
        }
    });
});
app.get('/assignOff', (req, res) => {
    if (req.isAuthenticated()) {
        const data ={};
        data.user = req.user;
        res.render('Assigning',{profile:data.user});
    } else {
        res.redirect('/');
    }
});
app.get('/technician', (req, res) => {
    if (req.isAuthenticated()) {
        const data ={};
        data.user = req.user;
        res.render('technician',{profile:data.user});
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res, next)=>{
    req.logout((err)=> {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
app.get('/', (req, res) => {
    res.render('login vth password');
});

app.get('/forgotUsername', (req, res) => {
    res.render('forgot username');
});
app.get('/registration', (req, res) => {
    res.render('registration');
});
app.use(citizenRouter);
app.use(forgotPassRouter);

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log('Server running at port 3000');
});
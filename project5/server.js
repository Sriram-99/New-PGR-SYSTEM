//jshint esversion:6
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const citizenRouter = require('./routes/citizenRouter');
const forgotPassRouter = require('./routes/forgotPassRouter');
const adminRouter = require('./routes/adminRouter');
const assignRouter = require('./routes/assignRouter');
const techRouter = require('./routes/techRouter');
const userModel = require('./models/userSchema');
const citizenModel = require('./models/citizenSchema');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const e = require('connect-flash');
const multer = require('multer');

app.use(flash());
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

const storage = multer.diskStorage({
    destination:"public/adhar",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
}).single('adharImg');

app.post('/', upload,(req, res) => {
    const username = req.body.username;
    const userno = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
        adharNo:req.body.adharNo,
        adharImg:req.file.filename,
        typeOfPerson: req.body.typeOfPerson
    });
    const originalPass = req.body.password;
    const confirmPass = req.body.confirmPass;
    if(confirmPass !== originalPass)
    {
        req.flash('message','Confirm Pass not matched!');
       res.redirect('/registration');
    }
else{
    userModel.register(userno, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            const data = {};
            data.user = req.user;
            console.log(user);
            req.flash('message','something is wrong');
            res.render('registration', {
                user, message:req.flash('message')
            });
        } else {
            passport.authenticate('local')(req, res, () => {
                userModel.findOne({username:username},(err,found)=>{
                    if(err){
                        console.log("no such user!!");
                    }
                    if(found.typeOfPerson === "citizen")res.redirect('/citizen/'+ username);
                    if(found.typeOfPerson === "assigningOfficer")
                    {   if(found.verified === 'yes')  res.redirect('/assignOff/' + username);
                        else{
                            req.flash('message','Verification Takes some days!');
                            res.redirect('/registration');
                        }   
                    }
                    if(found.typeOfPerson === "admin")res.redirect('/admin');
                   else if(found.typeOfPerson === "technician")
                   {   if(found.verified === 'yes')  res.redirect('/technician/'+ username);
                   else{
                       req.flash('message','Verification Takes some days!');
                       res.redirect('/registration');
                   }   
               }
                });
                
            });
        }
    });
}   
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
        } 
        else {
            passport.authenticate('local')(req, res, () => {
                userModel.findOne({username:username},(err,found)=>{
                    if(err){
                        console.log("no such user!!");
                    }
                    if(found.typeOfPerson === "citizen")res.redirect('/citizen/' + username);
                    if(found.typeOfPerson === "assigningOfficer")
                    {   if(found.verified === 'yes')  res.redirect('/assignOff/' + username);
                    else{
                        req.flash('message','Verification Takes some days!');
                        res.redirect('/');
                    }   
                }
                    if(found.typeOfPerson === "admin")res.redirect('/admin');
                   else if(found.typeOfPerson === "technician")
                   {   if(found.verified === 'yes')  res.redirect('/technician/'+ username);
                   else{
                       req.flash('message','Verification Takes some days!');
                       res.redirect('/');
                   }   
               }
                });
                
            });
        }
    });
});
// app.get('/assignOff', (req, res) => {
//     if (req.isAuthenticated()) {
//         const data ={};
//         data.user = req.user;
//         res.render('Assigning',{profile:data.user});
//     } else {
//         res.redirect('/');
//     }
// });
// app.get('/technician/:username', (req, res) => {
//     if (req.isAuthenticated()) {
//         const data ={};
//         data.user = req.user;
//         res.render('technician',{profile:data.user});
//     } else {
//         res.redirect('/');
//     }
// });

app.get('/logout', (req, res, next)=>{
    req.logout((err)=> {
      if (err) { return next(err); }
      else{
          req.flash('message','You have been log Out!!');
           res.redirect('/');
      }
     
    });
  });
app.get('/', (req, res) => {
    res.render('login vth password',{message:req.flash('message')});
});

app.get('/forgotUsername', (req, res) => {
    res.render('forgot username');
});
app.get('/forgotUsername', (req, res) => {
    res.render('forgot username');
});

app.get('/registration', (req, res) => {
    res.render('registration',{message:req.flash('message')});
});
app.get('/about', (req, res) => {
    res.render('about us');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/profile', (req, res) => {
    res.render('profile');
});

app.use(citizenRouter);
app.use(forgotPassRouter);
app.use(adminRouter);
app.use(assignRouter);
app.use(techRouter);

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log('Server running at port 3000');
});
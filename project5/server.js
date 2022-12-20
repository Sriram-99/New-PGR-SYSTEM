//jshint esversion:6
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('login vth password');
});
app.get('/forgotPass',(req,res)=>{
    res.render('forgot password');
});
app.get('/forgotUsername',(req,res)=>{
    res.render('forgot username');
});
app.get('/registration',(req,res)=>{
    res.render('registration');
});

app.listen(3000,()=>{
    console.log('Server running at port 3000');
});

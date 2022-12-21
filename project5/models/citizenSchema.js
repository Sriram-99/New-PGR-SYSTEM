//jshint esversion:6
const mongoose = require('mongoose');
const citizenSchema = new mongoose.Schema({
    
});

const citizen = new mongoose.model('citizen',citizenSchema);
module.exports=citizen;
//jshint esversion:6
const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');
const citizenModel = require("../models/citizenSchema");
const flash = require('connect-flash');

router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('',(req,res)=>{

});


module.exports = router;
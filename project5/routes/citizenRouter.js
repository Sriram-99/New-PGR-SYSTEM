//jshint esversion:6
const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));



module.exports = router;
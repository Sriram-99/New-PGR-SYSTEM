//jshint esversion:6
const express = require('express');
const router = express.Router({
    mergeParams: true
});
const bodyParser = require('body-parser');
const userModel = require('../models/userSchema');
const complaintModel = require('../models/citizenSchema');
const flash = require('connect-flash');
const {
    findByIdAndUpdate
} = require('../models/userSchema');
// const e = require('connect-flash');
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const pdf = require('html-pdf');
const ejs = require('ejs');
router.get('/technician/:username', (req, res) => {
    if (req.isAuthenticated()) {
        const data = {};
        data.user = req.user;
        complaintModel.find({}, (err, found) => {
            if (err) console.log(err);
            else {
                res.render('technician', {
                    user: data.user,
                    complaint: found,
                    message: req.flash('message')
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post('/acceptByTech/:id', (req, res) => {
    const id = req.params.id;
    complaintModel.findByIdAndUpdate({
            _id: id
        }, {
            progress: "Complaint has been Accepted by Technician!",
            acceptedBytech: "yes",
            reassigned: "no",
            rejectedByTech: 'no'
        },
        (err, found) => {
            if (err) console.log(err);
            else {
                const username = found.assignedTo;
                req.flash('message', 'Complaint has been Accepted!');
                res.redirect('/technician/' + username);
            }

        });
});
const storage = multer.diskStorage({
    destination: "public/fixedImg",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('fixedImg');




router.post('/rejectByTech/:id', (req, res) => {
    const id = req.params.id;
    const reason = req.body.whyRejetedBytech;
    complaintModel.findByIdAndUpdate({
            _id: id
        }, {
            progress: "Complaint has been Rejected By Technician!",
            whyRejetedBytech: reason,
            rejectedByTech: 'yes',
            acceptedBytech: "no",
            reassigned: "no"
        },
        (err, found) => {
            if (err) console.log(err);
            else {
                const username = found.assignedTo;
                req.flash('message', 'Complaint has been Rejected!');
                res.redirect('/technician/' + username);
            }

        });
});
router.post('/resolved/:id/:username', upload, (req, res) => {
    const id = req.params.id;
    const username = req.params.username;
    const fixedImg = req.file.filename;
    complaintModel.findByIdAndUpdate({
            _id: id
        }, {
            progress: "Complaint has been Resolved!",
            resolvedByTech: "yes",
            fixedImg: fixedImg
        },
        (err, found) => {
            if (err) console.log(err);
            else {
                userModel.findById(found.complaintBy,(err,citizen)=>{
                    if(err) console.log(err)
                    else{
                        const data = {
                            item: found,citizen:citizen
                        }
                        const filepathName = path.resolve(__dirname, '../views/pdf.ejs');
                        const htmlString = fs.readFileSync(filepathName).toString();
                        let options = {
                            format: 'Letter'
                        }
                        const ejsData = ejs.render(htmlString, data);
                        pdf.create(ejsData, options).toFile('public/pdfs/users.pdf', (err, response) => {
                            if (err) console.log(err);
                            else {
                                req.flash('message', 'Complaint has been Resolved!');
                                res.redirect('/technician/' + username);
                            
                            }
                        })
                    }
                    
                })
            }

        });
});
router.use(flash());
router.use(bodyParser.urlencoded({
    extended: true
}));



module.exports = router;
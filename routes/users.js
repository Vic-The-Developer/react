var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var multer = require('multer');
var fileupload = require('express-fileupload');
router.use(fileupload());

require("express-validator");
router.use(bodyParser.json());


// storage of pics
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/apartment_media/'+user._id);
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
});

/*
 * POST register
 */
router.post('/register', function (req, res) {

    var photos = req.body.image;

    console.log(photos);

    // storage of pics
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
        callback(null,'images/');
        },
        filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now())+ path.extname(file.originalname);
        }
    });

    var upload = multer({ storage : storage }).array(photos);

    if (!fs.existsSync(dir)){
        var dir ='images/';
        fs.mkdirSync(dir, { recursive: true });
        
        upload(req,res,function(err) {
            //console.log(req.body);
            //console.log(req.files);
            if(err) {
                return console.log("Error uploading file.");
            }
            console.log("File is uploaded");
        });
    }

    

    console.log('Saved successfully!!')
    res.send('Saved successfully!!')



});

// Exports
module.exports = router;

var express = require('express');
var app = express();
const PORT = 5000;
var cors = require('cors');
app.use(cors());
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var config = require('./config/database');
var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var path = require('path');
var resizeImg = require('resize-img');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Express fileUpload middleware
app.use(fileUpload());

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));


// Set public folder
app.use('/images', express.static('images')); 

//Set routes
var users = require('./routes/users.js');
app.use('/users', users);

//create an async function for creating dir and saving photos to their respective databases
//save to mongo, acquire _id then create dir of that _id and upload pics there


app.post('/users/register', (req, res)=>{

})

app.listen(PORT, ()=>{
    console.log(`Server is running and listening on port ${PORT}`);
})
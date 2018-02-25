const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const Promise = require("bluebird");

const secretKey = 'ThisIsServerSecret';

const {signUpMail} = require('./serverFiles/signUpMail');
const {hash} = require('./serverFiles/g_hash');
const {addUser} = require('./serverFiles/addUser');
const {sendMail} = require('./serverFiles/sendMail');

const key = "TeamBifid"

const port = process.env.PORT || 8000;

var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/signup', (req, res) => {
    res.render('login.hbs');
});

app.get('/login', (req, res) => {
    res.render('login.hbs');
});

app.post('/sendMail', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.post('/signup', (req, res) => {
    
    // Set up an object to send mail
    var details = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        key: req.body.key,
        pass: req.body.password
    };

    // Hash the password
    var newPass = hash(req.body.password, secretKey);
    var newKey = hash(req.body.key, secretKey);
    req.body.password = newPass;
    req.body.key = newKey;

    // Save to the database
    
    addUser(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.render('login.hbs', {registered: 'There was some error!'});
        }
        // Send a mail to confirm signup
        signUpMail(details,(err,info) => {
            if (err) {
                console.log(err);
                return res.render('login.hbs', {registered: 'There was some error!'});
            }
            res.render('login.hbs', {registered: 'You are registered. Check your email!'});
        });
    });

});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})
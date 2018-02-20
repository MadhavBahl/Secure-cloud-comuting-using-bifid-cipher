const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const {signUpMail} = require('./serverFiles/signUpMail');
const {hash} = require('./serverFiles/g_hash');

// const key = [ [ 'X', 'A', 'P', 'U', 'F'], ['N', 'C', 'G', 'Y', 'K'], ['I', 'Z', 'E', 'O', 'M'], ['B', 'L', 'W', 'V', 'R'], ['D', 'H', 'Q', 'T', 'S']];
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

app.post('/signup', (req, res) => {
    var details = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        key: req.body.key,
        pass: req.body.password
    };
    let newPass = hash(req.body.password);
    signUpMail(details,(err,info) => {
        // if (err) {
        //     console.log(err);
        //     return res.render('login.hbs', {registered: 'There was some error!'});
        // }
        res.render('login.hbs', {registered: `Hashed Password: ${newPass}`});
    });
    
});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})
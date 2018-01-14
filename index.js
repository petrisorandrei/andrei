const express = require('express');
let nodemailer = require('nodemailer');
const sendmail = require('sendmail')();

const app = express();
const port = process.env.PORT || 3000;
const pug = require('pug');
const bodyParser = require('body-parser')
let logged = false;
let userNameLogged = 'gigi';
let userType = 'admin';
let receiveEmails = false;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, () => console.log('Listening on port 3000!'))
app.set('view engine', 'pug');
app.set('views', './pug');


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/index', (req, res) => res.render('index', {
    logged,
    userName: userNameLogged,
    userType
}));
app.get('/login', (req, res) => res.render('login'));
app.get('/addData', (req, res) => res.render('addData'));
app.get('/signUp', (req, res) => res.render('signUp'));
app.get('/logOut', (req, res) => {
    logged = false;
    receiveEmails = false;
    res.render('index', {
        logged,
        userName: userNameLogged,
        userType
    });
});

app.post('/signUpForm', (req, res) => {
    const {firstName, lastName, password, email,userName, phone} = req.body;
    
    res.render('index', {
        logged,
        userName: userNameLogged,
        userType
    });
});
app.post('/addDataForm', (req, res) => {
    const message = req.body.message;
    console.log(message);
    sendmail({
        from: 'no-reply@yourdomain.com',
        to: 'ramona.sirbu95@gmail.com ',
        subject: 'test sendmail',
        test: 'JSON.stringify(req.body)',
        html: userNameLogged + 'just send a message:\n' + message,
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    res.render('index', {
        logged,
        userName: userNameLogged,
        userType
    });
});
app.post('/loginForm', (req, res) => {
    const {password, userName} = req.body;
    logged = true;
    userNameLogged = userName;
    if (userName === 'asirbu' || userName === 'asoare' || userName === 'apetrisor') {
        userType = 'admin';
    } else {
        userType = 'ordinary'
    }
    //////////ada aici faci select si vezi daca username si password corespund(asta in loc de if 1 === 3)
    ////de asemenea mai trebuie un select pe campul (receiveemails) sau cum l-ai denumit tu, si daca e activ 
    // setezi receiveEmails = true
    if (1 === 3)
        res.status(400).send("Invalid userName or password");
    else {
        res.render('index', {
            logged,
            userName: userNameLogged,
            userType
        });
    }
    
});



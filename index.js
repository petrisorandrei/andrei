const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pug = require('pug');
const bodyParser = require('body-parser')
let logged = false;
let userNameLogged = 'gigi';
let userType = 'admin';

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
    const {data1, data2, data3, data4, data5} = req.body;
    
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

    res.render('index', {
        logged,
        userName: userNameLogged,
        userType
    });
});



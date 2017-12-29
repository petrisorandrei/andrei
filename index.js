const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pug = require('pug');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, () => console.log('Listening on port 3000!'))
app.set('view engine', 'pug');
app.set('views', './pug');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/view', (req, res) => res.render('firstView'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signUp', (req, res) => res.render('signUp'));
app.post('/signUpSend', (req, res) => {
    const {firstName, lastName, password, email, phone} = req.body;
    res.render('firstView');
});



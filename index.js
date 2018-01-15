const express = require('express');
let nodemailer = require('nodemailer');
//const sendmail = require('sendmail')();

var pg = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);
client.connect();

/*pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
        done();
        console.log("////////////////////////////////////////////");
        console.log(err);
        return res.status(500).json({success: false, data: err});
    }
});*/


const app = express();
const port = process.env.PORT || 3000;
const pug = require('pug');
const bodyParser = require('body-parser')
let logged = false;
let userNameLogged = 'gigi';
let userType = 'admin';
let receiveEmails = false;

// var createTablesQuery = function() {
//     query = client.query(
//         'CREATE TABLE useri(id numeric PRIMARY KEY NOT NULL, nume VARCHAR(40) NOT NULL, mail VARCHAR(40) NOT NULL,' +
//         'nr_telefon VARCHAR(10), parola VARCHAR(40) NOT NULL, rol VARCHAR(10))');
//     query.on("end", function () {
//         client.end();
//     });
// }


var selectQuery = async function(queryType, value) {
    if (queryType == 'email') {
        var query = client.query('SELECT * from users WHERE "receiveEmails"=$1',
            [value]);
        var emails = [];

        await
            query.on("row", function (row, result) {
                result.addRow(row);
                emails.push(row.email);
            });
        await
            query.on("end", function (result) {
                // print result ...
                var jsonString = JSON.stringify(result.rows);
                var jsonObj = JSON.parse(jsonString);
                console.log("All selected rows : ");
                //console.log(jsonString);
                //client.end();
                console.log(emails);
            });
        // ... or return it
        console.log("Emails in query: ");
        console.log(emails);
        return emails;
    } else if (queryType == 'username') {
        var query = client.query('SELECT * from users WHERE username=$1',
            [value]);
        var passwordAndReceiveEmail = [];

        await
            query.on("row", function (row, result) {
                result.addRow(row);
                passwordAndReceiveEmail.push(row.password);
                passwordAndReceiveEmail.push(row.receiveEmails);
            });

        await
            query.on("end", function (result) {
                // print result ...
                var jsonString = JSON.stringify(result.rows);
                var jsonObj = JSON.parse(jsonString);
                console.log("All selected rows : ");
                //console.log(jsonString);
                //client.end();
                console.log(passwordAndReceiveEmail);
            });
        // ... or return it
        console.log("Password in query: ");
        console.log(passwordAndReceiveEmail);
        return passwordAndReceiveEmail;
    } else {
        var query = client.query('SELECT * from users WHERE username=$1',
            [value]);
        var receiveEmail;

        await
            query.on("row", function (row, result) {
                result.addRow(row);
                receiveEmail = row.receiveEmails;
            });

        await
            query.on("end", function (result) {
                // print result ...
                var jsonString = JSON.stringify(result.rows);
                var jsonObj = JSON.parse(jsonString);
                console.log("All selected rows : ");
                //console.log(jsonString);
                //client.end();
                console.log(receiveEmail);
            });
        // ... or return it
        console.log("Receive mail in query: ");
        console.log(receiveEmail);
        return receiveEmail;
    }
}

var insertQuery = function(name, username, mail, phone, password, receiveEmails) {
    var query = client.query('INSERT into users (name, username, email, phone, password, "receiveEmails") VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, username, mail, phone, password, receiveEmails]);
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        // print result ...
        var jsonString = JSON.stringify(result.rows);
        var jsonObj = JSON.parse(jsonString);
        console.log("Inserted row : ");
        console.log(jsonString);
        //client.end();

        // ... or return it
        //return result.rows;
    });
}

var deleteQuery = function(itemToDelete) {
    var query = client.query('DELETE from useri WHERE nume=$1 RETURNING *',
        [itemToDelete]);

    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        // print result ...
        var jsonString = JSON.stringify(result.rows);
        var jsonObj = JSON.parse(jsonString);
        console.log("Deleted row : ");
        console.log(jsonString);
        //client.end();

        // ... or return it
        //return result.rows;
    });
}

var updateQuery = function(value, userToUpdate) {
    var query = client.query('UPDATE users SET "receiveEmails"=$1 WHERE username=$2 RETURNING *',
        [value, userToUpdate]);

    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        // print result ...
        var jsonString = JSON.stringify(result.rows);
        var jsonObj = JSON.parse(jsonString);
        console.log("Updated row : ");
        console.log(jsonString);
        //client.end();

        // ... or return it
        //return result.rows;
    });
}

var transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: 'isiproiect@gmail.com',
        pass: 'isiproiect1'
    },
    tls: {
        rejectUnauthorized: false
    }
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, () => console.log('Listening on port 3000!'))
app.set('view engine', 'pug');
app.set('views', './pug');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/index', (req, res) => res.render('index', {
    logged,
    userName: userNameLogged,
    userType,
    receiveEmails
}));
app.get('/login', (req, res) => res.render('login'));

app.get('/addData', (req, res) => res.render('addData'));
app.get('/signUp', (req, res) => res.render('signUp'));

app.get('/receiveEmails', (req, res) => {
    receiveEmails = true;
    /////ada aici faci un update in tabela si ii pui userului curent receiveEmails pe true
    // DONE
    updateQuery('Yes', userNameLogged);
    res.render('index');
});

app.get('/stopEmails', (req, res) => {
    receiveEmails = false;
    /////ada aici faci un update in tabela si ii pui userului curent receiveEmails pe false
    // DONE
    updateQuery('No', userNameLogged);
    res.render('index');
});

app.get('/logOut', (req, res) => {
    logged = false;
    receiveEmails = false;
    res.render('index', {
        logged,
        userName: userNameLogged,
        userType,
        receiveEmails
    });
});

app.post('/signUpForm', (req, res) => {
    ///////ada aici introduci in tabela prostiile astea
    const {firstName, lastName, password, email,userName, phone, receiveEmails} = req.body;
    var name = firstName + ' ' + lastName;
    // DONE
    insertQuery(name, userName, email, phone, password, receiveEmails);
    
    res.render('index', {
        logged,
        userName: userNameLogged,
        userType,
        receiveEmails
    });
});

app.post('/addDataForm', (req, res) => {
    const message = req.body.message;

    ////ada aici faci un select pentru userii care vor sa primeasca email(+adminii) si le returnezi emailul
    // o sa fie emails.push() de fiecare email gasit --> emails.push(email);
    // let emails = selectQuery('Yes');
    // emails.then(function(result) {
    //     console.log(result)
    // });
    // console.log("Emails in addData: ");
    // console.log(emails);
    //
    // if (emails.length !== 0)
    //     sendEmail(message, emails);

    // DONE
    selectQuery('email', 'Yes')
        .then((res) => {
            if(res.length > 0)
                sendEmail(message, res);
        })
        .then(() => {
            res.render('index', {
                logged,
                userName: userNameLogged,
                userType,
                receiveEmails
            });
        })

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
    // DONE
    // return selectQuery('emailForCurrentUser', userName)
    //     .then((result) => {
    //         console.log("//////////")
    //         console.log(result);
    //         if (result === 'Yes')
    //             receiveEmails = true;
    //         console.log(receiveEmails);
    //     })
    //     .then(() => {
    //         return selectQuery('username', userName)})
    //     .then((result) => {
    //     //console.log("sasasa");
    //         //console.log(result.trim());
    //         //console.log(userName.trim())
    //         if (false) {
    //             console.log("pizdamasii")
    //             res.status(400).send("Invalid userName or password");
    //             //return;
    //         } else {
    //             //console.log("kskkskkk");
    //             res.render('index', {
    //                 logged: logged,
    //                 userName: userNameLogged,
    //                 userType: userType,
    //                 receiveEmails: receiveEmails
    //             });
    //         }
    //         //if (res.trim() != userName.trim())
    //         //if (!(res.toString() === password.toString()) || !res)
    //             //res.status(400).send("Invalid userName or password");
    //     })
    selectQuery('username', userName)
        .then((result) => {
            if (!(result[0] === password) || !result[0]) {
                res.status(400).send("Invalid userName or password");

                if (result[1] === 'Yes')
                    receiveEmails = true;
            }
        })
        .then(() => {
            res.render('index', {
                logged,
                userName: userNameLogged,
                userType,
                receiveEmails
            });
        })


});

function sendEmail(message, emails) {
    let to = '';
    for (let i = 0; i < emails.length ;i++) {
        to += emails[i];
        if(i < emails.length-1)
            to += ',';
    }
    
    let mailOptions = {
        from: '"Lacul Sfanta Ana" <isiproiect@gmail.com>', 
        to: to,
        subject: 'Lacul Sfanta Ana', 
        html: "<p>" + userNameLogged + " just added an update: <br>" + message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}


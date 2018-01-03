/**
 * Created by Ada Soare on 12/28/2017.
 */

var pg = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(connectionString);
client.connect();

var createTablesQuery = function() {
    query = client.query(
        'CREATE TABLE useri(id numeric PRIMARY KEY NOT NULL, nume VARCHAR(40) NOT NULL, mail VARCHAR(40) NOT NULL,' +
        'nr_telefon VARCHAR(10), parola VARCHAR(40) NOT NULL, rol VARCHAR(10))');
    query.on("end", function () {
        client.end();
    });
}


var selectQuery = function() {
    var query = client.query("SELECT * from useri;");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        // print result ...
        var jsonString = JSON.stringify(result.rows);
        var jsonObj = JSON.parse(jsonString);
        console.log("All selected rows : ");
        console.log(jsonString);

        client.end();

        // ... or return it
        //return result.rows;
    });
}

var insertQuery = function(id, name, mail, phone, password) {
    var query = client.query('INSERT into useri (id, nume, mail, nr_telefon, parola) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [id, name, mail, phone, password]);
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        // print result ...
        var jsonString = JSON.stringify(result.rows);
        var jsonObj = JSON.parse(jsonString);
        console.log("Inserted row : ");
        console.log(jsonString);
        client.end();

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
        client.end();

        // ... or return it
        //return result.rows;
    });
}

/*
const config = {
    user: 'postgres',
    database: 'postgres',
    password: 'postgres',
    port: 5432
};
pg.Pool(config).connect(function(err, client, done) {
        var insertQuery = client.query('INSERT into useri (id, nume, mail, nr_telefon, parola) VALUES($1, $2, $3, $4, $5) RETURNING id',
                     [2, 'Ramona', 'ramoa.sirbu@gmail.com', 1234, 'parola_ramona'],
                     function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('row inserted with id: ' + result.rows[0].id);
                        }
                        client.end();
                     });

        /!*var selelctQuery = client.query('SELECT * from useri WHERE id=$1',
                          [1],
                          function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                for(var i=0; i < result.rows.length; i++)
                                    console.log('result is: ' + result.rows[i].nume);
                            }
                            client.end();
                        });

        var deleteQuery = client.query('DELETE from useri WHERE nume=$1 RETURNING id',
                         ['Ramona'],
                         function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('row deleted with id: ' + result.rows[0].id);
                            }
                            client.end();
                         });*!/
});*/

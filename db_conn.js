/**
 * Created by Ada Soare on 12/28/2017.
 */

var pg = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/postgres";

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

        /*var selelctQuery = client.query('SELECT * from useri WHERE id=$1',
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
                         });*/
});
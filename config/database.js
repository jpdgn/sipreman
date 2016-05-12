var mysql = require('mysql');
var db = 'null';

  var pool = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sipreman3',
    debug: false,
    multipleStatements: true
  });
  pool.getConnection(function(err){
    if(err) {
      console.log(err);
      return;
    }
  });

module.exports = pool;

//-----------------------------------------------------------
// Database configuration using bookshelf.js, knex, and MySQL
//-----------------------------------------------------------

// var dbConfiguration = {
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'sipreman2',
//     charset: 'utf8'
//   }
// }

// var knex = require('knex')(dbConfiguration);

// module.exports = require('bookshelf')(knex);
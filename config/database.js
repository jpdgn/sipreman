var mysql = require('mysql');
var db = 'null';

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
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

// var pool = mysql.createPool({
//   connectionLimit: 100,
//   host: 'bqmayq5x95g1sgr9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   user: 'uh8s0sa80z145vch',
//   password: 'k784rvactet5p19j',
//   database: 'quw2rosit5lhbq5i',
//   debug: false,
//   multipleStatements: true
// });
// pool.getConnection(function(err){
//   if(err) {
//     console.log(err);
//     return;
//   }
// });

module.exports = pool;


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

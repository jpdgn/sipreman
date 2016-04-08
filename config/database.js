var mysql = require('mysql');
var db = 'null';

  var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sipreman',
    debug: false
  });
  pool.getConnection(function(err){
    if(err) {
      console.log(err);
      return;
    }
  });

module.exports = pool;
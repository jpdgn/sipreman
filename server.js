var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var md5 = require('md5');

var routes = require("./routes/index.js");
var cors = require('cors');
var app = express();
var connection = require('./config/database.js');
// var connection = new db();
function REST(){
  if(connection) {
  	this.ce(connection)
  } else {
  	this.stop();
  }
  // this.connectMysql();
};

var port = process.env.PORT || 3003

// REST.prototype.connectMysql = function() {
// 	var self = this;
//   var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'sipreman',
//     debug: false
//   });
//   pool.getConnection(function(err, connection){
//     if(err) {
//       self.stop(err);
//     } else {
//       self.ce(connection);
//       console.log(connection);
//     }
//   });
// }

REST.prototype.ce = function(connection) {
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  var router = express.Router();
  app.use('/api', router);
  var rest_router = new routes(router, connection, md5);
  this.startServer();
}

REST.prototype.startServer = function() {
  app.listen(3003, function(){
    console.log("Im on port " + port);
  });
}

REST.prototype.stop = function(err) {
  console.log("Problem with MySQL n" + err);
  process.exit(1);
}

new REST();

// var env = app.get('env');
// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	database: 'sipreman'
// })
// connection.connect(function(err) {
// 	if(!err) {
// 		console.log('Database is connected');
// 	} else {
// 		console.log('Error connecting database');
// 	}
// })
// app.get('/', function(req, res) {
// 	res.json('hello world api');
// });

// app.get('/mahasiswa/:nim', function(req, res) {
// 	var command = ('SELECT * FROM ?? WHERE ?? = ?');
// 	var param = ["mahasiswa", "nim", req.params.nim];
// 	var query = mysql.format(command, param);
// 	connection.query(query, function(err, rows) {
// 		res.json(rows);
// 	})
// })

// require('./routes')(app, connection);

// var port = process.env.PORT || 3003
// app.listen(port, function() {
// 	console.log("Listening for port " + port);
// })
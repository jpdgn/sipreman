var mysql = require('mysql');
var express = require('express');
var app = express();
var connection = require('../../../config/database.js');
var jwt = require('jsonwebtoken');
var secret = require('../../../config/secret');
var moment = require('moment');

app.set('appsecret', secret.secret);

exports.appAuth = function(req, res) {
	var data = req.body
	var sql = "SELECT * from user WHERE username = ?";
	var insert = [data.user];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, result) {
		if(err) {
			return res.json({
				success: false,
				message: err
			})
		}
    if(!result[0]) {
      return res.json({
        success: false,
        message: "Authentication failed. No user found"
      })
    } else if (result[0]) {
      if(result[0].password != data.password) {
        return res.json({
          success: false,
          message: "Authentication failed. Wrong password"
        })
      } else {
        var expires = moment().add(1, 'days').valueOf();
        var token = jwt.sign({
          iss: result[0].id
        }, app.get('appsecret'), {expiresIn: 86400})
        return res.json({
    			success: true,
          token: token,
    			message: "Token successfully generated"
    		})
      }
    }
	})
}

exports.checkAuth = function(req, res, next) {
  var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
  if(token) {
      jwt.verify(token, app.get('appsecret'), function(err, decoded) {
        if(err) {
          return res.status(403).json({ error:true, message: 'Token has expired'});
        } else {
					var dateNow = Math.floor(Date.now() / 1000);
          // console.log(decoded.exp)
          // console.log(dateNow)
          if(decoded.exp <= dateNow) {
            return res.status(400).json({error: 'access token has expired'})
          }
          req.user = decoded.iss
          return next()
        }
      })
  } else {
    return res.status(403).send({
			error: true,
			message: 'No token provided.'
		});
  }
}

exports.checkToken = function(req, res, next) {
  var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
  if(token) {
      jwt.verify(token, app.get('appsecret'), function(err, decoded) {
        if(err) {
          return res.status(403).json({ isValid:false, message: 'Token has expired'});
        } else {
					var dateNow = Math.floor(Date.now() / 1000);
          // console.log(decoded.exp)
          // console.log(dateNow)
          if(decoded.exp <= dateNow) {
            return res.status(400).json({error: 'access token has expired', isValid: false})
          }
          return res.status(200).json({
						isValid: true,
						validUntil: decoded.exp,
						message: 'Token valid'
					})
        }
      })
  } else {
    return res.status(403).send({
			error: true,
			message: 'No token provided.'
		});
  }
}


exports.authMobileApps = function (req, res) {
	var data = req.body
	var sql = "SELECT M.*,K.kelas,K.id_prodi,P.prodi,P.id_jurusan,J.jurusan FROM mahasiswa M JOIN kelas K on M.id_kelas = K.kode JOIN prodi P on K.id_prodi = P.kode JOIN jurusan J on P.id_jurusan = J.kode where M.device_id = ? AND M.nim = ?";
	var insert = [data.device_id, data.nim];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, result) {
		if(err) {
			return res.json({
				success: false,
				message: err
			})
		}
    if(!result[0]) {
      return res.json({
        success: false,
        message: "Authentication failed. No user found"
      })
    } else if (result[0]) {
      var expires = moment().add(1, 'days').valueOf();
      var token = jwt.sign({
        iss: result[0].id
      }, app.get('appsecret'), {expiresIn: 86400})
      return res.json({
  			success: true,
        token: token,
				data: result[0],
  			message: "Token successfully generated"
  		})
    }
	})
}

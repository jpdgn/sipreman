var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllProdi = function(req, res) {
	var query = ('SELECT * FROM prodi');
	connection.query(query, function(err, rows) {
		if(err) {
			return res.json({
				success: false,
				message: err
			})
		}
		return res.json({
			success: true,
			data: rows
		});
	});
}

exports.getProdiById = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE kode = ?');
	var insert = ["prodi", req.params.id];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, rows) {
		if(err) {
			return res.json({
				success: false,
				message: err
			})
		}
		return res.json({
			success: true,
			data: rows
		});
	});
}

exports.createProdi = function(req, res) {
	var data = req.body
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["prodi", data];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, result) {
		if(err) {
			return res.json({
				success: false,
				message: err
			})
		}
		return res.json({
			success: true,
			message: "Data prodi berhasil ditambahkan"
		})
	})
}

exports.updateProdi = function(req, res) {
	var data = req.body
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["prodi", data, "kode", req.params.id];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, result) {
		if(err) {
			return res.json({
				success: false,
				message: err
			});
		}
		return res.json({
			success: true,
			message: "Berhasil memperbarui data prodi",
			data: result
		})
	})
}

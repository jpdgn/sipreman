var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllJurusan = function(req, res) {
	var query = ('SELECT * FROM jurusan');
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

exports.getJurusanById = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE kode = ?');
	var insert = ["jurusan", req.params.id];
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

exports.createJurusan = function(req, res) {
	var data = req.body
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["jurusan", data];
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
			message: "Data jurusan berhasil ditambahkan"
		})
	})
}

exports.updateJurusan = function(req, res) {
	var data = req.body
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["jurusan", data, "kode", req.params.id];
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
			message: "Berhasil memperbarui data jurusan",
			data: result
		})
	})
}

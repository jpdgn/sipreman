var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllRuangan = function(req, res) {
	var query = ('SELECT * FROM ruangan');
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

exports.getRuanganById = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE kode = ?');
	var insert = ["ruangan", req.params.id];
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

exports.createRuangan = function(req, res) {
	var data = req.body;
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["ruangan", data];
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
			message: "Data ruangan berhasil ditambahkan"
		})
	})
}

exports.updateRuangan = function(req, res) {
	var data = req.body;
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["ruangan", data, "kode", req.params.id];
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
			message: "Data ruangan berhasil diubah"
		})
	})
}

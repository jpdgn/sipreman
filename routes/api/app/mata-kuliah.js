var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllMk = function(req, res) {
	var query = ('SELECT * FROM mata_kuliah');
	connection.query(query, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		return res.json({
			success: true,
			data: rows
		})
	});
}

exports.getMkById = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE kode = ?');
	var insert = ["mata_kuliah", req.params.id];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		return res.json({
			success: true,
			data: rows
		})
	});
}

exports.createMk = function(req, res) {
	var data = req.body;
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["mata_kuliah", data];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, result) {
		if(err) return res.json({success: false, message: err});
		return res.json({
			success: true,
			message: "Data mata kuliah berhasil ditambahkan"
		})
	})
}

exports.updateMk = function(req, res) {
	var data = req.body;
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["mata_kuliah", data, "kode", req.params.id];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, result) {
		if(err) return res.json({success: false, message: err});
		return res.json({
			success: true,
			message: "Data mata kuliah berhasil diubah"
		})
	})
}

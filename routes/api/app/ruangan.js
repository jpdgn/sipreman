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
	var sql = ('SELECT * FROM ?? WHERE id_ruangan = ?');
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
	var sql = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
	var insert = ["ruangan", "id_ruangan", "nama_ruangan", "lantai", "kapasitas", 
					req.body.id, req.body.nama, req.body.lantai, req.body.kapasitas];
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
	var sql = "UPDATE ?? SET ??=?,??=?,??=? WHERE ??=?";
	var insert = ["ruangan", "nama_ruangan", req.body.nama, "lantai", req.body.lantai, 
					"kapasitas", req.body.kapasitas, "id_ruangan", req.params.id];
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
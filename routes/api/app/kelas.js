var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllKelas = function(req, res) {
	var query = ('SELECT * FROM kelas');
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

exports.getKelasById = function(req, res) {
	var sql = ('SELECT k.*, p.prodi FROM kelas k JOIN prodi p ON k.id_prodi = p.kode WHERE k.kode = ?');
	var insert = [req.params.id];
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

exports.createKelas = function(req, res) {
	var data = req.body
	if(!data) res.status(403).json({error: true, message: 'Missing params'})
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["kelas", data];
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
			message: "Data kelas berhasil ditambahkan"
		})
	})
}

exports.updateKelas = function(req, res) {
	if(!req.body.kelas || !req.body.id_prodi) return res.status(403).json({success: false, message: 'Missing some parameters'});
	var data = req.body
	var sql = "UPDATE ?? SET ? WHERE kode = ?";
	var insert = ["kelas", data, req.params.id];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, result) {
		if(err) {
			return res.status(403).json({
				success: false,
				message: err
			});
		}
		return res.json({
			success: true,
			message: "Berhasil memperbarui data kelas",
			data: result
		})
	})
}

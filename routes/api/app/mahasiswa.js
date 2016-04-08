var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllMahasiswa = function(req, res) {
	var query = ('SELECT * FROM mahasiswa JOIN kelas ON mahasiswa.id_kelas = kelas.kode_kelas JOIN prodi ON kelas.id_prodi = prodi.kode_prodi JOIN jurusan ON prodi.id_jurusan = jurusan.kode_jurusan');
	connection.query(query, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, data: rows});
	});
}

exports.getMahasiswaByNim = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE nim = ?');
	var insert = ["mahasiswa", req.params.nim];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, data: rows});
	});
}

exports.createMahasiswa = function(req, res) {
	var data = req.body;
	var sql = "INSERT INTO mahasiswa SET ? ";
	var insert = [data];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, message: "Data mahasiswa berhasil ditambahkan"});
	});
}

exports.updateMahasiswa = function(req, res) {
	var data = req.body;
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["mahasiswa", data, "nim", data.nim];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, message: "Data mahasiswa berhasil diubah"});
	});
}
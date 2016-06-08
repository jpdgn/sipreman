var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllDosen = function(req, res) {
	// var query = ('SELECT dosen.nip as nip, dosen.nama as nama, dosen.email as email, jabatan.nama as jabatan FROM dosen JOIN jabatan ON dosen.jabatan_id = jabatan.kode');
	var query = ('SELECT * FROM dosen JOIN jabatan ON dosen.id_jabatan = jabatan.kode');
	connection.query(query, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, data: rows});
	});
}

exports.getDosenByNip = function(req, res) {
	var sql = ('SELECT * FROM dosen JOIN jabatan ON dosen.id_jabatan = jabatan.kode WHERE dosen.nip = ?');
	var insert = [req.params.nip];
	sql = mysql.format(sql, insert);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, data: rows});
	});
}

exports.createDosen = function(req, res) {
	var data = req.body;
	console.log(data);
	var sql = "INSERT INTO dosen SET ? ";
	var insert = [data];
	console.log(sql);
	// var insert = ["dosen", "nip", "nama", "jabatan", "tanggal_lahir", "email",
	// 				"alamat_rumah", "alamat_tinggal", "no_hp", "device_id",
	// 				data.nip, data.nama, data.jabatan, data.tanggal_lahir,
	// 				data.email, data.alamat_rumah, data.alamat_tinggal, data.no_hp, data.device_id];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, message: "Data dosen berhasil ditambahkan"});
	});
}

exports.updateDosen = function(req, res) {
	var data = req.body;
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["dosen", data, "nip", req.params.nip];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, message: "Data dosen berhasil diubah"});
	});
}

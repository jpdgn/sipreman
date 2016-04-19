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

// exports.getKelasById = function(req, res) {
// 	var sql = ('SELECT * FROM ?? WHERE id_kelas = ?');
// 	var insert = ["kelas", req.params.id];
// 	sql = mysql.format(sql, insert);
// 	connection.query(sql, function(err, rows) {
// 		if(err) {
// 			return res.json({
// 				success: false,
// 				message: err
// 			})
// 		}
// 		return res.json({
// 			success: true,
// 			data: rows
// 		});
// 	});
// }

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
	if(!req.body.nama || !req.body.tahun_masuk || !req.body.jumlah_mahasiswa) return res.json({success: false});
	var sql = "UPDATE ?? SET ??=?,??=?,??=? WHERE id_kelas = ?";
	var insert = ["kelas", "nama_kelas", req.body.nama, "tahun_masuk", req.body.tahun_masuk,
					"jumlah_mahasiswa", req.body.jumlah_mahasiswa, req.params.id];
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
			message: "Berhasil memperbarui data kelas",
			data: result
		})
	})
}
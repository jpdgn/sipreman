var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllJadwal = function(req, res) {
	var query = ('SELECT jadwal.id, kelas.nama as kelas, dosen.nama as dosen, ruangan.nama as ruangan, mata_kuliah.nama as mata_kuliah, jadwal.jam_mulai, jadwal.jam_selesai, jadwal.tanggal FROM jadwal JOIN kelas ON jadwal.kelas_id = kelas.id JOIN dosen ON jadwal.dosen_id = dosen.nip JOIN ruangan ON jadwal.ruangan_id = ruangan.id JOIN mata_kuliah ON jadwal.mata_kuliah_id = mata_kuliah.id');
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

// exports.createKelas = function(req, res) {
// 	var data = req.body
// 	var sql = "INSERT INTO ?? SET ?";
// 	var insert = ["kelas", data];
// 	sql = mysql.format(sql, insert);
// 	connection.query(sql, function(err, result) {
// 		if(err) {
// 			return res.json({
// 				success: false,
// 				message: err
// 			})
// 		}
// 		return res.json({
// 			success: true,
// 			message: "Data kelas berhasil ditambahkan"
// 		})
// 	})
// }

// exports.updateKelas = function(req, res) {
// 	if(!req.body.nama || !req.body.tahun_masuk || !req.body.jumlah_mahasiswa) return res.json({success: false});
// 	var sql = "UPDATE ?? SET ??=?,??=?,??=? WHERE id_kelas = ?";
// 	var insert = ["kelas", "nama_kelas", req.body.nama, "tahun_masuk", req.body.tahun_masuk,
// 					"jumlah_mahasiswa", req.body.jumlah_mahasiswa, req.params.id];
// 	sql = mysql.format(sql, insert);
// 	console.log(sql);
// 	connection.query(sql, function(err, result) {
// 		if(err) {
// 			return res.json({
// 				success: false,
// 				message: err
// 			});
// 		}
// 		return res.json({
// 			success: true,
// 			message: "Berhasil memperbarui data kelas",
// 			data: result
// 		})
// 	})
// }
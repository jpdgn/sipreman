var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getAllKehadiran = function(req, res) {
	// var query = ('SELECT * FROM kehadiran');
	var query = ('SELECT kehadiran.tanggal AS tanggal, kehadiran.jam_presensi AS jam_presensi, kehadiran.nim AS nim, mahasiswa.nama_mhs AS nama_mahasiswa, kelas.kode AS kode_kelas, kelas.kelas AS nama_kelas, ruangan.kode AS kode_ruangan, ruangan.ruangan AS nama_ruangan, dosen.nip AS nip, dosen.nama_dosen AS nama_dosen, mata_kuliah.kode AS kode_mk, mata_kuliah.mata_kuliah as mata_kuliah, kehadiran.status AS status, kehadiran.keterlambatan as keterlambatan, jadwal.jam_mulai AS jam_mulai FROM kehadiran JOIN mahasiswa ON kehadiran.nim = mahasiswa.nim JOIN jadwal ON kehadiran.id_jadwal = jadwal.kode JOIN kelas ON jadwal.id_kelas = kelas.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode JOIN dosen ON jadwal.id_dosen = dosen.nip JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode');
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

exports.getKehadiranById = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE id = ?');
	var insert = ["kehadiran", req.params.id];
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

exports.createKehadiran = function(req, res) {
	var data = req.body
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["kehadiran", data];
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
			message: "Data kehadiran berhasil ditambahkan"
		})
	})
}

exports.updateKehadiran = function(req, res) {
	var data = req.body
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["jadwal", data, "kode", req.params.id];
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

exports.filterKehadiran = function(req, res) {
	var data = req.body
	var sql = "SELECT jadwal.kode, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai, kelas.kelas, dosen.nama_dosen, mata_kuliah.mata_kuliah, ruangan.ruangan FROM `jadwal` JOIN kelas ON jadwal.id_kelas = kelas.kode JOIN dosen ON jadwal.id_dosen = dosen.nip JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode WHERE ?? = ?"
	var insert = [data.option, data.val]
	sql = mysql.format(sql, insert)
	connection.query(sql, function(err, result) {
		if(err) {
			return res.json({
				success: false,
				message: err
			})
		}
		return res.json({
			success: true,
			message: 'Berhasil menfilter data',
			data: result
		})
	})
}

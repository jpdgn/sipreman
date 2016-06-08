var mysql = require('mysql');
var connection = require('../../../config/database.js');
// var bookshelf = require('../../../config/database.js');

// var Jadwal = bookshelf.Model.extend({
// 	tableName: 'jadwal'
// })

exports.getAllJadwal = function(req, res) {
	var query = ('SELECT jadwal.kode, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai, kelas.kelas, dosen.nama_dosen, mata_kuliah.mata_kuliah, ruangan.ruangan FROM `jadwal` JOIN kelas ON jadwal.id_kelas = kelas.kode JOIN dosen ON jadwal.id_dosen = dosen.nip JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode');
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
	// Jadwal.forge().fetchAll().then(function(jadwal) {
	// 	res.json(jadwal.toJSON())
	// }).catch(function(err) {
	// 	console.error(err);
	// })
}

exports.getJadwalById = function(req, res) {
	// var sql = ('SELECT * FROM ?? WHERE kode = ?');
	// var insert = ["jadwal", req.params.id];
	// var sql = ('SELECT * FROM ?? JOIN kelas on jadwal.id_kelas = kelas.kode JOIN semester ON jadwal.id_semester = semester.kode JOIN akademik ON jadwal.id_akademik = akademik.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode JOIN dosen ON jadwal.id_dosen = dosen.nip WHERE jadwal.kode = ?');
	var sql = ('SELECT jadwal.kode AS kode_jadwal, mata_kuliah.mata_kuliah as mk, dosen.nama_dosen AS dosen, kelas.kelas AS kelas, jadwal.hari as hari, ruangan.ruangan as ruangan, jadwal.jam_mulai as mulai, jadwal.jam_selesai as selesai, semester.semester as semester, akademik.akademik as akademik  FROM jadwal JOIN kelas on jadwal.id_kelas = kelas.kode JOIN semester ON jadwal.id_semester = semester.kode JOIN akademik ON jadwal.id_akademik = akademik.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode JOIN dosen ON jadwal.id_dosen = dosen.nip WHERE jadwal.kode = ?');
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

exports.getSortedDosen = function(req, res) {
	var sql;
	if (req.params.sort == 'asc') {
		sql = ('SELECT jadwal.kode, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai, kelas.kelas, dosen.nama_dosen, mata_kuliah.mata_kuliah, ruangan.ruangan FROM `jadwal` JOIN kelas ON jadwal.id_kelas = kelas.kode JOIN dosen ON jadwal.id_dosen = dosen.nip JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode ORDER BY dosen.nama_dosen ASC');
		// var insert = ["jadwal", "dosen", "jadwal.id_dosen", "dosen.nip", "dosen.nama_dosen"];
	} else if (req.params.sort == 'desc') {
		sql = ('SELECT jadwal.kode, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai, kelas.kelas, dosen.nama_dosen, mata_kuliah.mata_kuliah, ruangan.ruangan FROM `jadwal` JOIN kelas ON jadwal.id_kelas = kelas.kode JOIN dosen ON jadwal.id_dosen = dosen.nip JOIN mata_kuliah ON jadwal.id_mk = mata_kuliah.kode JOIN ruangan ON jadwal.id_ruangan = ruangan.kode ORDER BY dosen.nama_dosen DESC');
	}
	console.log(sql)
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, data: rows});
	});
}

exports.createJadwal = function(req, res) {
	var data = req.body
	var sql = "INSERT INTO ?? SET ?";
	var insert = ["jadwal", data];
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

exports.updateJadwal = function(req, res) {
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

exports.filterJadwal = function(req, res) {
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

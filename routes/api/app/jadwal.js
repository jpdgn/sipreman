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

exports.getJadwalList = function (req, res) {
	var data = req.body
	var sql = "SELECT MYJ.*, K.kelas, K.id_prodi, P.prodi, P.id_jurusan, J.jurusan, S.semester, AK.akademik, MYR.ruangan, MYR.lantai, MYR.latlong_a, MYR.latlong_b, MYR.latlong_c, MYR.latlong_d, MP.mata_kuliah, MP.bobot, D.nama_dosen, D.no_hp, D.id_jabatan, JB.jabatan FROM `jadwal` MYJ JOIN kelas K ON MYJ.id_kelas = K.kode JOIN prodi P ON K.id_prodi = P.kode JOIN jurusan J ON P.id_jurusan = J.kode JOIN semester S ON MYJ.id_semester = S.kode JOIN akademik AK ON MYJ.id_akademik = AK.kode JOIN ruangan MYR ON MYJ.id_ruangan = MYR.kode JOIN mata_kuliah MP ON MYJ.id_mk = MP.kode JOIN dosen D ON MYJ.id_dosen = D.nip JOIN jabatan JB ON D.id_jabatan = JB.kode WHERE id_kelas = 'TIKTIA' AND id_semester = 'SMT6' AND id_akademik = 'TH1516' AND hari = '2'"
				var insert = [data.hari, data.id_kelas, data.id_semester, data.id_akademik];
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

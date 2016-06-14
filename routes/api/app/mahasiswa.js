var mysql = require('mysql');
var connection = require('../../../config/database.js');
// var bookshelf = require('../../../config/database.js');


// var Kelas = bookshelf.Model.extend({
// 	tableName: 'kelas',
// })

// var Mahasiswa = bookshelf.Model.extend({
// 	tableName: 'mahasiswa',
// 	kelas: function() {
// 		return this.belongsTo(Kelas);
// 	}
// })

// var MahasiswaCollection = bookshelf.Collection.extend({
// 	model: Mahasiswa
// })

exports.getAllMahasiswa = function(req, res) {
	// var query = ('SELECT mahasiswa.nim as nim, mahasiswa.nama as nama, mahasiswa.email as email, mahasiswa.tahun_masuk, kelas.nama as kelas, prodi.nama as prodi, jurusan.nama as jurusan FROM mahasiswa JOIN kelas ON mahasiswa.kelas_id = kelas.kode JOIN prodi ON kelas.prodi_id = prodi.kode JOIN jurusan ON prodi.jurusan_id = jurusan.kode');
	var query = ("SELECT * FROM mahasiswa JOIN kelas ON mahasiswa.id_kelas = kelas.kode JOIN akademik ON mahasiswa.id_akademik = akademik.kode JOIN semester ON mahasiswa.id_semester = semester.kode WHERE mahasiswa.is_deleted = '0'");
	connection.query(query, function(err, rows) {
		console.log(rows.length);
		if(err) return res.json({success: false, message: err});
		res.json({success: true, data: rows, rows: rows.length});
	});
	// MahasiswaCollection.query(function(qb) {
	// 	qb.join('kelas', 'mahasiswa.kelas_id', 'kode')
	// }).fetch({withRelated:['kelas']}).then(function(mahasiswa) {
	// 	res.json(mahasiswa.toJSON())
	// 	console.log(JSON.stringify(mahasiswa));
	// })
}

exports.getMahasiswaByNim = function(req, res) {
	var sql = ('SELECT * FROM ?? WHERE nim = ?');
	var sql = ('SELECT * FROM mahasiswa JOIN kelas ON mahasiswa.id_kelas = kelas.kode JOIN akademik ON mahasiswa.id_akademik = akademik.kode JOIN semester ON mahasiswa.id_semester = semester.kode WHERE nim = ?')
	var insert = [req.params.nim];
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
	console.log(sql);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, message: "Data mahasiswa berhasil ditambahkan"});
	});
}

exports.updateMahasiswa = function(req, res) {
	var numRow
	var data = req.body;
	var sql = "UPDATE ?? SET ? WHERE ??=?";
	var insert = ["mahasiswa", data, "nim", req.params.nim];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, rows) {
		numRow = rows.changedRows
		if(err) return res.json({success: false, message: err});
		console.log(numRow)
		if(numRow > 0) {
			return res.json({success: true, message: "Data mahasiswa berhasil diubah"});
		} else {
			return res.json({success: true, message: "Tidak ada data yang berubah"});
		}
	});
}

exports.deleteMahasiswa = function(req, res) {
	var data = req.params.nim;
	var sql = "UPDATE mahasiswa SET is_deleted = '1' WHERE nim = ?";
	var insert = [data];
	// var sql = "INSERT INTO ?? SELECT * FROM ?? WHERE ?? = ?; DELETE FROM ?? WHERE ?? = ?";
	// var insert = ["mahasiswa_backup", "mahasiswa", "nim", data, "mahasiswa", "nim", data];
	// var sql2 = "INSERT INTO ?? SELECT * FROM ?? WHERE ? = ?; DELETE FROM ?? WHERE ?? = ?";
	// var insert2 = ["mahasiswa_backup", "mahasiswa", "nim", data, "mahasiswa", "nim", data];
	sql = mysql.format(sql, insert);
	console.log(sql);
	connection.query(sql, function(err, rows) {
		if(err) return res.json({success: false, message: err});
		res.json({success: true, message: "Data mahasiswa berhasil dihapus"});
	});
}

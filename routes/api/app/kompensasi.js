var mysql = require('mysql');
var connection = require('../../../config/database.js');

exports.getKompensasi = function (req, res) {
  var query = ("SELECT * FROM mahasiswa JOIN kelas ON mahasiswa.id_kelas = kelas.kode JOIN akademik ON mahasiswa.id_akademik = akademik.kode JOIN semester ON mahasiswa.id_semester = semester.kode WHERE mahasiswa.is_deleted = '0'");
  connection.query(query, function(err, rows) {
    if(err) return res.json({success: false, message: err})
    res.json({success: true, data: rows});
  })
}

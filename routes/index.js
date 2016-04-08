module.exports = function(router, connection, md5){
	
	var mahasiswa = require('./api/app/mahasiswa');
	var dosen = require('./api/app/dosen');
	var mk = require('./api/app/mata-kuliah');
	var ruangan = require('./api/app/ruangan');
	var kelas = require('./api/app/kelas');

	router.get('/', function(req, res) {
		res.json('Hello API');
	})

	// MAHASISWA
	router.get('/mahasiswa', mahasiswa.getAllMahasiswa);
	router.get('/mahasiswa/:nim', mahasiswa.getMahasiswaByNim);
	router.post('/mahasiswa', mahasiswa.createMahasiswa);
	router.put('/mahasiswa/:nim', mahasiswa.updateMahasiswa);

	// DOSEN
	router.get('/dosen', dosen.getAllDosen);
	router.get('/dosen/:nip', dosen.getDosenByNip);
	router.post('/dosen', dosen.createDosen);
	router.put('/dosen/:nip', dosen.updateDosen);

	// MATA KULIAH
	router.get('/mk', mk.getAllMk);
	router.get('/mk/:id', mk.getMkById);
	router.post('/mk', mk.createMk);
	router.put('/mk/:id', mk.updateMk);

	// RUANGAN
	router.get('/ruangan', ruangan.getAllRuangan);
	router.get('/ruangan/:id', ruangan.getRuanganById);
	router.post('/ruangan', ruangan.createRuangan);
	router.put('/ruangan/:id', ruangan.updateRuangan);

	// KELAS
	router.get('/kelas', kelas.getAllKelas);
	router.get('/kelas/:id', kelas.getKelasById);
	router.post('/kelas', kelas.createKelas);
	router.put('/kelas/:id', kelas.updateKelas);
}
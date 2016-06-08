module.exports = function(router, connection, md5){

	var mahasiswa = require('./api/app/mahasiswa');
	var dosen = require('./api/app/dosen');
	var mk = require('./api/app/mata-kuliah');
	var ruangan = require('./api/app/ruangan');
	var kelas = require('./api/app/kelas');
	var prodi = require('./api/app/prodi');
	var jurusan = require('./api/app/jurusan');
	var jadwal = require('./api/app/jadwal');
	var jabatan = require('./api/app/jabatan');
	var semester = require('./api/app/semester');
	var akademik = require('./api/app/akademik');
	var kehadiran = require('./api/app/kehadiran');
	var auth = require('./api/app/auth');

	router.post('/auth', auth.appAuth)
	router.post('/authMobile', auth.authMobileApps)
	router.post('/check', auth.checkAuth)

	router.use(auth.checkAuth);
	router.get('/', function(req, res) {
		res.json('Hello API');
	})


	// MAHASISWA
	router.get('/mahasiswa', mahasiswa.getAllMahasiswa);
	router.get('/mahasiswa/:nim', mahasiswa.getMahasiswaByNim);
	router.post('/mahasiswa', mahasiswa.createMahasiswa);
	router.put('/mahasiswa/:nim', mahasiswa.updateMahasiswa);
	router.delete('/mahasiswa/:nim', mahasiswa.deleteMahasiswa);

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

	// PRODI
	router.get('/prodi', prodi.getAllProdi);
	router.get('/prodi/:id', prodi.getProdiById);
	router.post('/prodi', prodi.createProdi);
	router.put('/prodi/:id', prodi.updateProdi)

	// JURUSAN
	router.get('/jurusan', jurusan.getAllJurusan);
	router.get('/jurusan/:id', jurusan.getJurusanById);
	router.post('/jurusan', jurusan.createJurusan);
	router.put('/jurusan/:id', jurusan.updateJurusan)

	// JADWAL
	router.get('/jadwal/', jadwal.getAllJadwal);
	router.get('/jadwal/:id', jadwal.getJadwalById);
	router.get('/jadwal-sort-dosen/:sort', jadwal.getSortedDosen);
	router.post('/jadwal', jadwal.createJadwal);
	router.put('/jadwal/:id', jadwal.updateJadwal);
	router.post('/jadwal/filter', jadwal.filterJadwal)

	// KEHADIRAN
	router.get('/kehadiran/', kehadiran.getAllKehadiran);
	router.get('/kehadiran/:id', kehadiran.getKehadiranById);
	router.post('/kehadiran', kehadiran.createKehadiran);
	router.put('/kehadiran/:id', kehadiran.updateKehadiran);
	router.post('/kehadiran/filter', kehadiran.filterKehadiran)

	// JABATAN
	router.get('/jabatan', jabatan.getAllJabatan);
	router.get('/jabatan/:id', jabatan.getJabatanById);
	router.post('/jabatan', jabatan.createJabatan);
	router.put('/jabatan/:id', jabatan.updateJabatan)

	// SEMESTER
	router.get('/semester', semester.getAllSemester);
	router.get('/semester/:id', semester.getSemesterById);
	router.post('/semester', semester.createSemester);

	// AKADEMIK
	router.get('/akademik', akademik.getAllAkademik);
	router.get('/akademik/:id', akademik.getAkademikById);
	router.post('/akademik', akademik.createAkademik);
}

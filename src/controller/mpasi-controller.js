const MpasiService = require('../service/mpasi-service');

// Controller untuk membuat MPASI baru
const createMpasi = async (req, res, next) => {
  try {
    const mpasi = await MpasiService.createMpasi(req.body);
    res.status(201).json({ message: 'Sukses menambahkan data Makanan', data: mpasi });
  } catch (error) {
    next(error);
  }
};

// Controller untuk mendapatkan semua MPASI
const getAllMpasi = async (req, res, next) => {
  const category = req.query.kategori;
  const searchQuery = req.query.q;
  try {
    const mpasiList = await MpasiService.getAllMpasi(category, searchQuery);
    res.status(200).json({
      message: 'Sukses mendapatkan data Makanan',
      data: mpasiList.map((mpasi) => ({
        id: mpasi.id,
        makanan: mpasi.makanan,
        kategori: mpasi.kategori,
        gambar: mpasi.gambar,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// Controller untuk mendapatkan MPASI berdasarkan ID
const getMpasiById = async (req, res, next) => {
  const mpasiId = req.params.id;
  try {
    const mpasi = await MpasiService.getMpasiById(mpasiId);
    if (!mpasi) {
      res.status(404).json({ message: 'Data MPASI tidak ditemukan' });
    } else {
      res.status(200).json({ message: 'Sukses mendapatkan detail Makanan', data: mpasi });
    }
  } catch (error) {
    next(error);
  }
};

// Controller untuk mengupdate MPASI berdasarkan ID
const updateMpasi = async (req, res, next) => {
  const mpasiId = req.params.id;
  try {
    const updatedMpasi = await MpasiService.updateMpasi(mpasiId, req.body);
    res.json({ message: 'Sukses mengubah data Makanan', data: updatedMpasi });
  } catch (error) {
    next(error);
  }
};

// Controller untuk menghapus MPASI berdasarkan ID
const deleteMpasi = async (req, res, next) => {
  const mpasiId = req.params.id;
  try {
    await MpasiService.deleteMpasiById(mpasiId);
    res.status(200).json({ message: 'Berhasil menghapus data makanan' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMpasi,
  getAllMpasi,
  getMpasiById,
  updateMpasi,
  deleteMpasi,
};

const ArtikelService = require('../service/artikel-service');

// Controller untuk membuat artikel baru
const createArtikel = async (req, res, next) => {
  try {
    const artikel = await ArtikelService.createArtikel(req.body);
    res.status(201).json({ message: 'Sukses menambahkan data Artikel', data: artikel });
  } catch (error) {
    next(error);
  }
};

// Controller untuk mendapatkan semua artikel
const getAllArtikel = async (req, res, next) => {
  const category = req.query.kategori;
  const searchQuery = req.query.q;
  try {
    const artikelList = await ArtikelService.getAllArtikel(category, searchQuery);
    res.status(200).json({
      message: 'Sukses mendapatkan data Artikel',
      data: artikelList.map((artikel) => ({
        id: artikel.id,
        judul: artikel.judul,
        deskripsi: artikel.deskripsi,
        tanggal: artikel.tanggal,
        sumber: artikel.sumber,
        gambar: artikel.gambar,
        kategori: artikel.kategori,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// Controller untuk mendapatkan artikel berdasarkan ID
const getArtikelById = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    const artikel = await ArtikelService.getArtikelById(artikelId);
    if (!artikel) {
      res.status(404).json({ message: 'Data Artikel tidak ditemukan' });
    } else {
      res.status(200).json({ message: 'Sukses mendapatkan detail Makanan', data: artikel });
    }
  } catch (error) {
    next(error);
  }
};

// Controller untuk mengupdate artikel berdasarkan ID
const updateArtikel = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    const updatedArtikel = await ArtikelService.updateArtikel(artikelId, req.body);
    res.json({ message: 'Sukses mengubah artikel', data: updatedArtikel });
  } catch (error) {
    next(error);
  }
};

// Controller untuk menghapus artikel berdasarkan ID
const deleteArtikel = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    await ArtikelService.deleteArtikelById(artikelId);
    res.status(200).json({ message: 'Berhasil menghapus artikel' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createArtikel,
  getAllArtikel,
  getArtikelById,
  updateArtikel,
  deleteArtikel,
};

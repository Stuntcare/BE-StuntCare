/* eslint-disable max-len */
const ArtikelService = require('../service/artikel-service');

const createArtikel = async (req, res, next) => {
  try {
    const artikel = await ArtikelService.createArtikel(req.body);
    res.status(201).json({ message: 'Sukses menambahkan data Artikel', data: artikel });
  } catch (error) {
    next(error);
  }
};

const getAllArtikel = async (req, res, next) => {
  const category = req.query.kategori;
  const searchQuery = req.query.q;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;

  try {
    const { artikelList, count } = await ArtikelService.getAllArtikel(category, searchQuery, page, limit);
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
      total: count,
      page,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    next(error);
  }
};

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

const updateArtikel = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    const updatedArtikel = await ArtikelService.updateArtikel(artikelId, req.body);
    res.json({ message: 'Sukses mengubah artikel', data: updatedArtikel });
  } catch (error) {
    next(error);
  }
};

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

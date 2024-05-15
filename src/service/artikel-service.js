const Artikel = require('../models/artikel');
const ResponseError = require('../error/response-error');
const ArtikelValidation = require('../validation/artikel-validation');
const { validate } = require('../validation/validation');

// Fungsi untuk membuat artikel baru
const createArtikel = async (artikelData) => {
  const validatedData = validate(ArtikelValidation.createArtikelValidation, artikelData);
  const artikel = await Artikel.create(validatedData);
  return artikel;
};

// Fungsi untuk mendapatkan semua artikel
const getAllArtikel = async () => {
  const artikelList = await Artikel.findAll();
  if (!artikelList) {
    throw new ResponseError(404, 'Gagal mendapatkan artikel');
  }
  return artikelList;
};

// Fungsi untuk mendapatkan artikel berdasarkan ID
const getArtikelById = async (artikelId) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal mendapatkan detail artikel');
  }
  return artikel;
};

// Fungsi untuk mengupdate artikel berdasarkan ID
const updateArtikel = async (artikelId, updatedData) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const validatedData = validate(ArtikelValidation.updateArtikelValidation, updatedData);

  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal mengubah artikel');
  }

  await artikel.update(validatedData);
  return artikel;
};

// Fungsi untuk menghapus artikel berdasarkan ID
const deleteArtikelById = async (artikelId) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal menghapus artikel');
  }

  await artikel.destroy();
};

module.exports = {
  createArtikel,
  getAllArtikel,
  getArtikelById,
  updateArtikel,
  deleteArtikelById,
};

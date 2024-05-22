const { Op } = require('sequelize');
const Artikel = require('../models/artikel');
const ResponseError = require('../error/response-error');
const ArtikelValidation = require('../validation/artikel-validation');
const { validate } = require('../validation/validation');

const createArtikel = async (artikelData) => {
  const validatedData = validate(ArtikelValidation.createArtikelValidation, artikelData);
  const artikel = await Artikel.create(validatedData);
  return artikel;
};

const getAllArtikel = async (category, searchQuery, page = 1, limit = 12) => {
  const offset = (page - 1) * limit;

  const queryOptions = {
    where: {},
    limit,
    offset,
  };

  if (category) {
    queryOptions.where.kategori = category;
  }

  if (searchQuery) {
    queryOptions.where.judul = {
      [Op.like]: `%${searchQuery}%`,
    };
  }

  const { rows: artikelList, count } = await Artikel.findAndCountAll(queryOptions);
  if (!artikelList) {
    throw new ResponseError(404, 'Gagal mendapatkan artikel');
  }
  return { artikelList, count };
};

const getArtikelById = async (artikelId) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal mendapatkan detail artikel');
  }
  return artikel;
};

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

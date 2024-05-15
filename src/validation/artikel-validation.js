const Joi = require('joi');

const createArtikelValidation = Joi.object({
  judul: Joi.string().required(),
  deskripsi: Joi.string().required(),
  tanggal: Joi.date().iso().required(),
  sumber: Joi.string().uri().required(),
  gambar: Joi.string().uri().optional(),
  kategori: Joi.string().required(),
});

const getArtikelValidation = Joi.number().positive().required();

const updateArtikelValidation = Joi.object({
  judul: Joi.string().optional(),
  deskripsi: Joi.string().optional(),
  tanggal: Joi.date().iso().optional(),
  sumber: Joi.string().uri().optional(),
  gambar: Joi.string().uri().optional(),
  kategori: Joi.string().optional(),
});

module.exports = {
  createArtikelValidation,
  updateArtikelValidation,
  getArtikelValidation,
};

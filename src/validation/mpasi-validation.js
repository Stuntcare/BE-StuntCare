const Joi = require('joi');

const createMpasiValidation = Joi.object({
  makanan: Joi.string().required(),
  porsi: Joi.number().integer().min(1).required(),
  bahan: Joi.object().pattern(
    Joi.string(),
    Joi.string().required(),
  ).required(),
  cara_masak: Joi.array().items(Joi.string().required()).required(),
  kandungan: Joi.object().pattern(
    Joi.string(),
    Joi.string().optional(),
  ).optional(),
  kategori: Joi.string().required(),
  gambar: Joi.string().uri().optional(),
});

const updateMpasiValidation = Joi.object({
  makanan: Joi.string().optional(),
  porsi: Joi.number().integer().min(1).optional(),
  bahan: Joi.object().pattern(
    Joi.string(),
    Joi.string().optional(),
  ).optional(),
  cara_masak: Joi.array().items(Joi.string().optional()).optional(),
  kandungan: Joi.object().pattern(
    Joi.string(),
    Joi.string().optional(),
  ).optional(),
  kategori: Joi.string().optional(),
  gambar: Joi.string().uri().optional(),
});

const getMpasiValidation = Joi.number().positive().required();

module.exports = {
  createMpasiValidation,
  updateMpasiValidation,
  getMpasiValidation,
};

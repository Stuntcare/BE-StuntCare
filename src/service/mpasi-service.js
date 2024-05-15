const Mpasi = require('../models/mpasi');
const { validate } = require('../validation/validation');
const MpasiValidation = require('../validation/mpasi-validation');
const ResponseError = require('../error/response-error');

// Fungsi untuk membuat data MPASI baru
const createMpasi = async (mpasiData) => {
  const validatedData = validate(MpasiValidation.createMpasiValidation, mpasiData);
  const mpasi = await Mpasi.create(validatedData);
  return mpasi;
};

// Fungsi untuk mendapatkan semua MPASI
const getAllMpasi = async () => {
  const ListMpasi = await Mpasi.findAll();
  if (!ListMpasi) {
    throw new ResponseError(404, 'Gagal mendapatkan data Makanan');
  }
  return ListMpasi;
};

// Fungsi untuk mendapatkan data MPASI berdasarkan ID
const getMpasiById = async (mpasiId) => {
  const validatedId = validate(MpasiValidation.getMpasiValidation, mpasiId);
  const mpasi = await Mpasi.findByPk(validatedId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal mendapatkan detail Makanan');
  }
  return mpasi;
};

// Fungsi untuk melakukan update data MPASI berdasarkan ID
const updateMpasi = async (mpasiId, updatedData) => {
  const validatedId = validate(MpasiValidation.getMpasiValidation, mpasiId);
  const validatedData = validate(MpasiValidation.updateMpasiValidation, updatedData);

  const mpasi = await Mpasi.findByPk(validatedId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal mengubah data Makanan');
  }

  await mpasi.update(validatedData);
  return mpasi;
};

// Fungsi untuk menghapus data MPASI berdasarkan ID
const deleteMpasiById = async (mpasiId) => {
  const validatedId = validate(MpasiValidation.getMpasiValidation, mpasiId);
  const mpasi = await Mpasi.findByPk(validatedId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal menghapus data makanan');
  }

  await mpasi.destroy();
};

module.exports = {
  createMpasi,
  getAllMpasi,
  getMpasiById,
  updateMpasi,
  deleteMpasiById,
};

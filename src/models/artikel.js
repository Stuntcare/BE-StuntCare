const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Artikel = db.define('artikel', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
  },
  tanggal: {
    type: DataTypes.DATE,
  },
  sumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

module.exports = Artikel;

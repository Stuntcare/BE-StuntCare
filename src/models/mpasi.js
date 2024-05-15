const Sequelize = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const Mpasi = db.define('mpasi', {
  makanan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porsi: {
    type: DataTypes.INTEGER,
  },
  bahan: {
    type: DataTypes.JSON,
  },
  cara_masak: {
    type: DataTypes.JSON,
  },
  kandungan: {
    type: DataTypes.JSON,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
});

module.exports = Mpasi;

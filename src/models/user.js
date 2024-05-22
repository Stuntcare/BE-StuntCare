const Sequelize = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const users = db.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

module.exports = users;

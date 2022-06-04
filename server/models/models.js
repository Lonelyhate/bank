const sequelize = require('../db');
const { DataTypes } = require('sequelize');

//Создание таблиц
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    password: { type: DataTypes.STRING },
    number: { type: DataTypes.STRING, unique: true, allowNull: false },
    fio: { type: DataTypes.STRING },
    account_number: { type: DataTypes.INTEGER, defaultValue: 40000 },
    balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
});

const Operation = sequelize.define('operation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, defaultValue: Date.now() },
    sum: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    coming: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
    consum: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    message: { type: DataTypes.STRING },
});

User.hasMany(Operation)
Operation.belongsTo(User)

module.exports = {
    User,
    Operation
};

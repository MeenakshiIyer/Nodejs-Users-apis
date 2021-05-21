"use strict";

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/sqliteDB');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
"use strict";

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const db = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to sqliteDB has been established successfully.');
    } catch (error) {-
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    sequelize,
    db
}
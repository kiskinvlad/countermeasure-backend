const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const CONFIG = require('../config/config').CONFIG;
/**
 * Sequelize configuration
 * @type {Sequelize}
 * @param CONFIG.db_name - database name
 * @param CONFIG.db_user - database administrator user
 * @param CONFIG.db_password - database administrator password
 * @param options - sequelize options
 *  @param CONFIG.db_host - database host address
 *  @param CONFIG.db_dialect - database dialect (mysql)
 *  @param CONFIG.port - database port
 *  @param operatorsAliases - enable operators aliases
 *
 */
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    operatorsAliases: false
});
/**
 * database constant
 * @type object
 */
const db = {};

/**
 * Read models files and create associations
 */
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

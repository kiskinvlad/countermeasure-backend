require('dotenv').config();
/**
 * App configs
 * @type object
 * @param CONFIG.app - application environment
 * @param CONFIG.port - application port
 * @param CONFIG.db_dialect - database dialect
 * @param CONFIG.db_host - database host address
 * @param CONFIG.port - database port
 * @param CONFIG.db_name - database name
 * @param CONFIG.db_user - database user admin
 * @param CONFIG.db_paswword - database user admin password
 * @param CONFIG.jwt_encryption - javascript web token encryption key
 * @param CONFIG.jwt_expiration - javascript web token expiration time
 */
const CONFIG = {};

CONFIG.app         = process.env.APP         || 'development';
CONFIG.port        = process.env.PORT        || '3000';

CONFIG.db_dialect  = process.env.DB_DIALECT  || 'mysql';
CONFIG.db_host     = process.env.DB_HOST     || 'localhost';
CONFIG.db_port     = process.env.DB_PORT     || '3306';
CONFIG.db_name     = process.env.DB_NAME     || 'mydb';
CONFIG.db_user     = process.env.DB_USER     || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'administrator';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'encrypt';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

module.exports.CONFIG = CONFIG;
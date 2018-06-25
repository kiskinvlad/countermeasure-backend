const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config').CONFIG;
const to = require('../utils').to;
const TE = require('../utils').TE;


module.exports = (sequelize, Sequelize) => {
    /**
     * User table data model
     * @module User
     * @property User model
     * @type {Model|void|*|{}}
     * @param user_id
     * @param org_id
     * @param role_id
     * @param email
     * @param password
     * @param first_name
     * @param last_name
     * @param phone
     * @param create_time
     * @param enabled
     */
    const User = sequelize.define('USER', {
        user_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        org_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        role_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: { isEmail: {msg: 'Email invalid.'} }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        enabled: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'USER',
        timestamps: false
    });
    /**
     * Model associate method. Create user table one to one association with organization table.
     * @method User.associate
     * @param models
     */
    User.associate = function (models) {
        this.belongsTo(models.ORGANIZATION, {foreignKey: 'org_id', targetKey: 'org_id'});
    };
    /**
     * Hash user before save to database
     */
    User.beforeSave(async (user) => {
        let err;
        if (user.changed('password')) {
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            // Uncoment below when passwords require hashing
            // user.password = hash;
        }
    });
    /**
     * Compare user password while register
     * @param pw
     * @return {Promise<User>}
     */
    User.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) TE('password not set');

        //[err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (pw === this.password) pass = pw;
        if (err) TE(err);

        if (!pass) TE('invalid password');

        return this;
    };
    /**
     * Get user javascript web token
     * @return {string} - Barer auth
     */
    User.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return 'Bearer ' + jwt.sign({ user_id: this.user_id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };
    /**
     * Convert model data to json format.
     * @method toWeb
     * @return JSON
     */
    User.prototype.toWeb = function () {
        return this.toJSON();
    };

    return User;
};

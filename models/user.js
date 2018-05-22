const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {

    var User = sequelize.define('USER', {
        userid: {
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
            validate: { isEmail: {msg: "Email invalid."} }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        enabled: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'USER',
        timestamps: false
    });

    User.associate = function (models) {
        this.belongsTo(models.ORGANIZATION, {foreignKey: 'org_id', targetKey: 'org_id'});
    };

    User.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    User.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) TE('password not set');

        //[err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (pw === this.password) pass = pw;
        if (err) TE(err);

        if (!pass) TE('invalid password');

        return this;
    }

    User.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " + jwt.sign({ userid: this.userid }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };

    User.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return User;
};

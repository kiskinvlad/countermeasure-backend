module.exports = (sequelize, Sequelize) => {

    var Organization = sequelize.define('ORGANIZATION', {
        org_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        org_name: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        first_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        last_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."},
                isNumeric: { msg: "not a valid phone number."}
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: { isEmail: {msg: "Email invalid."} }
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        enabled: {
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        tableName: 'ORGANIZATION'
    });

    Organization.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    Organization.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Organization;
};

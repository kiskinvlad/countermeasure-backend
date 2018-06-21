module.exports = (sequelize, Sequelize) => {

    Organization = sequelize.define('ORGANIZATION', {
        org_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        org_name: {
            type: Sequelize.STRING,
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
            validate: { len: {args: [7, 20], msg: 'Phone number invalid, too short.'},
                isNumeric: { msg: 'not a valid phone number.'}
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: { isEmail: {msg: 'Email invalid.'} }
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        enabled: {
            type: Sequelize.INTEGER
        },
        member_limit: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'ORGANIZATION',
        timestamps: false
    });

    Organization.associate = function(models) {
        this.hasMany(models.CASE, {foreignKey: 'org_id', targetKey: 'org_id'});
    };

    return Organization;
};

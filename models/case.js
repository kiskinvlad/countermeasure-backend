const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {

    var Case = sequelize.define('CASE', {
        case_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        org_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        matter_id: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true,
        tableName: 'CASE',
        timestamps: false
    });
    return Case;
};

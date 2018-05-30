const bcrypt 			= require('bcrypt');
const bcrypt_p 		= require('bcrypt-promise');
const jwt         = require('jsonwebtoken');

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
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_by_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updated_by_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'USER',
                key: 'userid'
            }
        },
    }, {
        freezeTableName: true,
        tableName: 'CASE',
        timestamps: false
    });
  
    Case.associate = function(models) {
        this.hasMany(models.DISPUTED_T1_TA, {foreignKey: 'case_id', targetKey: 'case_id'});
    };

    Case.associate = function (models) {
        this.belongsTo(models.ORGANIZATION, {foreignKey: 'org_id', targetKey: 'org_id'});
    };

    return Case;
};

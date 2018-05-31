module.exports = (sequelize, Sequelize) => {

    var Scenario = sequelize.define('SCENARIO', {
        scenario_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        case_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        probability: {
            type: Sequelize.FLOAT,
            notEmpty: true,
            defaultValue: 0
        },
        description: {
            type: Sequelize.STRING,
            notEmpty: true        
        },
        taxable_income: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true,
            defaultValue: 0.00
        },
        taxes: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true,
            defaultValue: 0.00
        },
        penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true,
            defaultValue: 0.00
        },
        interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true,
            defaultValue: 0.00
        }
    }, {
        freezeTableName: true,
        tableName: 'SCENARIIO',
        timestamps: false
    });

    return Scenario;
};

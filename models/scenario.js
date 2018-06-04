module.exports = (sequelize, Sequelize) => {

    const Scenario = sequelize.define('SCENARIO', {
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
        },
        order_position: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    }, {
        freezeTableName: true,
        tableName: 'SCENARIO',
        timestamps: false
    });

    Scenario.associate = function(models) {
        this.hasOne(models.CASE, {foreignKey: 'case_id', targetKey: 'case_id'});
    };

    Scenario.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Scenario;
};

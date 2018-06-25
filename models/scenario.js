module.exports = (sequelize, Sequelize) => {
    /**
     * Scenario table data model
     * @module Scenario
     * @property Scenario model
     * @type {Model|void|*|{}}
     * @param scenario_id
     * @param case_id
     * @param name
     * @param order_position
     * @param name
     * @param probability
     * @param description
     * @param taxable_income
     * @param taxes
     * @param penalties
     * @param interest
     * @param order_position
     */
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
    /**
     * Model associate method. Create scenario table one to one association with case table.
     * @method Scenario.associate
     * @param models
     */
    Scenario.associate = function(models) {
        this.hasOne(models.CASE, {foreignKey: 'case_id', targetKey: 'case_id'});
    };
    /**
     * Convert model data to json format.
     * @method toWeb
     * @return JSON
     */
    Scenario.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Scenario;
};

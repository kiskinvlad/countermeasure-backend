module.exports = (sequelize, Sequelize) => {
    /**
     * Category table data model
     * @module Category
     * @property Category model
     * @type {Model|void|*|{}}
     * @param category_id
     * @param case_id
     * @param disputed_t1_ta_id
     * @param order_position
     * @param name
     * @param taxable_income
     * @param income_subject_to_gnp
     * @param other_amounts_payable
     * @param credits_applied_on_filing
     * @param federal_non_refundable_tax_credits
     * @param provincial_non_refundable_tax_credits
     * @param other_penalties
     */
    const Category = sequelize.define('CATEGORY', {
        category_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        case_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        disputed_t1_ta_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        order_position: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        taxable_income: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        income_subject_to_gnp: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        other_amounts_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        credits_applied_on_filing: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        federal_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        provincial_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        other_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        }
    },
    {
        freezeTableName: true,
        tableName: 'CATEGORY',
        timestamps: false
    });
    /**
     * Model associate method. Create category table one to one association with case table.
     * @method Category.associate
     * @param models
     */
    Category.associate = function(models) {
        this.hasOne(models.CASE, {foreignKey: 'case_id', targetKey: 'case_id'});
    };
    /**
     * Convert model data to json format.
     * @method toWeb
     * @return JSON
     */
    Category.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Category;
};

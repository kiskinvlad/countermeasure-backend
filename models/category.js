module.exports = (sequelize, Sequelize) => {

    var Category = sequelize.define('CATEGORY', {
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
                type: Sequelize.DECIMAL(15,2).ZEROFILL.UNSIGNED,
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
            }
        },
        {
            freezeTableName: true,
            tableName: 'CATEGORY',
            timestamps: false
        });

    Category.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Category;
};

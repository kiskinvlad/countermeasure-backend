module.exports = (sequelize, Sequelize) => {

    var Disputed_t1_ta = sequelize.define('DISPUTED_T1_TA', {
        disputed_t1_ta_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        case_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        taxpayer: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        year: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        province: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        federal_tax_applies: {
            type: Sequelize.BOOLEAN,
            notEmpty: true
        },
        provincial_tax_applies: {
            type: Sequelize.BOOLEAN,
            notEmpty: true
        },
        filing_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        estimated_interest_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        TP_taxable_income: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_income_subject_to_gnp: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_net_federal_tax: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_net_provincial_tax: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_federal_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_provincial_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_other_amounts_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_total_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_credits_applied_on_filing: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_balance_before_penalties_and_interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_gross_negligence_penalty: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_late_filing_penalty_rate: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        TP_late_filing_penalty: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_other_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_total_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_total_tax_and_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_initial_payment: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_estimated_interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        TP_estimated_interest_rate: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        TP_total_debt: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_taxable_income: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_income_subject_to_gnp: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_net_federal_tax: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_net_provincial_tax: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_federal_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_provincial_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_other_amounts_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_total_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_credits_applied_on_filing: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_balance_before_penalties_and_interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_gross_negligence_penalty: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_late_filing_penalty_rate: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_late_filing_penalty: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_other_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_total_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_total_tax_and_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_initial_payment: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_estimated_interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        GP_estimated_interest_rate: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        GP_total_debt: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_taxable_income: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_income_subject_to_gnp: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_net_federal_tax: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_net_provincial_tax: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_federal_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_provincial_non_refundable_tax_credits: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_other_amounts_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_total_payable: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_credits_applied_on_filing: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_balance_before_penalties_and_interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_gross_negligence_penalty: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_late_filing_penalty_rate: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_late_filing_penalty: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_other_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_total_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_total_tax_and_penalties: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_initial_payment: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_estimated_interest: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        },
        DIFF_estimated_interest_rate: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        DIFF_total_debt: {
            type: Sequelize.DECIMAL(15,2),
            notEmpty: true
        }
    }, {
        freezeTableName: true,
        tableName: 'DISPUTED_T1_TA',
        timestamps: false
    });

    Disputed_t1_ta.associate = function(models) {
        this.hasOne(models.CATEGORY, {foreignKey: 'disputed_t1_ta_id', targetKey: 'disputed_t1_ta_id'});
    };

    Disputed_t1_ta.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Disputed_t1_ta;
};

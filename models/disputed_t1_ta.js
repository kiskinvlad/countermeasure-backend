module.exports = (sequelize, Sequelize) => {
    /**
     * Disputed_t1_ta table data model
     * @module Disputed_t1_ta
     * @property Disputed_t1_ta model
     * @type {Model|void|*|{}}
     * @param disputed_t1_ta_id
     * @param case_id
     * @param taxpayer
     * @param year
     * @param province
     * @param federal_tax_applies
     * @param provincial_tax_applies
     * @param filing_date
     * @param estimated_interest_date

     * @param TP_taxable_income
     * @param TP_income_subject_to_gnp
     * @param TP_net_federal_tax
     * @param TP_net_provincial_tax
     * @param TP_federal_non_refundable_tax_credits
     * @param TP_provincial_non_refundable_tax_credits
     * @param TP_other_amounts_payable
     * @param TP_total_payable
     * @param TP_credits_applied_on_filing
     * @param TP_balance_before_penalties_and_interest
     * @param TP_gross_negligence_penalty
     * @param TP_late_filing_penalty_rate
     * @param TP_late_filing_penalty
     * @param TP_other_penalties
     * @param TP_total_penalties
     * @param TP_total_tax_and_penalties
     * @param TP_initial_payment
     * @param TP_estimated_interest
     * @param TP_estimated_interest_rate
     * @param TP_total_debt

     * @param GP_taxable_income
     * @param GP_income_subject_to_gnp
     * @param GP_net_federal_tax
     * @param GP_net_provincial_tax
     * @param GP_federal_non_refundable_tax_credits
     * @param GP_provincial_non_refundable_tax_credits
     * @param GP_other_amounts_payable
     * @param GP_total_payable
     * @param GP_credits_applied_on_filing
     * @param GP_balance_before_penalties_and_interest
     * @param GP_gross_negligence_penalty
     * @param GP_late_filing_penalty_rate
     * @param GP_late_filing_penalty
     * @param GP_other_penalties
     * @param GP_total_penalties
     * @param GP_total_tax_and_penalties
     * @param GP_initial_payment
     * @param GP_estimated_interest
     * @param GP_estimated_interest_rate
     * @param GP_total_debt

     * @param DIFF_taxable_income
     * @param DIFF_income_subject_to_gnp
     * @param DIFF_net_federal_tax
     * @param DIFF_net_provincial_tax
     * @param DIFF_federal_non_refundable_tax_credits
     * @param DIFF_provincial_non_refundable_tax_credits
     * @param DIFF_other_amounts_payable
     * @param DIFF_total_payable
     * @param DIFF_credits_applied_on_filing
     * @param DIFF_balance_before_penalties_and_interest
     * @param DIFF_gross_negligence_penalty
     * @param DIFF_late_filing_penalty_rate
     * @param DIFF_late_filing_penalty
     * @param DIFF_other_penalties
     * @param DIFF_total_penalties
     * @param DIFF_total_tax_and_penalties
     * @param DIFF_initial_payment
     * @param DIFF_estimated_interest
     * @param DIFF_estimated_interest_rate
     * @param DIFF_total_debt
     */
    const Disputed_t1_ta = sequelize.define('DISPUTED_T1_TA', {
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
    /**
     * Model associate method. Create disputed_t1_ta table one to one association with category table.
     * @method Disputed_t1_ta.associate
     * @param models
     */
    Disputed_t1_ta.associate = function(models) {
        this.hasOne(models.CATEGORY, {foreignKey: 'disputed_t1_ta_id', targetKey: 'disputed_t1_ta_id'});
    };
    /**
     * Convert model data to json format.
     * @method toWeb
     * @return JSON
     */
    Disputed_t1_ta.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Disputed_t1_ta;
};

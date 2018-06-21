const Disputed = require('../models').DISPUTED_T1_TA;
const TE = require('../utils').TE;
const to = require('../utils').to;

const getDisputed = async function(disputed_t1_ta_id){
    let disputed_info = {};
    disputed_info.status = 'get disputed';

    if(!disputed_t1_ta_id) TE('Need category id for disputed');

    let disputed, err, where;
    where = {
        disputed_t1_ta_id: disputed_t1_ta_id
    };
    [err, disputed] = await to(Disputed.findOne({
        where: where,
        raw: true
    }));

    if(err) TE(err.message);

    if(!disputed) TE('Disputed not exist');
    return disputed;
};
module.exports.getDisputed = getDisputed;

const getDisputes = async function(){
    let disputed_info = {};
    disputed_info.status = 'get disputed';

    let disputes, err;
    [err, disputes] = await to(Disputed.findAll({raw: true}));
    if(err) TE(err.message);
    if(!disputes) TE('Disputed not exist');
    return disputes;
};
module.exports.getDisputes = getDisputes;

const createDisputed = async function(body){
    let err, disputed;
    delete body.disputed['case_id'];
    [err, disputed] = await to(
        Disputed.create({
            case_id: body.case_id,
            ...body.disputed
        })
    );

    if (err) TE(err.message)
    if (!disputed) TE("Can't create a disputed")

    return disputed;
};
module.exports.createDisputed = createDisputed;

const updateDisputed = async function(body){
    let err, disputed;
    [err, disputed] = await to(
        Disputed.update({
            case_id: body.case_id,
            ...body.disputed}, {
            where: {disputed_t1_ta_id: body.disputed.disputed_t1_ta_id}
        })
    );

    if (err) {
        TE("Can't update a disputed");
    }

    return disputed;
};
module.exports.updateDisputed = updateDisputed;

const removeDisputed = async function(body){
    let err;
    await to(
        Disputed.destroy({
            where: {disputed_t1_ta_id: body.disputed_id}
        })
    );

    if (err) {
        TE("Can't remove a disputed");
    }

    return true;
};
module.exports.removeDisputed = removeDisputed;

const getDisputesByCase = async function(case_id){
    let disputes, err;
    [err, disputes] = await to(Disputed.findAll({where: {case_id: case_id}}));
    if(err) TE(err.message);
    if(!disputes) TE('Disputes not exist');
    return disputes;
};
module.exports.getDisputesByCase = getDisputesByCase;

const getDisputesBySummary = async function(case_id){
    
    let disputes = [], err, res = [];
    [err, disputes] = await to(Disputed.findAll({
        where: {case_id: case_id},
        attributes: [
            'taxpayer',
            'year',
            'province',
            'DIFF_taxable_income',
            'DIFF_total_tax_and_penalties',
            'DIFF_balance_before_penalties_and_interest',
            'DIFF_estimated_interest',
            'DIFF_total_debt'
        ],
        order: [['taxpayer', 'ASC']]
    }));

    if(err) TE(err.message);
    if(!disputes) TE('Disputes not exist');

    let arr = [];
    for (let i = 0; i < disputes.length; i ++) {
        if (!arr.length) {
            arr.push(disputes[i]);
        } else if (disputes[i].taxpayer === disputes[i-1].taxpayer) {
            arr.push(disputes[i]);
        } else {
            res.push(arr);
            arr = [];
            arr.push(disputes[i]);
        }
    }
    res.push(arr);
    res.push(disputes);

    for (let i = 0; i < res.length; i ++) {
        let tmp = res[i];
        let total = {DIFF_taxable_income: 0, DIFF_balance_before_penalties_and_interest: 0, DIFF_taxable_income: 0, DIFF_total_tax_and_penalties: 0, 
            DIFF_balance_before_penalties_and_interest: 0, DIFF_estimated_interest: 0, DIFF_total_debt: 0};
        for (let j = 0; j < tmp.length; j ++) {
            total.DIFF_taxable_income = 0 - -total.DIFF_taxable_income - -tmp[j].DIFF_taxable_income;
            total.DIFF_total_tax_and_penalties = 0 - -total.DIFF_total_tax_and_penalties - -tmp[j].DIFF_total_tax_and_penalties;
            total.DIFF_balance_before_penalties_and_interest = 0 - -total.DIFF_balance_before_penalties_and_interest - -tmp[j].DIFF_balance_before_penalties_and_interest;
            total.DIFF_estimated_interest = 0 - -total.DIFF_estimated_interest - -tmp[j].DIFF_estimated_interest;
            total.DIFF_total_debt = 0 - -total.DIFF_total_debt - -tmp[j].DIFF_total_debt;
        }
        res[i].push(total);
    }
    return res;
};
module.exports.getDisputesBySummary = getDisputesBySummary;
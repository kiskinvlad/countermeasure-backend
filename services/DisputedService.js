const Disputed = require('../models').DISPUTED_T1_TA;
const TE = require('../utils').TE;
const to = require('../utils').to;

const getDisputed = async function(disputed_t1_ta_id){
    let disputed_info = {};
    disputed_info.status = 'get disputed';

    if(!disputed_t1_ta_id) TE('Need category id for disputed');

    let disputed, err, where;
    where = {disputed_t1_ta_id: disputed_t1_ta_id};
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
    console.log("create");
    console.log(body);
    [err, disputed] = await to(
        Disputed.create({
            case_id: body.case_id,
            ...body.disputed
        })
    );

    if (err) {
        TE("Can't create a disputed");
    }

    return disputed;
};
module.exports.createDisputed = createDisputed;

const updateDisputed = async function(body){
    console.log(body);
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
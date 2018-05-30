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
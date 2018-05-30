const disputedService = require('./../services/DisputedService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;

const getDisputed = async function(req, res){
    const disputed_t1_ta_id = req.query.disputed_t1_ta_id;
    let err, disputed;
    [err, disputed] = await to(disputedService.getDisputed(disputed_t1_ta_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {disputed: disputed.toWeb()});
};
module.exports.getDisputed = getDisputed;

const getDisputes = async function(req, res){
    let err, disputes, disputesArray;
    [err, disputes] = await to(disputedService.getDisputes());
    if(err) return ReE(res, err, 422);
    disputesArray = JSON.parse(JSON.stringify(disputes));
    return ReS(res, {disputes: disputesArray});
};
module.exports.getDisputes = getDisputes;


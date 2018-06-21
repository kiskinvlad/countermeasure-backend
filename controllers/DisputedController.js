const disputedService = require('./../services/DisputedService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;

const getDisputed = async function(req, res){
    const disputed_t1_ta_id = req.query.disputed_t1_ta_id;
    let err, disputed;
    [err, disputed] = await to(disputedService.getDisputed(disputed_t1_ta_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {disputed: disputed});
};
module.exports.getDisputed = getDisputed;

const getDisputesByCase = async function(req, res){
    const case_id = req.query.case_id;
    let err, disputes;
    [err, disputes] = await to(disputedService.getDisputesByCase(case_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {disputes: disputes});
};
module.exports.getDisputesByCase = getDisputesByCase;

const getDisputesBySummary = async function(req, res){
    const case_id = req.query.case_id;
    let err, disputes;
    [err, disputes] = await to(disputedService.getDisputesBySummary(case_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {disputes: disputes});
};
module.exports.getDisputesBySummary = getDisputesBySummary;

const getDisputes = async function(req, res){
    let err, disputes, disputesArray;
    [err, disputes] = await to(disputedService.getDisputes());
    if(err) return ReE(res, err, 422);
    disputesArray = JSON.parse(JSON.stringify(disputes));
    return ReS(res, {disputes: disputesArray});
};
module.exports.getDisputes = getDisputes;

const createDisputed = async function(req, res){
    try {
        let err, disputes;
        [err, disputes] = await to(disputedService.createDisputed(req.body));
        if(err) return ReE(res, err, 422);

        [err, disputes] = await to(disputedService.getDisputesByCase(req.body.case_id));
        if(err) return ReE(res, err, 422);
        
        return ReS(res, {disputes: JSON.parse(JSON.stringify(disputes))});
    }
    catch(err) {
        return ReE(res, err);
    }
};
module.exports.createDisputed = createDisputed;

const updateDisputed = async function(req, res){
    try {
        let err, disputes;
        await to(disputedService.updateDisputed(req.body));

        [err, disputes] = await to(disputedService.getDisputesByCase(req.body.case_id));
        if(err) return ReE(res, err, 422);
        
        return ReS(res, {disputes: JSON.parse(JSON.stringify(disputes))});
    }
    catch(err) {
        return ReE(res, err);
    }
};
module.exports.updateDisputed = updateDisputed;

const removeDisputed = async function(req, res){
    let err;
    try {
        [err, disputes] = await to(disputedService.removeDisputed(req.body));
        if(err) return ReE(res, err, 422);

        [err, disputes] = await to(disputedService.getDisputesByCase(req.body.case_id));
        if(err) return ReE(res, err, 422);
        
        return ReS(res, {disputes: disputes});
    }
    catch(err) {
        return ReE(res, err);
    }
};
module.exports.removeDisputed = removeDisputed;
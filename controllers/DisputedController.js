const disputedService = require('./../services/DisputedService');

const getDisputed = async function(req, res){
    const disputed_t1_ta_id = req.query.disputed_t1_ta_id;
    let err, disputed;
    [err, disputed] = await to(disputedService.getDisputed(disputed_t1_ta_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {disputed: disputed.toWeb()});
}
module.exports.getDisputed = getDisputed;


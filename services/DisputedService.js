const Disputed = require('../models').DISPUTED_T1_TA;

const getDisputed = async function(disputed_t1_ta_id){
    let disputed_info = {};
    disputed_info.status = 'get disputed';

    if(!disputed_t1_ta_id) TE('Need category id for disputed');

    let disputed;
    [err, disputed] = await to(Disputed.findOne({where:{disputed_t1_ta_id: disputed_t1_ta_id},raw: true}));
    //console.log(err, disputed, disputed_t1_ta_id);
    if(err) TE(err.message);

    if(!disputed) TE('Disputed not exist');
    return disputed;

}
module.exports.getDisputed = getDisputed;
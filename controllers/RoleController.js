const roleService = require('./../services/RoleService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;

const getRole = async function(req, res){
    const role_id = req.query.role_id;
    let err, role;
    [err, role] = await to(roleService.getRole(role_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {user:role.toWeb()});
};
module.exports.getRole = getRole;
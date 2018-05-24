const roleService = require('./../services/RoleService');

const getRole = async function(req, res){
    const role_id = req.query.role_id;
    let err, role;
    [err, role] = await to(roleService.getRole(req.query.role_id));
    if(err) return ReE(res, err, 422);

    return ReS(res, {user:role.toWeb()});
}
module.exports.getRole = getRole;
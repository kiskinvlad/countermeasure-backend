const Role = require('../models').USER_ROLE;

const getRole = async function(role_id){
    let role_info = {};
    role_info.status = 'get role';

    if(!role_id) TE('Need id for role');

    let role;
    [err, role] = await to(Role.findOne({where:{role_id:role_id}}));
    console.log(err, role, role_id);
    if(err) TE(err.message);

    if(!role) TE('Role not exist');

    return role;

}
module.exports.getRole = getRole;
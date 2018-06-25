const Role = require('../models').USER_ROLE;
/**
 * Get user role
 * @method getRole
 * @param role_id
 * @return {Promise<*>}
 */
const getRole = async function(role_id){
    let role_info = {};
    role_info.status = 'get role';

    if(!role_id) TE('Need id for role');

    let role, err, where;
    where = {role_id:role_id};
    [err, role] = await to(Role.findOne({
        where: where
    }));

    if(err) TE(err.message);

    if(!role) TE('Role not exist');

    return role;
};
module.exports.getRole = getRole;
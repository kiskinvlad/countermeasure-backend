const PermissionService = require('./../services/PermissionService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
/**
 * Create permission
 * @method create
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const create = async function(req, res) {
};
/**
 * Create user permissions
 * @method bulkCreate
 * @param req
 * @param res
 * @return {Promise<*>}
 */
// Insert multiple rows into ORGANIZATION_GUEST_PERMISSIONS table
const bulkCreate = async function(req, res) {
  let ret, err, data, i, len;
  const requestor = req.user;
  const cases = JSON.parse(req.body.cases);
  const user_id = isNaN(parseInt(req.body.user_id)) ? null : parseInt(req.body.user_id);
  const org_id = isNaN(parseInt(req.body.org_id)) ? null : parseInt(req.body.org_id);
  const limit = isNaN(parseInt(req.body.limit)) ? null : parseInt(req.body.limit);
  // Check if user is authorized to add organization guest permissions
  if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id !== org_id)) {
    return ReE(res, 'Unauthorized access.', 401);
  }
  // Create array of organization guest permissions to be inserted
  permissions = [];
  len = cases.length;
  for (i = 0; i < len; i++) {
    permissions[i] = {
      org_id: org_id,
      user_id: user_id,
      case_id: cases[i]
    }
  }
  // Insert organization guest permissions
  [err, data] = await to(PermissionService.bulkCreate(permissions));
  if (err) {
    return ReE(res, 'Failed to add guest permissions.', 400);
  }
  return ReS(res, {user_id: user_id, org_id: org_id, limit: limit}, 200);
};
/**
 * Get permission
 * @method get
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const get = async function (req, res) {
};
/**
 * Get permissions by user id
 * @method getPermissionsBySerID
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getPermissionsByUserID = async function (req, res) {
  const requestor = req.user;
  const user_id = isNaN(parseInt(req.query.user_id)) ? null : parseInt(req.query.user_id);
  const org_id = isNaN(parseInt(req.query.org_id)) ? null : parseInt(req.query.org_id);
  const offset = isNaN(parseInt(req.query.offset)) ? null : parseInt(req.query.offset);
  const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);

  if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id !== org_id)) {
      return ReE(res, 'Unauthorized access.', 400);
  }
  [err, data] = await to(PermissionService.getCasePermissions(user_id, org_id, offset, limit, req.query));
  if (err) {
    return ReE(res, err, 422);
  }
  return ReS(res, data, 200);
};
/**
 * Remove permission
 * @method remove
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const remove = async function(req, res) {
};
/**
 * Remove user permissions
 * @method bulkRemove
 * @param req
 * @param res
 * @return {Promise<*>}
 */
// Delete multiple rows from ORGANIZATION_GUEST_PERMISSIONS table
const bulkRemove = async function(req, res) {
  let ret, err, data, i, len;
  const requestor = req.user;
  const cases = JSON.parse(req.query.cases);
  const user_id = isNaN(parseInt(req.query.user_id)) ? null : parseInt(req.query.user_id);
  const org_id = isNaN(parseInt(req.query.org_id)) ? null : parseInt(req.query.org_id);
  const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);
  // Check if user is authorized to remove organization guest permissions
  if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id !== org_id)) {
    return ReE(res, 'Unauthorized access.', 400);
  }
  // Delete organization guest permissions
  [err, data] = await to(PermissionService.bulkRemove(org_id, user_id, cases));
  if (err) {
    return ReE(res, 'Failed to delete guest permissions.', 400);
  }
  return ReS(res, {user_id: user_id, org_id: org_id, limit: limit}, 200);
};

module.exports = {
    create, get, remove, bulkCreate, getPermissionsByUserID, bulkRemove
};

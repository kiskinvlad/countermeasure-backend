const Organization_guest_permissions = require('../models').ORGANIZATION_GUEST_PERMISSIONS;
const CaseService = require('./CaseService');
const sequelize = require('../models').sequelize;
const Op = require("sequelize").Op;

const bulkCreate = async function(permissions) {
  let err, data;
  [err, data] = await to(
    Organization_guest_permissions.bulkCreate(
      permissions,
      { fields: ['org_id', 'user_id', 'case_id'] }
    )
  );
  if(err) TE(err.message);
  return data;
}

// Get all cases for an organization with a field for each case that indicates if
// the specified user has access to that case or not.
const getCasePermissions = async function(user_id, org_id, offset, limit, params) {
  let data = {};
  let where = {org_id: org_id};
  let replacements = {org_id: org_id, user_id: user_id};
  let query = 'SELECT C.`case_id`, C.`matter_id`, C.`name`, C.`updated_at`, '
    + 'CONCAT_WS(" ", U.`first_name`, U.`last_name`) AS `updated_by`, P.`access` '
    + 'FROM `CASE` AS C LEFT JOIN `USER` AS U ON C.`updated_by_id`=U.`user_id` '
    + 'LEFT JOIN (SELECT `case_id`, 1 AS `access` FROM `ORGANIZATION_GUEST_PERMISSIONS`'
    + 'WHERE org_id = :org_id and user_id = :user_id) AS P ON P.`case_id`=C.`case_id`'
    + 'WHERE C.`org_id` = :org_id';
  // Only get recent cases
  if (params.filter === 'recent') {
    query += ' AND C.`updated_at` > CURDATE() - INTERVAL 7 DAY';
    where.updated_at = {[Op.gt]: new Date(new Date().setDate(new Date().getDate() - 7))};
  }
  // Filter by matter_id or name
  if (params.search) {
    let search = '%' + params.search + '%';
    query += ' AND (C.`matter_id` LIKE :search OR C.`name` LIKE :search)';
    replacements.search = search;
    where[Op.or]={matter_id: {[Op.like]: search}, name:{[Op.like]: search}};
  }
  // Add order by and limit clauses to query
  query += getOrderByClause(params.sort_by);
  query += getLimitClause(limit, offset);
  // Get case permissions
  [err, permissions] = await to(
    sequelize.query(
      query,
      {replacements: replacements, type: sequelize.QueryTypes.SELECT}
    )
  );
  if (err) TE(err.message);
  if (permissions) data.permissions = permissions;

  // Get count so that results can be paginated
  if (limit) {
    [err, count] = await to(CaseService.getCount(where));
    if (err) TE(err.message);
    if (count) data.count = count;
  }
  return data;
};

const getOrderByClause = function(sort_by) {
  let clause;
  switch(sort_by) {
    case 'matter_id':
      clause = ' ORDER BY matter_id';
      break;
    case 'name':
      clause = ' ORDER BY name';
      break;
    case 'updated_at':
      clause = ' ORDER BY updated_at DESC';
      break;
    default:
      clause = ' ORDER BY matter_id';
  }
  return clause;
}

const getLimitClause = function(limit, offset) {
  let clause = '';
  if (limit) {
    clause = ' LIMIT ' + limit;
    if (offset) clause += ' OFFSET ' + offset;
  }
  return clause;
}

const bulkRemove = async function(org_id, user_id, cases) {
  let err, data;
  [err, data] = await to(
    Organization_guest_permissions.destroy({
      where: {
        org_id: org_id,
        user_id: user_id,
        case_id: {[Op.in]: cases}
      }
    })
  );
  if(err) TE(err.message);
  return data;
}

module.exports = {
    getCasePermissions, bulkRemove, bulkCreate
};

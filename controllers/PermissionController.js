const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
const Sequelize = require("sequelize");
const Op = Sequelize.Op
const Organization_guest_permissions = require('../models').ORGANIZATION_GUEST_PERMISSIONS;
const Case = require('../models').CASE;
const sequelize = require('../models').sequelize;

const create = async function(req, res) {
};

// Insert multiple rows into ORGANIZATION_GUEST_PERMISSIONS table
const bulkCreate = async function(req, res) {
  let ret, err, data, i, len;
  const requestor = req.user;
  const cases = JSON.parse(req.body.cases);
  const user_id = isNaN(parseInt(req.body.user_id)) ? null : parseInt(req.body.user_id);
  const org_id = isNaN(parseInt(req.body.org_id)) ? null : parseInt(req.body.org_id);
  const offset = isNaN(parseInt(req.body.offset)) ? null : parseInt(req.body.offset);
  const limit = isNaN(parseInt(req.body.limit)) ? null : parseInt(req.body.limit);

  if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id !== org_id)) {
    return ReE(res, 'Unauthorized access.', 400);
  }

  // Create array of data to be inserted
  data = [];
  len = cases.length;
  for (i = 0; i < len; i++) {
    data[i] = {
      org_id: org_id,
      user_id: user_id,
      case_id: cases[i]
    }
  }

  // Insert data
  [err, data] = await to(Organization_guest_permissions.bulkCreate(
    data, { fields: ['org_id', 'user_id', 'case_id'] })
  );
  if (err) {
    return ReE(res, 'Failed to add guest permissions.', 400);
  } else {
    // Successfully added permissions. Call function to return all permissions for this user.
    return getCasePermissions(res, user_id, org_id, offset, limit, req.body);
  }
};

const get = async function (req, res) {
};

const getPermissionsByUserID = async function (req, res) {
  const requestor = req.user;
  const user_id = isNaN(parseInt(req.query.user_id)) ? null : parseInt(req.query.user_id);
  const org_id = isNaN(parseInt(req.query.org_id)) ? null : parseInt(req.query.org_id);
  const offset = isNaN(parseInt(req.query.offset)) ? null : parseInt(req.query.offset);
  const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);

  if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id !== org_id)) {
    return ReE(res, 'Unauthorized access.', 400);
  }

  return getCasePermissions(res, user_id, org_id, offset, limit, req.query);
};

const remove = async function(req, res) {
};

// Delete multiple rows from ORGANIZATION_GUEST_PERMISSIONS table
const bulkRemove = async function(req, res) {
  let ret, err, data, i, len;
  const requestor = req.user;
  const cases = JSON.parse(req.query.cases);
  const user_id = isNaN(parseInt(req.query.user_id)) ? null : parseInt(req.query.user_id);
  const org_id = isNaN(parseInt(req.query.org_id)) ? null : parseInt(req.query.org_id);
  const offset = isNaN(parseInt(req.query.offset)) ? null : parseInt(req.query.offset);
  const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);

  if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id !== org_id)) {
    return ReE(res, 'Unauthorized access.', 400);
  }

  [err, data] = await to(
    Organization_guest_permissions.destroy({
      where: {
        org_id: org_id,
        user_id: user_id,
        case_id: {[Op.in]: cases}
      }
    })
  );

  if (err) {
    return ReE(res, 'Failed to delete guest permissions.', 400);
  } else {
    return getCasePermissions(res, user_id, org_id, offset, limit, req.query);
  }
};

// Get all cases for an organization with a field for each case that indicates if
// the specified user has access to that case or not.
async function getCasePermissions(res, user_id, org_id, offset, limit, params) {
  let data = {};
  let where = {};
  where.org_id = org_id;
  let replacements = {
    org_id: org_id,
    user_id: user_id
  };
  let query = 'SELECT C.`case_id`, C.`matter_id`, C.`name`, C.`updated_at`, '
    + 'CONCAT_WS(" ", U.`first_name`, U.`last_name`) AS `updated_by`, P.`access` '
    + 'FROM `CASE` AS C LEFT JOIN `USER` AS U ON C.`updated_by_id`=U.`user_id` '
    + 'LEFT JOIN (SELECT `case_id`, 1 AS `access` FROM `ORGANIZATION_GUEST_PERMISSIONS`'
    + 'WHERE org_id = :org_id and user_id = :user_id) AS P ON P.`case_id`=C.`case_id`'
    + 'WHERE C.`org_id` = :org_id';

  if (params.filter === 'recent') {
    query += ' AND C.`updated_at` > CURDATE() - INTERVAL 7 DAY';
    where.updated_at = {[Op.gt]: new Date(new Date().setDate(new Date().getDate() - 7))};
  }
  if (params.search) {
    let search = '%' + params.search + '%';
    query += ' AND (C.`matter_id` LIKE :search OR C.`name` LIKE :search)';
    replacements.search = search;
  }
  if (params.sort_by) {
    switch(params.sort_by) {
      case 'matter_id':
        query += ' ORDER BY matter_id';
        break;
      case 'name':
        query += ' ORDER BY name';
        break;
      case 'updated_at':
        query += ' ORDER BY updated_at DESC';
        break;
      default:
        // No sort
    }
  }

  if (limit) {
    query += ' LIMIT ' + limit;
    if (offset) {
      query += ' OFFSET ' + offset;
    }
  }

  [err, permissions] = await to(
    sequelize.query(query,
      {
        replacements: replacements,
        type: sequelize.QueryTypes.SELECT
      }
    )
  );

  // Get count so that results can be paginated
  if (!err && limit) {
    [err, count] = await to(
        Case.count({
            where: where
        })
    );
    if (count) data.count = count;
  }

  if(err) {
    return ReE(res, err, 400);
  }
  data.permissions = permissions;
  return ReS(res, data, 200);
};

module.exports = {
  create, get, remove, bulkCreate, getPermissionsByUserID, bulkRemove
};

const Organization = require('../models').ORGANIZATION;
const sequelize = require('../models').sequelize;
const Op = require("sequelize").Op;

const createOrg = async function(org_name, enabled, member_limit) {
  let err, data;
  [err, data] = await to(
    Organization.create({
      'org_name': org_name,
      'enabled': enabled,
      'member_limit': member_limit
    })
  );
  if(err) TE(err.message);
  return data;
}

const getOrgStats = async function(org_name, limit, offset) {
  let err, data;
  let where = {};
  let replacements = {};
  // Query for getting data/statistics related to organizations
  query = "SELECT O.`org_id`, O.`org_name`, IFNULL(U.`total`, 0) AS `enabled_members`, O.`member_limit`,"
    + " IFNULL(C.`total_cases`, 0) AS `total_cases`,  IFNULL(C.`total_scenarios`, 0) AS `total_scenarios`"
    + " FROM `ORGANIZATION` AS O LEFT JOIN (SELECT `org_id`, count(*) AS `total` FROM `USER`"
    + " WHERE enabled>0 AND (role_id='OA' OR role_id='OM') GROUP BY org_id) U ON O.`org_id`=U.`org_ID`"
    + " LEFT JOIN (SELECT `org_id`, count(DISTINCT(C.`case_id`)) AS `total_cases`, count(`scenario_id`)"
    + " AS `total_scenarios` FROM `CASE` AS C LEFT JOIN SCENARIO S ON C.`case_id`=S.`case_id`"
    + " GROUP BY `org_id`) C ON C.`org_id`=O.`org_id`";
  // Filter organizations by name
  if (org_name) {
    let search = '%' + org_name + '%';
    query += ' WHERE O.`org_name` LIKE :search';
    where.org_name = {[Op.like]: search};
    replacements.search = search;
  }
  // Add limit and offset for pagination
  if (limit) {
    query += ' LIMIT ' + limit;
    if (offset) query += ' OFFSET ' + offset;
  }
  // Get organization data
  [err, data] = await to(
    sequelize.query(query, {replacements: replacements, type: sequelize.QueryTypes.SELECT})
  );
  if(err) TE(err.message);
  return data;
}

/* Return total number of organizations */
const getOrgCount = async function(org_name) {
  let err, data, where;
  if (org_name) {
    // Only count organizations that match or partially match org_name
    where = {where: {org_name: {[Op.like]: `%${org_name}%`}}};
  }
  [err, data] = await to(Organization.count(where));
  if(err) TE(err.message);
  return data;
}

const getOrgByID = async function(org_id) {
  let err, data;
  [err, data] = await to(
    Organization.findOne({
      where: {org_id: org_id}
    })
  );
  if(err) TE(err.message);
  return data;
}

const updateOrg = async function(org, org_id, fields) {
  let err, data;
  [err, data] = await to(
    Organization.update(org,
      {
        where: {org_id: org_id},
        fields: fields
      }
    )
  );
  if(err) TE(err.message);
  return data;
}

module.exports = {
    createOrg, getOrgStats, getOrgCount, getOrgByID, updateOrg
};

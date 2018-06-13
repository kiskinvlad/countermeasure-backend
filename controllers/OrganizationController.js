const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
const Organization = require('../models').ORGANIZATION;
const Op = require("sequelize").Op
const sequelize = require('../models').sequelize;

const createOrg = async function(req, res){
  let err, data;
  const user = req.user;
  const body = req.body;

  if (user.role_id !== 'CA') {
    return ReE(res, {error: 'Unauthorized access.'}, 401);
  }

  [err, data] = await to(
    Organization.create({
      'org_name': body.org_name,
      'enabled': body.enabled,
      'member_limit': body.member_limit
    })
  );

  if (err) {
    return ReE(res, err, 400);
  }

  return ReS(res, {message: 'Successfully created organization.', organization: data});
};

const getOrg = async function(req, res){
};

const getOrgStats = async function(req, res){
  let ret, err, orgs;
  let data = {};
  let where = {};
  let replacements = {};
  const user = req.user;
  const offset = isNaN(parseInt(req.query.offset)) ? null : parseInt(req.query.offset);
  const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);
  const org_name = req.query.org_name;

  if (user.role_id !== 'CA') {
    err = 'Unauthorized access.';
    ret = ReE(res, err, 401);
  }

  if (!err) {
    query = "SELECT O.`org_id`, O.`org_name`, IFNULL(U.`total`, 0) AS `enabled_members`, O.`member_limit`,"
      + " IFNULL(C.`total_cases`, 0) AS `total_cases`,  IFNULL(C.`total_scenarios`, 0) AS `total_scenarios`"
      + " FROM `ORGANIZATION` AS O LEFT JOIN (SELECT `org_id`, count(*) AS `total` FROM `USER`"
      + " WHERE enabled>0 AND (role_id='OA' OR role_id='OM') GROUP BY org_id) U ON O.`org_id`=U.`org_ID`"
      + " LEFT JOIN (SELECT `org_id`, count(DISTINCT(C.`case_id`)) AS `total_cases`, count(`scenario_id`)"
      + " AS `total_scenarios` FROM `CASE` AS C LEFT JOIN SCENARIO S ON C.`case_id`=S.`case_id`"
      + " GROUP BY `org_id`) C ON C.`org_id`=O.`org_id`";

    if (org_name) {
      let search = '%' + org_name + '%';
      query += ' WHERE O.`org_name` LIKE :search';
      replacements.search = search;
      where.org_name = {[Op.like]: search};
    }

    if (limit) {
      query += ' LIMIT ' + limit;
      if (offset) {
        query += ' OFFSET ' + offset;
      }
    }

    [err, orgs] = await to(
      sequelize.query(query,
        {
          replacements: replacements,
          type: sequelize.QueryTypes.SELECT
        }
      )
    );

    if (err) {
      ret = ReE(res, err);
    }
  }

  if (!err) {
    // Get total number of organizations
    data.organizations = orgs;
    [err, count] = await to(Organization.count({where: where}));
    if (!err) {
      data.count = count;
    }
    ret = ReS(res, data);
  }

  return ret;
};

const getOrgByID = async function (req, res) {
  const org_id = req.params.id;
  let ret;
  let user = req.user;

  if (!(user.role_id === 'CA' || (user.role_id === 'OA' && user.org_id == org_id))) {
    ret = ReS(res, {error: 'Unauthorized access.'}, 401);
  } else {
    [err, data] = await to(
      Organization.findOne({
        where: {org_id: org_id}
      })
    );
    ret = (err) ? ReE(res, err) : ReS(res, {organization: data});
  }

  return ret;
};

const updateOrg = async function (req, res) {
  const org_id = req.params.id;
  let ret, user, org;
  user = req.user;
  org = req.body;
  let fields = ['org_name', 'first_name', 'last_name', 'phone', 'email'];

  if (!(user.role_id === 'CA' || (user.role_id === 'OA' && user.org_id == org_id))) {
    ret = ReS(res, {error: 'Unauthorized access.'}, 401);
  } else {
    if (org.email === "") {
        org.email = null;
    }
    if (org.phone === "") {
        org.phone = null;
    }
    if (user.role_id === 'CA') {
      fields.push('enabled');
      fields.push('member_limit');
    }
    // Update organization
    [err, data] = await to(
        Organization.update(org,
          {where: {org_id: org_id}, fields: fields}
        )
    );
    if (err) {
      ret = ReE(res, err);
    } else {
      // Retreive updated orgnization
      [err, data] = await to(
        Organization.findOne({
          where: {org_id: org_id}
        })
      );
      ret = (err) ? ReE(res, err) : ReS(res, {organization: data});
    }
  }

  return ret;
};

const removeOrg = async function(req, res) {
};

module.exports = {
    createOrg, getOrg, updateOrg, removeOrg, getOrgByID, getOrgStats
};

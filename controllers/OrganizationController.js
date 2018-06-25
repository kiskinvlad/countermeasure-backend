const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
const Organization = require('../models').ORGANIZATION;
const Op = require("sequelize").Op;
const sequelize = require('../models').sequelize;
const OrganizationService = require('./../services/OrganizationService');
/**
 * Create organization
 * @method createOrg
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const createOrg = async function(req, res){
  let err, data;
  const user = req.user;
  const body = req.body;
  // Check if user is allowed to create new organization
  if (user.role_id !== 'CA') {
    return ReE(res, {error: 'Unauthorized access.'}, 401);
  }
  // Create organization
  [err, data] = await to(OrganizationService.createOrg(body.org_name, body.enabled, body.member_limit));
  if (err) {
    return ReE(res, err, 400);
  }
  return ReS(res, {message: 'Successfully created organization.', organization: data});
};  
/**
 * Get organization statistic
 * @method getOrgStats
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getOrgStats = async function(req, res){
  let ret, err, orgs;
  let data = {};
  const user = req.user;
  const offset = isNaN(parseInt(req.query.offset)) ? null : parseInt(req.query.offset);
  const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);
  const org_name = req.query.org_name;
  // Check if user is allowed to acces organizations data
  if (user.role_id !== 'CA') {
    err = 'Unauthorized access.';
    ret = ReE(res, err, 401);
  }
  // Get data/statistics related to organizations
  if (!err) {
    [err, orgs] = await to(OrganizationService.getOrgStats(org_name, limit, offset));
    if (err) ret = ReE(res, err, 400);
  }
  // Build and return response
  if (!err) {
    data.organizations = orgs;
    // Get total number of organizations
    [err, count] = await to(OrganizationService.getOrgCount(org_name));
    if (!err) data.count = count;
    ret = ReS(res, data);
  }
  return ret;
};
/**
 * Get organization by id
 * @method getOrgByID
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getOrgByID = async function (req, res) {
  const org_id = req.params.id;
  let err, ret, org;
  let user = req.user;
  // Check if use is allowed to acces organization data
  if (user.role_id !== 'CA' && user.org_id != org_id) {
    err = 'Unauthorized access.';
    ret = ReE(res, err, 401);
  }
  // Get organization data
  if (!err) {
    [err, data] = await to(OrganizationService.getOrgByID(org_id));
    if (err) ret = ReE(res, err, 400);
  }
  // Build response depending on user role
  if (!err) {
    if (user.role_id === 'OA' || user.role_id === 'CA') {
      org = {organization: data};
    } else {
      org = {organization: {
          org_id: data.org_id,
          org_name: data.org_name
      }};
    }
    ret = ReS(res, org);
  }
  return ret;
};
/**
 * Update organization
 * @method updateOrg
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const updateOrg = async function (req, res) {
  const org_id = req.params.id;
  let err, ret, user, org;
  user = req.user;
  org = req.body;
  let fields = ['org_name', 'first_name', 'last_name', 'phone', 'email'];
  // Check if user is allowed to update the organization
  if (!(user.role_id === 'CA' || (user.role_id === 'OA' && user.org_id == org_id))) {
    err = 'Unauthorized access.';
    ret = ReE(res, err, 401);
  }
  if (!err) {
    // Prevent sequelize validation errors
    if (org.email === "") org.email = null;
    if (org.phone === "") org.phone = null;
    // Users with CA role can update additional fields
    if (user.role_id === 'CA') {
      fields.push('enabled');
      fields.push('member_limit');
    }
    // Update organization
    [err, data] = await to(OrganizationService.updateOrg(org, org_id, fields));
    if (err) ret = ReE(res, err, 400);
  }
  // Retreive and return updated orgnization
  if (!err) {
    [err, data] = await to(OrganizationService.getOrgByID(org_id));
    ret = (err) ? ReE(res, err) : ReS(res, {organization: data});
  }
  return ret;
};

module.exports = {
    createOrg, updateOrg, getOrgByID, getOrgStats
};

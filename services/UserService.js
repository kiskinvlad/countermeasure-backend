const User = require('../models').USER;
const Organization = require('../models').ORGANIZATION;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const TE = require('../utils').TE;

// Check if total number of enabled members for this organization
// is less than the organization's member limit.
const checkMemberLimit = async function(org_id) {
  let err, data, enabled;

  // Get number of enabled users in this org with roles != OG
  [err, enabled] = await to(
    User.count({
      where: {
        org_id: org_id,
        enabled: {[Op.gt]: 0},
        role_id: {[Op.ne]: 'OG'}
      }
    })
  );
  if (err) TE(err.message);

  // Get member_limit for this Organization
  [err, data] = await to(
    Organization.findOne({
      where: {org_id: org_id},
      attributes: ['member_limit']
    })
  );
  if (err) TE(err.message);

  // Return true if number of enabled users is under member_limit
  if (enabled < data.member_limit) {
    return true;
  } else {
    TE('Cannot enable user.');
  }
}

// Build the WHERE clause for getting all users
const filterUsers = function(filters) {
  where = {};
  if (filters.type === 'member') {
    // Get users who are not guests
    where.role_id = {[Op.ne]: 'OG'};
  } else if (filters.type === 'guest') {
    // Get users who are guests
    where.role_id = 'OG';
    // Filter by enabled
    if (parseInt(filters.enabled) === 1 || parseInt(filters.enabled) === 0) {
      where.enabled = filters.enabled;
    }
    // Filter by email
    if (filters.email) {
      where.email = {[Op.like]: `%${filters.email}%`};
    }
    // Filter by first/last name
    if (filters.name) {
      where[Op.or]={first_name:{[Op.like]: `%${filters.name}%`},last_name:{[Op.like]: `%${filters.name}%`}};
    }
  }
  if (filters.org_id) {
    // Filter by organization
    where.org_id = filters.org_id;
  }
  return where;
};

const getUsersAndCount = async function(where, offset, limit) {
  let err, data;
  [err, data] = await to(
      User.findAndCountAll({
         where: where,
         offset: offset,
         limit: limit
      })
  );
  if(err) TE(err.message);
  return data;
}

const getEnabledCount = async function(where) {
  let err, data;
  where.enabled = 1;
  [err, data] = await to(
    User.count({ where: where })
  );
  if(err) TE(err.message);
  return data;
}

const getUserByID = async function(user_id) {
  let err, data;
  [err, data] = await to(
    User.findOne({
      where: {user_id: user_id}
    })
  );
  if(err) TE(err.message);
  return data;
}

module.exports = {
    checkMemberLimit, filterUsers, getUsersAndCount, getEnabledCount, getUserByID
};

const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
const Organization = require('../models').ORGANIZATION;

const createOrg = async function(req, res){
};

const getOrg = async function (req, res) {
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

  if (!(user.role_id === 'CA' || (user.role_id === 'OA' && user.org_id == org_id))) {
    ret = ReS(res, {error: 'Unauthorized access.'}, 401);
  } else {
    if (org.email === "") {
        org.email = null;
    }
    if (org.phone === "") {
        org.phone = null;
    }
    // Update organization
    [err, data] = await to(
        Organization.update({
            org_name: org.org_name,
            first_name: org.first_name,
            last_name: org.last_name,
            phone: org.phone,
            email: org.email,
            enabled: org.enabled }, {
            where: {org_id: org_id}
        })
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
    createOrg, getOrg, updateOrg, removeOrg
};

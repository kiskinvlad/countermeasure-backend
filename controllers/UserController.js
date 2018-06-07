const authService = require('./../services/AuthService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
const User = require('../models').USER;
const Organization = require('../models').ORGANIZATION;
const Sequelize = require("sequelize");
const Op = Sequelize.Op

const create = async function(req, res){
    let ret, err, user;
    const body = req.body;
    const requestor = req.user;

    if (requestor.role_id !== 'CA' && (requestor.role_id !== 'OA' || requestor.org_id != body.org_id)) {
      err = 'Unauthorized access.';
      ret = ReE(res, err, 401);
    }
    if (!err && !body.unique_key && !body.email) {
      err = 'Please enter an email to register.';
      ret = ReE(res, err, 400);
    }
    if (!err && (!body.password || !body.role_id || !body.org_id)) {
      err = 'Please enter all required fields.';
      ret = ReE(res, err, 400);
    }
    // Check if number of enabled users is under member_limit
    if (!err && body.enabled > 0) {
        [err, isUnder] = await to(isUnderMemberLimit(requestor.org_id));
        if (err) {
          ret = ReE(res, err, 400);
        } else if (!isUnder) {
          err = 'Cannot enable user.';
          ret = ReE(res, err, 400);
        }
    }
    // Create user
    if (!err) {
      [err, user] = await to(authService.createUser(body));

      if(err) {
        ret = ReE(res, err, 422);
      } else {
        ret = ReS(res, { message: 'Successfully created new user.', user: user.toWeb() }, 201);
      }
    }

    return ret;
};

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
};

const getAll = async function (req, res) {
    let err, data, ret, where, final;
    const user = req.user;
    const org_id = req.query.org_id;
    const offset = isNaN(parseInt(req.query.offset)) ? null : parseInt(req.query.offset);
    const limit = isNaN(parseInt(req.query.limit)) ? null : parseInt(req.query.limit);

    if (!(user.role_id === 'CA' || (user.role_id === 'OA' && user.org_id == org_id))) {
      ret = ReS(res, {error: 'Unauthorized access.'}, 401);
    } else {
      // Build WHERE clause
      where = {};
      if (req.query.type === 'member') {
        where.role_id = {[Op.ne]: 'OG'};
      } else if (req.query.type === 'guest') {
        where.role_id = 'OG';
      }
      if (org_id) {
        where.org_id = org_id;
      }

      // Get all users and count
      [err, data] = await to(
          User.findAndCountAll({
             where: where,
             offset: offset,
             limit: limit
          })
      );

      if (err) {
        ret = ReE(res, err);
      } else {
        final =  {count: data.count, users: data.rows};
        if (req.query.type === 'member') {
          // Get total number of enabled users
          where.enabled = 1;
          [err, data] = await to(
            User.count({ where: where })
          );
          if (!err) {
            final.total_enabled = data;
          }
        }
        ret = ReS(res, final);
      }
    }

    return ret;
};

const getUserByID = async function (req, res) {
    const user_id = req.params.id;
    const requestor = req.user;
    let ret;

    [err, data] = await to(
      User.findOne({
        where: {user_id: user_id}
      })
    );

    if (err) {
      ret = ReE(res, err, 422);
    } else if (requestor.role_id === 'CA' || requestor.user_id === data.user_id
        || (requestor.role_id === 'OA' && requestor.org_id == data.org_id)) {
      ret = ReS(res, {user: data});
    } else {
      ret = ReS(res, {error: 'Unauthorized access.'}, 401);
    }

    return ret;
};

const update = async function (req, res) {
    let err, user, data;
    user = req.user;
    data = req.body;
    delete data.password; // Password should not be set by this route
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message === 'Validation error')
            err = 'The email address or phone number is already in use';
        return ReE(res, err, 400);
    }

    return ReS(res, {message: 'Updated User: ' + user.email, user:user.toWeb()});
};

const updatePassword = async function (req, res) {
    let err, user, old_password, new_password;
    user = req.user;
    old_password = req.body.old_password;
    new_password = req.body.new_password;

    [err, user] = await to(user.comparePassword(old_password));
    if (err) {
        return ReE(res, err, 409);
    }

    [err, data] = await to(
      user.update({
        password: new_password
      })
    );
    if (err) {
        return ReE(res, err, 400);
    }

    return ReS(res, {message: 'Updated password for user: ' + user.email});
};

const updateUserByID = async function (req, res) {
    console.log("\n CALLED updateUserByID");
    const user_id = req.params.id;
    const requestor = req.user;
    let err, user, body, ret;
    body = req.body;

    // Get User
    [err, user] = await to(
      User.findOne({
        where: {user_id: user_id}
      })
    );

    if (err) {
      ret = ReE(res, err, 422);
    }

    // Only CA or OA with same org_id as the user can update the user
    if (!err && !(requestor.role_id === 'CA' || (requestor.role_id === 'OA'
          && requestor.org_id === user.org_id))) {
      err = 'Unauthorized access.';
      ret = ReE(res, err, 401);
    }

    // Check if number of enabled users is under member_limit
    if (!err && user.enabled == 0 && body.enabled > 0) {
        [err, isUnder] = await to(isUnderMemberLimit(user.org_id));
        if (err) {
          ret = ReE(res, err, 400);
        } else if (!isUnder) {
          err = 'Cannot enable user.';
          ret = ReE(res, err, 400);
        }
    }

    if (!err) {
      // Cannot change OG role and can only set other roles to OA or OM
      if (user.role_id === 'OG' || (body.role_id !== 'OA' && body.role_id !== 'OM')) {
        delete body.role_id;
      }

      // org_id cannot be changed
      delete body.org_id;

      // Only update password if set
      if (!body.password) delete body.password;

      // Save user
      user.set(body);
      [err, user] = await to(user.save());
      if (err) {
        ret = ReE(res, err, 400);
      } else {
        ret = ReS(res, {message: 'Updated User: ' + user.email, user:user.toWeb()});
      }
    }

    return ret;
};

const remove = async function(req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE( res, 'error occured trying to delete user' );

    return ReS(res, { message: 'Deleted User' }, 204);
};

const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(body));
    if (err) return ReE(res, err, 422);

    const authToken = user.getJWT();

    const responseData = { token: authToken, user: user.toWeb() };
    res.header('access-control-expose-headers', 'Authorization');
    res.header('Authorization', authToken);
    return ReS(res, responseData, 200)
};

// Return true if total number of enabled members for this organization
// is less than the organization's member limit.
async function isUnderMemberLimit(org_id) {
  let err, data, enabled;

  [err, enabled] = await to(
    User.count({
      where: {
        org_id: org_id,
        enabled: {[Op.gt]: 0},
        role_id: {[Op.ne]: 'OG'}
      }
    })
  );

  if (!err) {
    [err, data] = await to(
      Organization.findOne({
        where: {org_id: org_id},
        attributes: ['member_limit']
      })
    );

    if (!err) {
      return enabled < data.member_limit;
    }
  }

  return false;
}

module.exports = {
    create, get, update, remove, login, updatePassword, getAll, getUserByID, updateUserByID
};

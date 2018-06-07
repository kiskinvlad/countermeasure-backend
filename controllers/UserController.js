const authService = require('./../services/AuthService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
const User = require('../models').USER;
const Organization = require('../models').ORGANIZATION;
const Sequelize = require("sequelize");
const Op = Sequelize.Op

const create = async function(req, res){
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    if (!body.unique_key && !body.email) {
        return ReE(res, 'Please enter an email to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT()}, 201);
    }
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

module.exports = {
    create, get, update, remove, login, updatePassword, getAll
};

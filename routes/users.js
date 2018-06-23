const express = require('express');
const router = express.Router();
/**
 * User api controller
 */
const UserController = require('./../controllers/UserController');
/**
 * Permissions api controller
 */
const PermissionController = require('./../controllers/PermissionController');
/**
 * Passport middleware
 */
const passport = require('passport');
require('./../middleware/passport')(passport);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
/**
 * User and permissions api entry points
 */

/**
 * Create user api entry point
 */
router.post('/', passport.authenticate('jwt', {session:false}), UserController.create);
/**
 * Get user by id api entry point
 */
router.get('/:id', passport.authenticate('jwt', {session:false}), UserController.getUserByID);
/**
 * Get all users api entry point
 */
router.get('/', passport.authenticate('jwt', {session:false}), UserController.getAll);
/**
 * Update user by id api entry point
 */
router.put('/:id', passport.authenticate('jwt', {session:false}), UserController.updateUserByID);
/**
 * Update user api entry point
 */
router.put('/', passport.authenticate('jwt', {session:false}), UserController.update);
/**
 * Remove user api entry point
 */
router.delete('/', passport.authenticate('jwt', {session:false}), UserController.remove);
/**
 * User login api entry point
 */
router.post('/login', UserController.login);
/**
 * User update password api entry point
 */
router.patch('/password', passport.authenticate('jwt', {session:false}), UserController.updatePassword);
/**
 * User create permission api entry point
 */
router.post('/:id/permissions', passport.authenticate('jwt', {session:false}), PermissionController.bulkCreate);
/**
 * User remove permission api entry point
 */
router.delete('/:id/permissions', passport.authenticate('jwt', {session:false}), PermissionController.bulkRemove);

module.exports = router;

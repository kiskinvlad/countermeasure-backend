const express = require('express');
const router = express.Router();
/**
 * Permissions api controller
 */
const PermissionController = require('./../controllers/PermissionController.js');
/**
* Passport middleware
*/
const passport = require('passport');
require('./../middleware/passport')(passport);
/**
 * Permissions api entry points
 */

/**
 * Create permission api entry point
 */
router.post('/', passport.authenticate('jwt', {session:false}), OrganizationController.create);
/**
 * Get permissions api entry point
 */
router.get('/', passport.authenticate('jwt', {session:false}), OrganizationController.get);
/**
 * Remove permission api entry point
 */
router.delete('/', passport.authenticate('jwt', {session:false}), OrganizationController.remove);

module.exports = router;

const express = require('express');
const router = express.Router();
/**
 * Organizations api controller
 */
const OrganizationController = require('./../controllers/OrganizationController.js');
/**
 * Permissions api controller
 */
const PermissionController = require('./../controllers/PermissionController');
/**
 * Passport middleware
 */
const passport = require('passport');
require('./../middleware/passport')(passport);
/**
 * Organizations and permissions api entry points
 */


/**
 * Create organization api entry point
 */
router.post('/', passport.authenticate('jwt', {session:false}), OrganizationController.createOrg);
/**
 * Get organization api entry point
 */
router.get('/', passport.authenticate('jwt', {session:false}), OrganizationController.getOrg);
/**
 * Get organization statistic api entry point
 */
router.get('/statistics', passport.authenticate('jwt', {session:false}), OrganizationController.getOrgStats);
/**
 * Get organization by id entry point
 */
router.get('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.getOrgByID);
/**
 * Update organization api entry point
 */
router.put('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.updateOrg);
/**
 * Remove organization api entry point
 */
router.delete('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.removeOrg);
/**
 * Get permissions by user id api entry point
 */
router.get('/:id/permissions', passport.authenticate('jwt', {session:false}), PermissionController.getPermissionsByUserID);

module.exports = router;

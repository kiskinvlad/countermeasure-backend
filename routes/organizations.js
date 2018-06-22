const express = require('express');
const router = express.Router();

const OrganizationController = require('./../controllers/OrganizationController.js');
const PermissionController = require('./../controllers/PermissionController');

const passport = require('passport');
require('./../middleware/passport')(passport);

router.post('/', passport.authenticate('jwt', {session:false}), OrganizationController.createOrg);
router.get('/statistics', passport.authenticate('jwt', {session:false}), OrganizationController.getOrgStats);
router.get('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.getOrgByID);
router.put('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.updateOrg);
router.get('/:id/permissions', passport.authenticate('jwt', {session:false}), PermissionController.getPermissionsByUserID);

module.exports = router;

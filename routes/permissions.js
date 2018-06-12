const express = require('express');
const router = express.Router();

const PermissionController = require('./../controllers/PermissionController.js');

const passport = require('passport');
require('./../middleware/passport')(passport);

router.post('/', passport.authenticate('jwt', {session:false}), OrganizationController.create);
router.get('/', passport.authenticate('jwt', {session:false}), OrganizationController.get);
router.delete('/', passport.authenticate('jwt', {session:false}), OrganizationController.remove);

module.exports = router;

const express = require('express');
const router = express.Router();

const OrganizationController = require('./../controllers/OrganizationController.js');

const passport = require('passport');
require('./../middleware/passport')(passport);

router.post('/', passport.authenticate('jwt', {session:false}), OrganizationController.createOrg);
router.get('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.getOrg);
router.put('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.updateOrg);
router.delete('/:id', passport.authenticate('jwt', {session:false}), OrganizationController.removeOrg);

module.exports = router;

const express = require('express');
const router = express.Router();
/**
 * Role api controller
 */
const RoleController = require('./../controllers/RoleController');
/**
 * Passport middleware
 */
const passport = require('passport');
require('./../middleware/passport')(passport);
/**
 * Get role api entry endpoint
 */
router.get('/', RoleController.getRole);
module.exports = router;

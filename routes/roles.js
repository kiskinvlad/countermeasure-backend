const express = require('express');
const router = express.Router();

const RoleController = require('./../controllers/RoleController');

const passport = require('passport');
require('./../middleware/passport')(passport);
router.get('/', RoleController.getRole);
module.exports = router;

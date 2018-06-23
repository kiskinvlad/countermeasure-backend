const express = require('express');
const router = express.Router();
const passport = require('passport');
/**
 * Passport middleware
 */
require('./../middleware/passport')(passport);
/**
 * Comma separated value api controller
 */
const CsvController = require('./../controllers/CsvController');
/**
 * Create cvs api entry point
 */
router.post('/',passport.authenticate('jwt', { session: false }), CsvController.createCvs);

module.exports = router;

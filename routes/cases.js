const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const custom = require('./../middleware/custom');
/**
 * Passport middleware
 */
require('./../middleware/passport')(passport);
/**
 * Case api controller
 */
const CaseController = require('./../controllers/CaseController');
/**
 * Case api entry points
 */

/**
 * Create case api entry point
 */
router.post('/',passport.authenticate('jwt', { session: false }), CaseController.createCase);
/**
 * Get case api entry point
 */
router.get('/', passport.authenticate('jwt', { session:false}), CaseController.getCase);
/**
 * Update case api entry point
 */
router.put('/', passport.authenticate('jwt', { session:false}), CaseController.updateCase);
/**
 * Get filtered cases api entry point
 */
router.post('/filter', passport.authenticate('jwt', { session: false }), CaseController.getFilter);
/**
 * Delete case api entry point
 */
router.post('/delete', passport.authenticate('jwt', { session:false }), CaseController.deleteCase);
/**
 * Get case filter options api entry point
 */
router.get('/filter_params',passport.authenticate('jwt', { session: false }), CaseController.getFilterParams);
/**
 * Get case sort options api entry point
 */
router.get('/sort_params',passport.authenticate('jwt', { session: false }), CaseController.getSortParams);

module.exports = router;

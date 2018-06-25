const express = require('express');
const router = express.Router();
const passport = require('passport');
/**
 * Passport middleware
 */
require('./../middleware/passport')(passport);
/**
 * Disputed api controller
 */
const DisputedController = require('./../controllers/DisputedController');

/**
 * Get all disputes api entry point
 */
router.get('/',passport.authenticate('jwt', { session: false }), DisputedController.getDisputed);
/**
 * Get all disputes by case api entry point
 */
router.get('/case',passport.authenticate('jwt', { session: false }), DisputedController.getDisputesByCase);
/**
 * Get states infor api entry point
 */
router.get('/getStates',passport.authenticate('jwt', { session: false }), DisputedController.getStates);
/**
 * Get disputes by summary api entry point
 */
router.get('/summary',passport.authenticate('jwt', { session: false }), DisputedController.getDisputesBySummary);
/**
 * Get disputed api entry point
 */
router.get('/all', passport.authenticate('jwt', { session:false}), DisputedController.getDisputes);
/**
 * Create disputed api entry point
 */
router.post('/create', passport.authenticate('jwt', { session:false}), DisputedController.createDisputed);
/**
 * Update disputed api entry point
 */
router.post('/update', passport.authenticate('jwt', { session:false}), DisputedController.updateDisputed);
/**
 * Remove disputed api entry point
 */
router.post('/remove', passport.authenticate('jwt', { session:false}), DisputedController.removeDisputed);

module.exports = router;

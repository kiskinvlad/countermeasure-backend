const express = require('express');
const router = express.Router();
const passport = require('passport');
/**
 * Passport middleware
 */
require('./../middleware/passport')(passport);
/**
 * Scenario api controller
 */
const ScenarioController = require('./../controllers/ScenarioController');
/**
 * Scenarios api entry points
 */

/**
 * Get all scenarios by case api entry point
 */
router.post('/all',passport.authenticate('jwt', { session: false }), ScenarioController.getAllForCase);
/**
 * Move scenario api entry point
 */
router.post('/move', passport.authenticate('jwt', { session:false}), ScenarioController.moveScenario);
/**
 * Delete scenario from list api entry point
 */
router.post('/delete', passport.authenticate('jwt', { session:false}), ScenarioController.deleteScenarioForList);
/**
 * Create scenario api entry point
 */
router.post('/', passport.authenticate('jwt', { session:false}), ScenarioController.create);
/**
 * Update scenario api entry point
 */
router.put('/', passport.authenticate('jwt', { session:false}), ScenarioController.update);
/**
 * Delete scenario api entry point
 */
router.delete('/', passport.authenticate('jwt', {session:false}), ScenarioController.remove);
/**
 * Get scenario api entry point
 */
router.get('/', passport.authenticate('jwt', {session:false}), ScenarioController.get);

module.exports = router;

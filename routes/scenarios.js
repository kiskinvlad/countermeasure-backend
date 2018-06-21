const express = require('express');
const router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);

const ScenarioController = require('./../controllers/ScenarioController');

//get scenarios for case
router.post('/all',passport.authenticate('jwt', { session: false }), ScenarioController.getAllForCase);
// move scenarios
router.post('/move', passport.authenticate('jwt', { session:false}), ScenarioController.moveScenario);
// delete scenario for list
router.post('/delete', passport.authenticate('jwt', { session:false}), ScenarioController.deleteScenarioForList);
// create scenario
router.post('/', passport.authenticate('jwt', { session:false}), ScenarioController.create);
//update scenario
router.put('/', passport.authenticate('jwt', { session:false}), ScenarioController.update);
//delete scenario
router.delete('/', passport.authenticate('jwt', {session:false}), ScenarioController.remove);
// get scenario
router.get('/', passport.authenticate('jwt', {session:false}), ScenarioController.get);

module.exports = router;

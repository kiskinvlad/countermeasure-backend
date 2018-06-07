const express = require('express');
const router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);

const DisputedController = require('./../controllers/DisputedController');

//get all disputes
router.get('/',passport.authenticate('jwt', { session: false }), DisputedController.getDisputes);
//get disputes by case
router.get('/case',passport.authenticate('jwt', { session: false }), DisputedController.getDisputesByCase);
//get disputes by summary
router.get('/summary',passport.authenticate('jwt', { session: false }), DisputedController.getDisputesBySummary);
//get disputed
router.get('/all', passport.authenticate('jwt', { session:false}), DisputedController.getDisputes);
//create disputed
router.post('/create', passport.authenticate('jwt', { session:false}), DisputedController.createDisputed);
//update disputed
router.post('/update', passport.authenticate('jwt', { session:false}), DisputedController.updateDisputed);
//remove disputed
router.post('/remove', passport.authenticate('jwt', { session:false}), DisputedController.removeDisputed);

module.exports = router;

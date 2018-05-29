const express = require('express');
const router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);

const DisputedController = require('./../controllers/DisputedController');

//get all disputes
router.get('/',passport.authenticate('jwt', { session: false }), DisputedController.getDisputed);
//get disputed
router.get('/all', passport.authenticate('jwt', { session:false}), DisputedController.getDisputes);


module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const custom = require('./../middleware/custom');
require('./../middleware/passport')(passport);

const CaseController = require('./../controllers/CaseController');
//create case
router.post('/',passport.authenticate('jwt', { session: false }), CaseController.createCase);
//get case 
router.get('/', passport.authenticate('jwt', { session:false}), CaseController.getFilter);
//update case
router.put('/', passport.authenticate('jwt', { session:false}), CaseController.getFilter);
//delete case
router.delete('/', passport.authenticate('jwt', {session:false}), CaseController.getFilter);
//get filter
router.post('/filter',passport.authenticate('jwt', { session: false }), CaseController.getFilter);
//get filter params
router.get('/filter_params',passport.authenticate('jwt', { session: false }), CaseController.getFilterParams);
//get sort params
router.get('/sort_params',passport.authenticate('jwt', { session: false }), CaseController.getSortParams);

module.exports = router;

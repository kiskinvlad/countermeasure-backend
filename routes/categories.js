const express = require('express');
const router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);

const CategoryController = require('./../controllers/CategoryController');

//get categories for case
router.post('/all',passport.authenticate('jwt', { session: false }), CategoryController.getAllForCase);
// move categories
router.post('/move', passport.authenticate('jwt', { session:false}), CategoryController.moveCategory);
// delete category for list
router.post('/delete', passport.authenticate('jwt', { session:false}), CategoryController.deleteCategoryForList);
// create csv
router.post('/csv',passport.authenticate('jwt', { session: false }), CategoryController.createCvs);
// create category
router.post('/', passport.authenticate('jwt', { session:false}), CategoryController.create);
//update category
router.put('/', passport.authenticate('jwt', { session:false}), CategoryController.update);
//delete category
router.delete('/', passport.authenticate('jwt', {session:false}), CategoryController.remove);
// get category
router.get('/', passport.authenticate('jwt', {session:false}), CategoryController.get);

module.exports = router;

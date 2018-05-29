const express = require('express');
const router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);

const CategoryController = require('./../controllers/CategoryController');

//create category
router.post('/',passport.authenticate('jwt', { session: false }), CategoryController.getAllForCase);
// move categories
router.post('/move', passport.authenticate('jwt', { session:false}), CategoryController.moveCategory);
// delete category
router.post('/delete', passport.authenticate('jwt', { session:false}), CategoryController.deleteCategory);
//update category
router.put('/', passport.authenticate('jwt', { session:false}), CategoryController.update);
//delete category
router.delete('/', passport.authenticate('jwt', {session:false}), CategoryController.remove);

module.exports = router;

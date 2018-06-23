const express = require('express');
const router = express.Router();
const passport = require('passport');
/**
 * Passport middleware
 */
require('./../middleware/passport')(passport);
/**
 * Category api controller
 */
const CategoryController = require('./../controllers/CategoryController');
/**
 * Category api entry points
 */

/**
 * Get all categories for case api entry point
 */
router.post('/all',passport.authenticate('jwt', { session: false }), CategoryController.getAllForCase);
/**
 * Move category api entry point
 */
router.post('/move', passport.authenticate('jwt', { session:false}), CategoryController.moveCategory);
/**
 * Delete category from list api entry point
 */
router.post('/delete', passport.authenticate('jwt', { session:false}), CategoryController.deleteCategoryForList);
/**
 * Create category api entry point
 */
router.post('/', passport.authenticate('jwt', { session:false}), CategoryController.create);
/**
 * Update category api entry point
 */
router.put('/', passport.authenticate('jwt', { session:false}), CategoryController.update);
/**
 * Delete category api entry point
 */
router.delete('/', passport.authenticate('jwt', {session:false}), CategoryController.remove);
/**
 * Get category api entry point
 */
router.get('/', passport.authenticate('jwt', {session:false}), CategoryController.get);

module.exports = router;

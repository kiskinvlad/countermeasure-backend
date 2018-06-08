const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');

const passport = require('passport');
require('./../middleware/passport')(passport);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', passport.authenticate('jwt', {session:false}), UserController.create);
router.get('/:id', passport.authenticate('jwt', {session:false}), UserController.getUserByID);
router.get('/', passport.authenticate('jwt', {session:false}), UserController.getAll);
router.put('/:id', passport.authenticate('jwt', {session:false}), UserController.updateUserByID);
router.put('/', passport.authenticate('jwt', {session:false}), UserController.update);
router.delete('/', passport.authenticate('jwt', {session:false}), UserController.remove);
router.post('/login', UserController.login);
router.patch('/password', passport.authenticate('jwt', {session:false}), UserController.updatePassword);

module.exports = router;

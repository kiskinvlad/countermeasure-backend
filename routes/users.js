const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');

const passport = require('passport');
require('./../middleware/passport')(passport);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', UserController.create);
router.get('/', passport.authenticate('jwt', {session:false}), UserController.get);
router.put('/', passport.authenticate('jwt', {session:false}), UserController.update);
router.delete('/', passport.authenticate('jwt', {session:false}), UserController.remove);
router.post('/login', UserController.login);

module.exports = router;

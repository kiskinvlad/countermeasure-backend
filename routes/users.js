const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
//const CompanyController = require('./../controllers/CompanyController');
//const HomeController = require('./../controllers/HomeController');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');
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

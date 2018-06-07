const express = require('express');
const router = express.Router();
const passport = require('passport');

require('./../middleware/passport')(passport);

const CsvController = require('./../controllers/CsvController');

router.post('/',passport.authenticate('jwt', { session: false }), CsvController.createCvs);

module.exports = router;

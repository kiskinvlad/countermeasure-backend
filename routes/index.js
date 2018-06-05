const express = require('express');
const roles = require ('./roles');
const cases = require('./cases');
const category = require('./categories');
const disputes = require('./disputes');
const scenario = require('./scenaries');
const organizations = require('./organizations');
const router = express.Router();

router.use('/roles', roles);
router.use('/cases', cases);
router.use('/category', category);
router.use('/disputes', disputes);
router.use('/scenario', scenario);
router.use('/organizations', organizations);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
